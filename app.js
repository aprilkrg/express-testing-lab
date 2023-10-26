const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const gifs = require('./controllers/gifs');

app.use(express.json());
app.use('/gifs', gifs);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server = app.listen(PORT, () => {
    return `Hello World!`
});

module.exports = { app, server }