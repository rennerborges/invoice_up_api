/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable import/extensions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');
require('../bin/www');

dotenv.config({ path: './variables.env' });

const { describe, it, after } = require('mocha');

const { expect } = chai;

const baseUrl = `http://localhost:${process.env.PORT}`;

chai.use(chaiHttp);

describe('Testes de Usuário na API', () => {
  let token = '';
  const newUser = {
    name: 'Teste',
    password: '12345678@Re',
    email: 'test@gmail.com',
  };
  const updateUser = {
    name: 'Teste atualizado',
  };

  it('Criar um usuário', (done) => {
    chai
      .request(baseUrl)
      .post('/user')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('Criar um usuário com um e-mail já existente', (done) => {
    chai
      .request(baseUrl)
      .post('/user')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Login com o usuário criado', (done) => {
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
        token = res.body.token;
        done();
      });
  });

  it('Buscar todos os usuários sem informar o token', (done) => {
    chai
      .request(baseUrl)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('Buscar todos os usuários sem informar um token válido', (done) => {
    chai
      .request(baseUrl)
      .get('/users')
      .set('token', 'eu_sou_um_token_invalido')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('Buscar todos os usuários sem informar um token com o usuário sem permissão para a ação', (done) => {
    chai
      .request(baseUrl)
      .get('/users')
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Atualizar usuário sem o token', (done) => {
    chai
      .request(baseUrl)
      .patch('/user')
      .send(updateUser)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('Atualizar usuário com sucesso!', (done) => {
    chai
      .request(baseUrl)
      .patch('/user')
      .set('token', token)
      .send(updateUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  after((done) => {
    const UserModel = require('../src/models/user');

    UserModel.deleteOne({
      email: newUser.email,
    })
      .then(() => {
        console.log('[TEST] Usuário de testes apagado com sucesso!');
        done();
      })
      .catch((error) => {
        console.log(error);
        done(error);
      });
  });
});
