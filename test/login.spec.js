/* eslint-disable import/extensions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');
require('../bin/www');

dotenv.config({ path: './variables.env' });

const { describe, it } = require('mocha');

const { expect } = chai;

const baseUrl = `http://localhost:${process.env.PORT}`;

chai.use(chaiHttp);

describe('Testes no login de usuário na API', () => {
  it('Login inválidos', (done) => {
    const loginBody = {
      email: 'renner@gmail.com',
      password: '12345',
    };

    chai
      .request(baseUrl)
      .post('/login')
      .send(loginBody)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('Login válidos', (done) => {
    const loginBody = {
      email: process.env.EMAIL_ACCOUNT_TEST,
      password: process.env.PASSWORD_ACCOUNT_TEST,
    };

    chai
      .request(baseUrl)
      .post('/login')
      .send(loginBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
