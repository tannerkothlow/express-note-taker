const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server hosting at http://localhost:${POST}`);
})