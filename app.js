const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// const db = require('./db/schema');
const gifs = require('./controllers/gifs');

app.use(express.json());
app.use('/gifs', gifs);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
// app.get('/gifs', (req, res) => {
// 	db.find({}).then((gifs) => {
// 		res.json(gifs);
// 	});
// });

server = app.listen(PORT, () => {
    return `Hello World!`
});

module.exports = { app, server }