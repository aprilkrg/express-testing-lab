const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../app');
const Gif = require('../db/schema');
require('dotenv').config();
const mongoURI = process.env.DATABASE_URL;

const seedData = require('../db/seeds.json');


beforeAll(async () => {
    try {
        await mongoose.connect(mongoURI);
        await Gif.deleteMany({});
        await Gif.insertMany(seedData);
    } catch (err) {
        return err
    };
});

// describe('Test the root path', () => {
//     test('It should respond with "Hello World!"', async () => {
//         const response = await request(app).get('/');
//         expect(response.text).toBe('Hello World!');
//         expect(response.statusCode).toBe(200);
//     });
// });

describe('Test the gif route endpoints', () => {
    test('GET /gifs', async () => {
        let response = await request(app);
        response = await response.get('/gifs');
        const arr = JSON.parse(response.text);
        const allGifs = await Gif.find({});
        expect(response.statusCode).toBe(200);
        expect(arr).toHaveLength(allGifs.length);
    });

    test('GET /gifs/:id', async () => {
        try {
            const allGifs = await Gif.find({});
            for (let i = 0; i < allGifs.length; i++) {
                const id = await db.Types.ObjectId(allGifs[i]._id);
                const routeRes = await response.get(`/gifs/${id}`);
                expect(routeRes.statusCode).toBe(200);
                expect(allGifs[i]).toBeInstanceOf(Gif);
            };
        } catch (err) {
            return err;
        };
    });

    test('POST /gifs', async () => {
        try {
            const response = await request(app).post('/gifs').send({
                name: "placedog son of dog",
                url: "https://placedog.net/500",
                tags: ["animal", "cute"]
            });
            expect(res.statusCode).toBe(201)
        } catch(err) {
            return err;
        };
    });

    test('PATCH /gifs/:id', async () => {
        try {
            const gif = await Gif.find({name: 'placedog son of dog'})
            console.log(gif[0]._id);
            const response = await request(app).put(`/gifs/${gif[0]._id}`).send({
                name: 'placegob',
                url: "https://placedog.net/500",
                tags: ["animal", "cute"]
            });
            expect(response.statusCode).toBe(204);
        } catch(err) {
            return err;
        };
    });
});


afterAll(done => {
    mongoose.connection.close();
    global.gc && global.gc()
    server.close(done);
    done();
});

/*
SOURCES
https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/
*/