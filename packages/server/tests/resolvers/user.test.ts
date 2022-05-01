import { closeDbConnection, connectToDb, dropTestDb } from "../__testSetup__";
import 'isomorphic-fetch';

beforeAll(async () => {
  await connectToDb()
  await dropTestDb()
});

afterAll(async () => {
  await dropTestDb()
  await closeDbConnection()
});

describe("User Queries", () => {
  test('register', async () => {
    const registerUser = `
      mutation {
        register(username: "rahaman", password: "123456") {
        _id
        username
        token
      }
    }
    `
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: registerUser })
    })
    const { data: { register } } = await res.json();
    expect(register).toHaveProperty('_id');
    expect(register._id).not.toBe(null);
    expect(register).toHaveProperty('token');
    expect(register).toHaveProperty('username');
    expect(register.username).toEqual('rahaman');
  })
  test('login', async () => {
    const loginUser = `
      mutation {
        login(username: "rahaman", password: "123456") {
        _id
        username
        token
      }
    }
    `
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: loginUser })
    })
    const { data: { login } } = await res.json();
    expect(login).toHaveProperty('_id');
    expect(login._id).not.toBe(null);
    expect(login).toHaveProperty('token');
    expect(login).toHaveProperty('username');
    expect(login.username).toEqual('rahaman');
  })
})
