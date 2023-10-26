const request = require('supertest');
const { app, server } = require('../app');
const db = require('../db/connection');
const Gif = require('../db/schema');

describe('Test the root path', () => {
    test('It should respond with "Hello World!"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello World!');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the gif endpoints', () => {
    test('It should list out all gifs', async () => {
        let response = await request(app);
        response = await response.get('/gifs');
        const arr = JSON.parse(response.text);
        const allGifs = await Gif.find({});
        expect(response.statusCode).toBe(200);
        expect(arr).toHaveLength(allGifs.length);
    });

    test('It should show one gif by id', async () => {
        let response = await request(app);
        // console.log(response, server);
        const oneGif = await Gif.find({})
        // console.log(oneGif[0]._id instanceof db.Types.ObjectId);
        const id = db.Types.ObjectId(oneGif[0]._id);
        response = await response.get(`/gifs/${id}`);
    });
});


afterAll(done => {
    server.close();
    // process.exit()
    db.connection.close();
    done();
});