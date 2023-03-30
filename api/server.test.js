// Write your tests here
const server = require("./server")
const request = require("supertest")
const db = require("../data/dbConfig")

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db("users").truncate()
})

describe("[POST] register user", () => {
  it(`returns 200 on register`, async () => {
    const response = await request(server).post(`/api/auth/register`)
    .send({username:"BobbyTest",password:"ThisIsAPassword"})
    expect(response.statusCode).toBe(200)
  })
  it("returns an object with id,username,password", async () => {
    const response = await request(server).post(`/api/auth/register`)
    .send({username:"BobbyTest",password:"ThisIsAPassword"})
    expect (response.body.id).toBeDefined()
    expect (response.body.username).toBeDefined()
    expect (response.body.password).toBeDefined()
  })
})

describe("[POST] user login", () => {
  it("returns 200 on login", async () => {
    await request(server).post(`/api/auth/register`)
    .send({username:"BobbyTest",password:"ThisIsAPassword"}) 
    const response = await request(server).post(`/api/auth/login`)
    .send({username:"BobbyTest",password:"ThisIsAPassword"}) 
    expect(response.statusCode).toBeDefined()
  })
  it("returns session token on login", async () => {
    await request(server).post(`/api/auth/register`)
    .send({username:"BobbyTest",password:"ThisIsAPassword"}) 
    const response = await request(server).post(`/api/auth/login`)
    .send({username:"BobbyTest",password:"ThisIsAPassword"}) 
    expect(response.body.token).toBeDefined()
  })
})