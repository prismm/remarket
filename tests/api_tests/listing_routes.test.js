const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../server/app');
const agent = request.agent(app);
const db = require('../../server/db/index').db;

describe('Listings routes', function() {
  describe('GET /api/listings', function() {
    it('returns all active listings', function() {
      return agent
        .get('/api/listings')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).to.have.length(25);
        })
    })
  })

  describe('GET /api/listings/id', function() {
    it('returns an individual listing by id', function() {
      return agent
        .get('/api/listings/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.name).to.equal('Queen-size mattress')
        })
    })

    it('throws an error if an invalid id is given', function() {
      return agent
        .get('/api/listings/20392')
        .expect(404)
    })
  })
})
