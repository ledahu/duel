//The purpose of expressMain is to be the entrypoint for all Express stuff
import pkg from '../servers.cjs';
const { app, io } = pkg;

app.get('/game/:variableRoom', (req, res) => {
  const variableRoom = req.params.variableRoom;
  res.redirect(`/?room=` + variableRoom);
});

/*
app.get('/game/:variableRoom', (req, res) => {
    const variableRoom = req.params.variableRoom;
    res.sendFile(__dirname + '/index.html'); // Page de test
});
*/

export default app;
