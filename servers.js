//Where the servers are created

const express = require('express');
const app = express();
app.use(express.static(__dirname+'/public'));
const expressServer = app.listen(9999);
const socketio = require('socket.io');

const io = socketio(expressServer,{
    cors: {
        origin: ['http://localhost:3030'],
        credentials: true,
    }
});


// App organization
// servers.js is NOT the entry point. it creates our servers
// and exports them
module.exports = {
    app,
    io
}
