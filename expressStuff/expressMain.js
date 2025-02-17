//The purpose of expressMain is to be the entrypoint for all Express stuff
const app = require('../servers').app;
const io = require('../servers').io;


app.get('/game/:variableRoom', (req, res) => {
    const variableRoom = req.params.variableRoom;
    res.redirect(`/?room=`+variableRoom);
});

/*
app.get('/game/:variableRoom', (req, res) => {
    const variableRoom = req.params.variableRoom;
    res.sendFile(__dirname + '/index.html'); // Page de test
});
*/

module.exports = app;