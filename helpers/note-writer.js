const db = require('../db/db.json')
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
                const newDB = JSON.stringify(parsedDB, null , 4);

                fs.writeFile('./db/db.json', newDB, 
                (writeErr) => writeErr ? console.error(writeErr) : console.info(`Succesfully updated db.json`)
                );   
            }
        });
    }
    // Read db.json, remove note with the inputted id, and then write the new file.
    removeFromDB(noteID) {
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let foundNote = false;
                const parsedDB = JSON.parse(data);
                for (let i = 0; i < parsedDB.length; i++) {
                    if (parsedDB[i].id == noteID) {
                        foundNote = true;
                        parsedDB.splice(i, 1);
                    };
                };

                if (foundNote) {
                    const newDB = JSON.stringify(parsedDB, null, 4);

                    fs.writeFile('./db/db.json', newDB, 
                    (writeErr) => writeErr ? console.error(writeErr) : console.info(`Succesfully deleted note ${noteID}`)
                    );
                } else {
                    console.log(`ERROR: No note found with id of ${noteID}`);
                };
            };
        });
    }
}

// ================================================TESTS==================================================== //
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
// ======================================================================================================= //
// let newNote = {
//     title: 'Pushed Test Note',
//     text: 'great'
// }

// fs.readFile('./db/db.json', 'utf-8', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         const parsedDB = JSON.parse(data);
//         parsedDB.push(newNote);
//         const newDB = JSON.stringify(parsedDB, null , 4);

//         fs.writeFile('./db/db.json', newDB, 
//         (writeErr) => writeErr ? console.error(writeErr) : console.info(`Succesfully updated note file db.json`)
//         );   
//     }
// });
// ========================================================================================================= //

module.exports = NoteWriter;
