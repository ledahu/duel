//set height and width of canvas = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

const user = {}; //This will be all things "this" player
let users = []; //this is an array of all players
let words = [];
let theRoom = '';
let X = 0;
let Y = 0;

const playArea = document.querySelector('#play-area');
const playerCoords = document.querySelector('#XYZ');
const baballesElements = [];

document.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;

  X = clientX;
  Y = clientY;
  // console.log("x "+X+" Y "+Y)

  // Déplacement des coordonnées
  // coordinates.style.position = 'absolute';
  // coordinates.style.left = `${clientX + 10}px`; // Décalage pour ne pas cacher le curseur
  // coordinates.style.top = `${clientY + 10}px`;
});

document.querySelector('.name-form').addEventListener('submit', (e) => {
  e.preventDefault();
  user.name = document.querySelector('#name-input').value;
  console.log(user);
  init();
  e.target.parentElement.style.display = 'none';
});

function setMSG(data) {
  document.querySelector('#MSG').innerHTML = data;
}

function setRoom(data) {
  document.querySelector('#ROOM').innerHTML = '<a href="localhost:9999/game/' + data + '">/game/' + data + '</a>';
}

function createButtonsChat(words) {
  const container = document.createElement('div'); // Conteneur pour les boutons

  words.forEach((word, index) => {
    const button = document.createElement('button');
    button.textContent = word; // Texte du bouton
    button.onclick = () => say(index); // Associe le clic à la fonction say(index)
    container.appendChild(button); // Ajoute le bouton au conteneur
  });

  document.body.appendChild(container); // Ajoute le conteneur au body
}

function addToChat(data) {
  console.log(data);
  document.querySelector('#CHAT').innerHTML += '<div><b>' + data.username + '</b>' + words[data.msg] + '</div>';
}

function upTab() {
  playerCoords.innerHTML = '<h2>Players<h2>';

  users.forEach((user, index) => {
    // console.log(user)
    playerCoords.innerHTML +=
      '<div><b>' + user.userData.name + '</b> X:' + user.userData.locX + 'Y:' + user.userData.locY + '</div>';

    if (!squareExist(user.userData.id)) {
      createSquare(user.userData.id, user.userData.locX, user.userData.locY, user.userData.color);
    } else {
      updateSquarePosition(user.userData.id, user.userData.locX, user.userData.locY);
    }
  });
}

function createSquare(id, x, y, color) {
  const square = document.createElement('div');
  square.id = id;
  square.style.position = 'absolute';
  square.style.width = '10px';
  square.style.height = '10px';
  square.style.backgroundColor = color;
  square.style.left = x + 'px';
  square.style.top = y + 'px';
  square.style.zIndex = '999';
  document.body.appendChild(square);
  console.log('creation du carré pour ' + id + ' et color ' + color);
}

function updateSquarePosition(id, x, y) {
  const square = document.getElementById(id);
  if (square) {
    square.style.left = x + 'px';
    square.style.top = y - 12 + 'px'; // to be up the cursor
    return true;
  } else {
    console.warn(`Aucun élément avec l'id "${id}" n'a été trouvé.`);
    return false;
  }
}

function squareExist(id) {
  if (document.getElementById(id)) return true;
  return false;
}

function createGame(height, width, nbOfBaballes) {
  playArea.style.height = `${height}px`;
  playArea.style.width = `${width}px`;
  playArea.style.position = 'relative';
  playArea.style.border = '2px solid black';
  for (let i = 0; i < nbOfBaballes; i++) {
    const baballe = document.createElement('div');
    baballe.classList.add('baballe');
    baballe.style.backgroundColor = getRandomColor();
    baballesElements.push(baballe);
  }
}

/**
 * @param {{x: number, y: number}[]} data
 */
function updateGame(data) {
  playArea.innerHTML = '';
  data.forEach(({ x, y }, i) => {
    baballesElements[i].style.left = x + 'px';
    baballesElements[i].style.top = y + 'px';
  });
  playArea.append(...baballesElements);
}

function getRandomColor() {
  const chars = '0123456789ABCDEF';
  let result = '#';
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * 16);
    result += chars[index];
  }
  return result;
}
