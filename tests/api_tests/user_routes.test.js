const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server/app');
const agent = request.agent(app);
const db = require('../../server/db/index').db;

describe('Users routes', function() {
  describe('Login', function() {
    it('logs in a user', function() {
      return agent
        .post('/auth/login')
        .send({
          email: 'Geoff@gmail.com',
          password: 'hello'
        })
        .expect(200)
        .expect(res => {
          expect(res.body.id).to.equal(1)
        })

    })
  })
  describe('Logout', function() {
    it('logs out a user', function() {
      return agent
        .post('/auth/logout')
        .expect(200)
    })
  })
  describe('GET /users', function() {
    afterEach(function() {
      return agent
      .post('/auth/logout')
    })
    it('denies access to nonAdmins', function() {
      return agent.post('/auth/login')
        .send({
          email: 'Geoff@gmail.com',
          password: 'hello'
        })
        .expect(200)
        .then(function(res) {
          return agent
            .get('/api/users')
            .expect(403)
        })
    })
    it('returns a list of all users', function() {
      return agent.post('/auth/login')
        .send({
          email: 'grant@fullstack.com',
          password: 'deadoralive'
        })
        .expect(200)
        .then(function(res) {
          return agent
            .get('/api/users')
            .expect(200)
            .expect(res => {
              expect(res.body.length).to.equal(12)
            })
        })
    })
  })
})
