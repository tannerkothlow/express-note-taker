const db = require('./db/db.json')

class NoteWriter {
    // Read db.json, add newNote, then write the file
    readDB() {
        console.log(db);
    }
}

console.log(db);
let test = {
    title: 'Test Push',
    text: 'Silly fun test'
}
db.push(test);
console.log(db);

module.exports = NoteWriter;
