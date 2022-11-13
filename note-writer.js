const db = require('./db/db.json')
const fs = require('fs');

class NoteWriter {
    // Read db.json, add newNote, then write the file
    writeToDB(newNote) {
        // let newNoteString = JSON.stringify(newNote);
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedDB = JSON.parse(data);
                parsedDB.push(newNote);
            }
        })
    }
}

// console.log(db);
// let test = {
//     title: 'Test Push',
//     text: 'Silly fun test'
// }
// let stringTest = JSON.stringify(test);
// console.log(stringTest);

// db.push(test);
// console.log(db);

// fs.readFile('./db/db.json', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         const parsedDB = JSON.parse(data);
//         console.log(parsedDB);
//     }
// })

module.exports = NoteWriter;
