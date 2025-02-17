const params = new URLSearchParams(window.location.search);
const varRoom = params.get('room') || '';

console.log(varRoom)
//connect to the socket server!
const socket = io.connect('http://localhost:9000',{
    query: { varRoom }
});

const init = async()=>{
        //init is called inside of start-game click listener
        const initData = await socket.emitWithAck('init',{
            userName: user.name,
            userId: user.id
        }) 
        //our await has resolved, so start 'tocking'
        console.log(initData)
        user.id=initData.userId
        words=initData.chat
        theRoom=initData.room
        setMSG(initData.MSG)
        setRoom(theRoom)
        createButtonsChat(words)
        
    }

function say(index) {
    console.log(`Bouton cliqué : ${index}`); // Action déclenchée

    socket.emit('userSay',{'msg':index})
}


socket.on('toAll',(data)=>{

    console.log(data)
    addToChat(data)
})

// tick is triggered by the server
socket.on('tick',(data)=>{

    users=data
    if(users.length>0) 
        {
            upTab() // uistuff update the tab
        
            socket.emit('tock',{uid:user.id,X:X,Y:Y})
        }
   
})

  

