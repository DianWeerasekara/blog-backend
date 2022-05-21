const app = require("./index");
const request = require('supertest');

const blogId = 2;
const wId = 574;

describe("GET /blogs", () => {
    test("shoud respond with a 200 status code", async () => {
        const response = await request(app).get("/blogs")
        expect(response.statusCode).toBe(200)
    })
    test("respond with json content type", async () => {
        const response = await request(app).get("/blogs")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has data", async () => {
        const response = await request(app).get("/blogs")
        expect(response.body).toBeDefined()
    })
});

describe("POST /blogs", () => {
    describe("When blog details provided", () => {
        test("shoud respond with a 201 status code", async () => {
            const response = await request(app).post("/blogs").send({
                description: "This is a new blog",
                author: "Dian Weerasekara"
            })
            expect(response.statusCode).toBe(201)
        })
        test("respond with json content type", async () => {
            const response = await request(app).post("/blogs").send({
                description: "This is a new blog",
                author: "Dian Weerasekara"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has data", async () => {
            const response = await request(app).post("/blogs").send({
                description: "This is a new blog",
                author: "Dian Weerasekara"
            })
            expect(response.body.data).toBeDefined()
        })
    })

});

describe("GET /blogs/:id", () => {
    test("shoud respond with a 200 status code", async () => {
        const response = await request(app).get("/blogs/"+ blogId)
        expect(response.statusCode).toBe(200)
    })
    test("respond with json content type", async () => {
        const response = await request(app).get("/blogs/"+ blogId)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has data", async () => {
        const response = await request(app).get("/blogs/"+blogId)
        expect(response.body).toBeDefined()
    })
    test("shoud respond with a 404 status code", async () => {
        const response = await request(app).get("/blogs/"+wId)
        expect(response.statusCode).toBe(404)
    })
});


describe("PUT /blogs/:id", () => {
    describe("When blog details provided", () => {
        test("shoud respond with a 200 status code", async () => {
            const response = await request(app).put("/blogs/"+ blogId).send({
                description: "This is a new blog",
                author: "Dian Weerasekara"
            })
            expect(response.statusCode).toBeTruthy()
        })
        test("respond with json content type", async () => {
            const response = await request(app).put("/blogs/"+ blogId).send({
                description: "This is a new blog",
                author: "Dian Weerasekara"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("when provided item is not found should respond with 404", async () => {
            const response = await request(app).put("/blogs/"+wId).send({
                description: "This is a new blog",
                author: "Dian Weerasekara"
            })
            expect(response.statusCode).toBe(404)
        })
    })

});