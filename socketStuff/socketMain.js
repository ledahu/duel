//Where all our socket stuff will go
import pkg from '../servers.cjs';
//oh... we need express, get app, but only put what we need to inside of our socket stuff

const { app, io } = pkg;

//================CLASSES================
import { User } from './classes/User.js';
import { UserData } from './classes/UserData.js';
import { PlayArea } from './classes/PlayArea.js';
//=======================================
import { words } from './dataChat.js';
import { Room } from './classes/Room.js';

const MAX_ROOM_SIZE = 2;

/**  @type {User[]} */
const users = [];

/** @type {Map<string, Room>} */
const roomsMap = new Map();

/** @type {Record<string, NodeJS.Timeout>}} */
const timeoutMap = {};

// const ioRooms = io.of('/').adapter.rooms;
// const sids = io.of("/").adapter.sids;s

io.on('connect', (socket) => {
  // console.log(socket.id)
  // console.log(socket.handshake)
  // console.log(variableRoom);
  let currentRoomId = socket.handshake.query.varRoom ?? ''; // Récupérer la variable
  // console.log(theRoom);

  let user = {};

  const settings = {
    X: 0,
    Y: 0,
  };

  socket.on('init', (userObj, ackCallback) => {
    console.log('init');

    if (userObj.userId) {
      console.log('exist déjà');
      const element = users.find((item) => item.userData.id === userObj.userId);
      if (element) {
        element.userData.name = userObj.userName;
      }
    } else {
      const userName = userObj.userName;
      const userData = new UserData(userName, settings);

      // room ou pas
      // console.log('room is '+theRoom)

      if (currentRoomId === '' || (roomsMap.has(currentRoomId) && roomsMap.get(currentRoomId).size === MAX_ROOM_SIZE)) {
        currentRoomId = generateUniqueString();
        // Create a new Room
        const room = new Room(currentRoomId, new PlayArea(600, 800));

        roomsMap.set(currentRoomId, room);
      }

      // console.log(rooms)
      // console.log(sids)
      user = new User(socket.id, userData, currentRoomId);
      users.push(user);
      socket.join(currentRoomId);
    }

    ackCallback({
      MSG: 'ok',
      userId: user.userData.id,
      chat: words,
      room: currentRoomId,
      history: roomsMap.get(currentRoomId).chatHistory,
    });
  });

  socket.on('tock', (data) => {
    //console.log(data)
    const element = users.find((item) => item.userData?.id === data.uid);
    if (element) {
      // update data of the user
      element.userData.locX = data.X;
      element.userData.locY = data.Y;
    }
  });

  socket.on('disconnect', (reason) => {
    // console.log(reason)
    //loop through players and find the player with THIS players socketId
    //and splice that player out
    for (let i = 0; i < users.length; i++) {
      if (users[i].socketId === user.socketId) {
        users.splice(i, 1);
        break;
      }
    }
  });

  socket.on('userSay', (data) => {
    console.log(data);
    const theuser = users.find((item) => item.socketId === socket.id);
    const chatData = { username: theuser.userData.name, msg: data.msg };
    roomsMap.get(currentRoomId).addToChatHistory(chatData);
    io.to(currentRoomId).emit('toAll', chatData);
  });
});

io.of('/').adapter.on('join-room', (roomId, socketId) => {
  onJoinRoom(roomId, socketId);
});

io.of('/').adapter.on('leave-room', (roomId, socketId) => {
  if (roomsMap.has(roomId)) {
    const room = roomsMap.get(roomId);
    room.leave();
    clearInterval(timeoutMap[roomId]);
    io.to(roomId).emit('endGame', 'finished!');
    if (room.size === 0) {
      delete roomsMap.delete(roomId);
      console.log('Room is empty!');
    }
  }
});

async function onJoinRoom(roomId, socketId) {
  if (roomsMap.has(roomId)) {
    const room = roomsMap.get(roomId);
    room.join();
    const { height, width, baballes } = room.playArea;
    io.to(socketId).emit('createGame', { height, width, nbOfBaballes: baballes.length });
    if (room.size === MAX_ROOM_SIZE) {
      const roomUsers = users.filter((user) => user.userRoom === roomId);
      const interval = setInterval(() => {
        io.to(roomId).emit('tick', roomUsers);
      }, 33);
      for (let i = 0; i < 4; i++) {
        await wait(1000);
        io.to(roomId).emit('gameStart', 3 - i);
      }
      io.to(roomId).emit('gameStarted');
      clearInterval(interval);
      const timeout = setInterval(() => {
        const playArea = room.playArea;
        playArea.update();
        const gameData = playArea.baballesPos;
        io.to(roomId).emit('gameData', gameData);
        io.to(roomId).emit('tick', roomUsers);
      }, 33);
      timeoutMap[roomId] = timeout;
    }
  }
  console.log('join-room');
  console.log(roomId);
}

function getLeaderBoard(users) {
  const leaderBoardArray = users.map((curUser) => {
    if (curUser.userData) {
      return {
        name: curUser.userData.name,
        score: curUser.userData.score,
      };
    } else {
      return {};
    }
  });
  return leaderBoardArray;
}

function generateUniqueString() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newString;

  do {
    // Mélange les lettres disponibles
    const shuffledLetters = letters.split('').sort(() => Math.random() - 0.5);
    // Prend les 4 premières lettres (sans répétition)
    newString = shuffledLetters.slice(0, 4).join('');
  } while (roomsMap.has(newString)); // Vérifie que la chaîne n'existe pas déjà

  return newString;
}

/**
 * Return an empty promise to be awaited for duration ms
 * @param {number} duration
 */
function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

//export default
export default { getLeaderBoard, generateUniqueString };
