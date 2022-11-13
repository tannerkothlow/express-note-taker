const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.post('/notes', (req, res) => {
    console.log(`${req.method} request recieved.`)
    let response;
    if (req.body && req.body.title) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json(`Recieved note for ${response.data.title}.`)
    } else {
        res.json(`Note must at least contain a title.`)
    }
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server hosting at http://localhost:${PORT}`);
})