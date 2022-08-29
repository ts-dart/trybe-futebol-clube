import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';

import * as bcryptjs from 'bcryptjs'; 
import * as Jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração Rota /login', () => {
  it('quando a requisição e bem sucedida, e gerado um token após o login ser feito', async () => {
    const modelMock: unknown = { email: 'test@test.test', password: 'test' };
    sinon.stub(user, 'findOne').resolves(modelMock as user);

    sinon.stub(bcryptjs, 'compare').resolves(true);
  
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'test@test.test', password: 'test' });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');  
    sinon.restore()
  });
  it('quando a requisição e feita sem informar email e senha', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send();

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message').equal('All fields must be filled');  
  });
  it('quando o usuario não e encontrado pois email não e encontrado na base de dados', async () => {
    const modelMock: unknown = false;
    sinon.stub(user, 'findOne').resolves(modelMock as user);
    sinon.stub(bcryptjs, 'compare').resolves(true);
    const login = { email: 'wrongemail@test.com', password: 'test' };

    const response = await chai
      .request(app)
      .post('/login')
      .send(login);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message').equal('Incorrect email or password');
    sinon.restore()  
  });
  it('quando o usuario não e encontrado pois a senha esta incorreta', async () => {
    const modelMock: unknown = { email: 'test@test.test', password: 'test' };
    sinon.stub(user, 'findOne').resolves(modelMock as user);
    sinon.stub(bcryptjs, 'compare').resolves(false);
    const login = { email: 'test@test.com', password: 'wrongpassword' };

    const response = await chai
      .request(app)
      .post('/login')
      .send(login);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message').equal('Incorrect email or password');  

    sinon.restore()
  });
  it('quando ocorre um erro interno', async () => {
    const login = { email: 1, password: 1 };

    const response = await chai
      .request(app)
      .post('/login')
      .send(login);

    expect(response.status).to.be.equal(500);
  });
});

describe('Testes de integração Rota /login/validate', () => {
  it('quando a requisição for bem sucedida', async () => {
    sinon.stub(Jwt, 'verify').resolves({ email: 'test@test.com' });

    const modelMock: unknown = { email: 'test@test.test', password: 'test' };
    sinon.stub(user, 'findOne').resolves(modelMock as user);

    const response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', 'fgvbcgdfg54fdgh');

    expect(response.status).to.equal(200);

    sinon.restore();
  });
  it('quando ocorre um erro interno', async () => {
    const response = await chai.request(app)
      .get('/login/validate')
      .set('authorization', 'fgvbcgdfg54fdgh');

    expect(response.status).to.be.equal(500);
  });
});
