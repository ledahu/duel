

//set height and width of canvas = window
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;

const user = {} //This will be all things "this" player
let users = [] //this is an array of all players
let words=[]
let theRoom=''
let X=0;
let Y=0;



document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;

    X=clientX
    Y=clientY
   // console.log("x "+X+" Y "+Y)

    // Déplacement des coordonnées
   // coordinates.style.position = 'absolute';
   // coordinates.style.left = `${clientX + 10}px`; // Décalage pour ne pas cacher le curseur
   // coordinates.style.top = `${clientY + 10}px`;
})

document.querySelector('.name-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    user.name = document.querySelector('#name-input').value;
    console.log(user)
    init(); 
})

function setMSG(data){
    document.querySelector('#MSG').innerHTML = data
}

function setRoom(data){
    document.querySelector('#ROOM').innerHTML = '<a href="./game/'+data+'">/game/'+data+'</a>'
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

function addToChat(data){
    console.log(data)
    document.querySelector('#CHAT').innerHTML+='<div><b>'+data.username+'</b>'+words[data.msg]+'</div>'
}

function upTab(){

    document.querySelector('#XYZ').innerHTML=''

    users.forEach((user, index) => {
       // console.log(user)
        document.querySelector('#XYZ').innerHTML+='<div><b>'+user.userData.name+'</b> X:'+user.userData.locX+'Y:'+user.userData.locY+'</div>'
   
        if(!squareExist(user.userData.id)){
            createSquare(user.userData.id, user.userData.locX, user.userData.locY, user.userData.color)
            } 
        else
           {
             updateSquarePosition(user.userData.id, user.userData.locX, user.userData.locY)
        }
    });

} 

function createSquare(id, x, y,color) {
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
    console.log("creation du carré pour "+id+" et color "+color)
  }
  
  function updateSquarePosition(id, x, y) {
    const square = document.getElementById(id);
    if (square) {
      square.style.left = x + 'px';
      square.style.top = (y -15) + 'px'; // to be up the cursor
      return true
    } else {
      console.warn(`Aucun élément avec l'id "${id}" n'a été trouvé.`);
      return false
    }
  }

  function squareExist(id) {
    if(document.getElementById(id))
        return true
    return false
  }

  function uiUpBalle(balles){

    //console.log(balles)
    for (const balle of balles) {
        //console.log(balle.id+':'+balle.x+'/'+ balle.y); // Traitement de chaque ligne
        if(!balleExist(balle.id))
            dessinerBalle(balle)
        else
            updateBallePosition(balle)
      };


  }

  function updateBallePosition(balle) {
    const laballe = document.getElementById(balle.id);
    if (laballe) {
        laballe.style.left = balle.x + 'px';
        laballe.style.top = (balle.y -15) + 'px'; // to be up the cursor
      return true
    } else {
      console.warn(`Aucun élément avec l'id "${id}" n'a été trouvé.`);
      return false
    }
  }

  function balleExist(id) {
    if(document.getElementById(id))
        return true
    return false
  }


  // BABALLE
  function dessinerBalle(balle) {
    const adj=document.getElementById('ADJ')
    let element = document.getElementById(balle.id);
    if (!element) {
      element = document.createElement('div');
      element.id = balle.id;
      adj.appendChild(element);
    }
    // Position centrée : on décale de la moitié de la taille (rayon) pour centrer l'élément
    element.style.position = 'absolute';
    element.style.left = (balle.x - balle.rayon) + 'px';
    element.style.top = (balle.y - balle.rayon) + 'px';
    element.style.width = (balle.rayon * 2) + 'px';
    element.style.height = (balle.rayon * 2) + 'px';
    element.style.backgroundColor = balle.couleur;
    element.style.borderRadius = '50%';
  }
  