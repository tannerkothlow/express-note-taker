const express = require('express');
const path = require('path');
const fs = require('fs');

//Import fs read/write function from helper js file

const PORT = 3001;

const app = express();

// Imports everything in public so index.html and notes.html are styled
app.use(express.static('public'));
// Middleware to parse json post requsts
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Home page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});
// Notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// Takes notes post request and makes a newNote object
app.post('/notes', (req, res) => {
    console.log(`${req.method} request recieved.`)
    let newNote;

    if (req.body && req.body.title) {
        newNote = {
            title: req.body.title,
            text: req.body.text,
        };
        res.json(`Recieved note for ${newNote.title}.`)
    } else {
        res.json(`Note must at least contain a title.`)
    }
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server hosting at http://localhost:${PORT}`);
})