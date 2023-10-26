const request = require('supertest');
const { app, server } = require('../app');
// const db = require('../db/connection');
const Gif = require('../db/schema');

// TRYING TO FIND MEMORY LEAK
require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE_URL;
const db = mongoose.connection;

beforeAll(async () => {
    try {
        await mongoose.connect(mongoURI);
    } catch(err) {
        return err
    };
});


describe('Test the root path', () => {
    test('It should respond with "Hello World!"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Hello World!');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the gif endpoints', () => {
    test('list out all gifs', async () => {
        let response = await request(app);
        response = await response.get('/gifs');
        const arr = JSON.parse(response.text);
        const allGifs = await Gif.find({});
        expect(response.statusCode).toBe(200);
        expect(arr).toHaveLength(allGifs.length);
    });

    // test('show one gif by id', async () => {
    //     const response = await request(app);
    //     const allGifs = await Gif.find({});
        // for(let i = 0; i < allGifs.length; i++) {
        //     const id = await db.Types.ObjectId(allGifs[i]._id);
        //     const routeRes = await response.get(`/gifs/${id}`);
        //     expect(routeRes.statusCode).toBe(200);
        //     expect(allGifs[i]).toBeInstanceOf(Gif);
        // };
        // expect(response.statusCode).toBe(200);
    // });
    // use test .each() to solve memory leak
});


afterAll(done => {
    mongoose.connection.close();
    // db.connection.close();
    global.gc && global.gc()
    server.close(done);
    done();
});