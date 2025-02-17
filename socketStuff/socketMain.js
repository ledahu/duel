//Where all our socket stuff will go
const io = require('../servers').io;
//oh... we need express, get app, but only put what we need to inside of our socket stuff
const app = require('../servers').app;

//================CLASSES================
const User = require('./classes/User');
const UserData = require('./classes/UserData');
//=======================================
const words = require('./dataChat');

const users = []
let roomList =[]
let theRoom=''



io.on('connect',(socket)=>{

   // console.log(socket.id)
   // console.log(socket.handshake)
   // console.log(variableRoom);
    theRoom = socket.handshake.query.varRoom; // Récupérer la variable
   // console.log(theRoom);

    // a user has connected
    let user = {};

    const settings={
        X:0,
        Y:0
    }

    if(users.length === 0){ //someone is about to be added to players. Start tick-tocking
        //tick-tock - issue an event to EVERY connected socket, that is playing the game, 30 times per second
        console.log("START !!!!")
        
        tickTockInterval = setInterval(()=>{
            io.emit('tick',users) // send the event to the "game" room
        },33) //1000/30 = 33.33333, there are 33, 30's in 1000 milliseconds, 1/30th of a second, or 1 of 30fps 
    }

    socket.on('init',(userObj,ackCallback)=>{

        console.log('init')

        if(userObj.userId){
            console.log('exist déjà')
            const element = users.find(item => item.userData.id === userObj.userId);
            if (element) {
                element.userData.name = userObj.userName;
            }
        }
        else{
            const userName = userObj.userName;
            const userData = new UserData(userName,settings)

            // room ou pas
           // console.log('room is '+theRoom)
            
            if(theRoom==''){
                theRoom=generateUniqueString()
            }

            socket.join(theRoom)

            const rooms = io.of("/").adapter.rooms;
            const sids = io.of("/").adapter.sids;

           // console.log(rooms)
           // console.log(sids)

            user = new User(socket.id,userData,theRoom);
            users.push(user); 
        }


        ackCallback({MSG:'ok',
            userId:user.userData.id,
            chat:words,
            room:user.userRoom
        })
   })

    socket.on('tock',(data)=>{
        //console.log(data)
        const element = users.find(item => item.userData.id === data.uid);
        if (element) { // update data of the user 
            element.userData.locX = data.X;
            element.userData.locY = data.Y;
        }
    })


    socket.on('disconnect',(reason)=>{
        // console.log(reason)
        //loop through players and find the player with THIS players socketId
        //and splice that player out
        for(let i = 0; i < users.length; i++){
            if(users[i].socketId === user.socketId){
                users.splice(i,1,{})
                break;
            }
        }
    });

    socket.on('userSay',(data) =>{
        console.log(data)
        const theuser=users.find(item => item.socketId === socket.id)
        io.emit('toAll',{username:theuser.userData.name,msg:data.msg})
    })
})



function getLeaderBoard(){
    const leaderBoardArray = users.map(curUser=>{
        if(curUser.userData){
            return{
                name: curUser.userData.name,
                score: curUser.userData.score,
            }
        }else{
            return {}
        }
    })
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
    } while (roomList.includes(newString)); // Vérifie que la chaîne n'existe pas déjà

    // Ajoute la chaîne unique au tableau
    roomList.push(newString);
    return newString;
}

//export default
module.exports = {getLeaderBoard, generateUniqueString};
