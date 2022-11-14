const express = require('express');
const path = require('path');
const fs = require('fs');
const NoteWriter = require('./helpers/note-writer.js');
const db = require('./db/db.json');
const uuid = require('./helpers/uuid.js');
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
// Returns individual note
app.get('/notes/:id', (req, res) => {
    let returnNote;
    console.log(req.params.id);
    for(let i = 0; i < db.length; i++) {
        if (db[i].id == req.params.id) {
            returnNote = db[i];
        }
    }
    if (returnNote) {
        res.json(returnNote);
    } else {
        res.status(400).send('ERROR: Note not found!')
    }
})
// Notes API
app.get('/api/notes', (req, res) => res.json(db));
// Takes notes post request and makes a newNote object
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request recieved.`)

    let newNote;

    if (req.body && req.body.title) {
        newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid(),
        };

        const noteWriter = new NoteWriter;
        noteWriter.writeToDB(newNote);

        res.json(`Recieved note for ${newNote.title}.`)
    } else {
        res.json(`Note must at least contain a title.`)
    }
    console.log(req.body);
});
// Deletes note based on ID
app.delete('/api/notes/:id', (req, res) => {
    const noteRemover = new NoteWriter;
    noteRemover.removeFromDB(req.params.id);

    res.json(`Recieved DELETE request for ${req.params.id}`)
})

app.listen(PORT, () => {
    console.log(`Server hosting at http://localhost:${PORT}`);
})