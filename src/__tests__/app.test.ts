
/**
 * The following tests directly manipulate the database which is not good
 * other alternatives are
 * - mock database responses
 * - use test db
 * - use temp db
 */


import supertest from 'supertest';
import app from '..';
import { closeDB } from '../db';

function generateUniqueEmail(prefix: string = 'user'): string {
  const uniqueId = Date.now().toString(36); // Using timestamp as a unique identifier
  const email = `${prefix}_${uniqueId}@example.com`;

  return email;
}

afterAll((done) => {
  closeDB();
  done();
});


const newUser = {
  "firstName": "Michael",
  "lastName": "Knight",
  "email": "youssefhossam89.test.account@gmail.com",
  "marketingConsent": false
}


describe('GET /', () => {
  it('should respond with 404 NOT FOUND', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(404);
  });
});

describe('GET /api/v1/user/{id}', () => {
  it('should respond with 401 UNAUTHENTICATED', async () => {
    const response = await supertest(app).get('/api/v1/user/178263');
    expect(response.status).toBe(401);
  });
});

describe('POST /api/v1/user', () => {
  const email = generateUniqueEmail()
  it('should create account, respond with 201 CREATED', async () => {
    const response = await supertest(app)
      .post('/api/v1/user')
      .set('Content-Type', 'application/json')
      .send({ ...newUser, email });

    expect(response.status).toBe(201);
  });
  it('should create account, respond with 400 BAD REQUEST', async () => {
    const response = await supertest(app)
      .post('/api/v1/user')
      .set('Content-Type', 'application/json')
      .send({ ...newUser, email });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("email already exists")
  });
});

describe('FULL TEST', () => {
  it('should create account and get user', async () => {
    const response = await supertest(app)
      .post('/api/v1/user')
      .set('Content-Type', 'application/json')
      .send({ ...newUser, email: generateUniqueEmail() });

    expect(response.status).toBe(201);

    const getResponse = await supertest(app)
      .get(`/api/v1/user/${response.body.id}`)
      .set('Authorization', `Bearer ${response.body.token}`);

    expect(getResponse.status).toBe(200);
  });
})