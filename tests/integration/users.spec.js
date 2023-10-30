const app = require('../../app');
const request = require('supertest');
let users = {};

describe('test POST /api/v1/users endpoint', () => {
    test('test email belum terdaftar -> sukses', async () => {
      try {
        let name = 'pardi agusti';
        let email = 'pardi4@mail.com';
        let password = 'pardi 3334';
        let { statusCode, body } = await request(app).post('/api/v1/accounts').send({ name, email, password});
        users = body.data;
        expect(statusCode).toBe(201);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('id');
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('email');
        expect(body.data).toHaveProperty('password');
    
        expect(body.data.name).toBe(name);
        expect(body.data.email).toBe(email);
        expect(body.data.password).toBe(password);
    
    } catch (error) {
        console.error(error);
        expect(err).toBe('error');
    }
    
    });

    test('test email sudah terdaftar -> error', async () => {
        try {
          let name = 'pardi agusti';
          let email = 'pardi4@mail.com';
          let password = 'pardi 3334';

            let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password });

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe('email sudah dipakai');
        }
    });
});




describe('test GET /api/v1/users endpoint', () => {
    test('test tampilkan user yang terdaftar -> sukses', async () => {
        try {
            const { statusCode, body } = await request(app).get('/api/v1/users');

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', true);
            expect(body).toHaveProperty('message', 'OK');
            expect(body).toHaveProperty('data');

            // Pastikan data adalah array pengguna
            expect(Array.isArray(body.data)).toBe(true);

            // Loop 
            for (const users of body.data) {
                expect(users).toHaveProperty('id');
                expect(users).toHaveProperty('name');
                expect(users).toHaveProperty('email');
                expect(users).toHaveProperty('password');
            }
        } catch (err) {
            console.error(err);
            expect(err).toBe('error');

        }
    });
});


describe('test GET /api/v1/users/:id endpoint', () => {
    test('test cari user dengan id yang terdaftar -> sukses', async () => {
      try {
        let { statusCode, body } = await request(app).get(`/api/v1/users/${users.id}`);
  
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty('status');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
        expect(body.data).toHaveProperty('id');
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('email');
        expect(body.data).toHaveProperty('password');
        expect(body.data.id).toBe(users.id);
        expect(body.data.name).toBe(users.name);
        expect(body.data.email).toBe(users.email);
        expect(body.data.password).toBe(users.password);
      } catch (err) {
        expect('error');
      }
    });
  
    test('test cari user dengan id yang tidak terdaftar -> error', async () => {
      try {
        try {
          let { statusCode, body } = await request(app).get(`/api/v1/users/${users.id + 1000}`);
  
          expect(statusCode).toBe(400);
          expect(body).toHaveProperty('status');
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('data');
          // expect(body.data.id).toBe(user.id);
        } catch (err) {
          expect(err).toBe('error');
        }
      } catch (err) {
        expect('user tidak ditemukan');
      }
    });
  });