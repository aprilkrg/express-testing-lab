const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// const db = require('./db/schema')
const gifs = require('./controllers/gifs');

app.use(express.json());
app.use('/gifs', gifs);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
// app.get('/gifs', (req, res) => {
//     // const allGifs = db.find({})
//     res.send("allGifs")
//     // res.json({allGifs})
// })

// app.post('/users', (req, res) => {
//     const { name, email } = req.body;
//     res.json({ name, email });
// });
// app.put('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     res.json({ id, name, email });
// });
// app.delete('/users/:id', (req, res) => {
//     const { id } = req.params;
//     res.json({ id });
// });

server = app.listen(PORT, () => {
    return `Hello World!`
    //   console.log(`Hello World!`);
    //   console.log(`Server listening on port ${PORT}`);
});

module.exports = { app, server }