
//importing express
const express = require('express');
const app = express();

//Routes
app.get('/', (req, res) => {
    res.send('Welcome to my pet care app API!');
});

//TODO: Add a message to the console saying that the server has started and the port iti s listening on. Switch this to 8000?
//listening to the server
app.listen(5000);