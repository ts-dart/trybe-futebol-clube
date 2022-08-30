import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';
import team from '../database/models/team';
import match from '../database/models/match';

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

describe('Testes de integração Rota /teams', () => {
  it('quando a requisição for bem sucedida,  e todos os times são retornados', async () => {
    sinon.stub(team, 'findAll').resolves([]);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.equal(200);
    expect(Array.isArray(response.body)).to.be.equal(true);

    sinon.restore();
  });
  it('quando ocorre um erro interno', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(500);
  });
}); 

describe('Testes de integração Rota /teams/:id', () => {
  it('quando a requisição for bem sucedida, e apenas o time correspondente ao id e retornado', async () => {
    const modelMock: unknown = { id: 1, teamName: 'cruzeiro' };
    sinon.stub(team, 'findByPk').resolves(modelMock as user);

    const response = await chai.request(app)
      .get('/teams/5')
      .set('params', 'id');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('teamName').equal('cruzeiro'); 

    sinon.restore();
  });
  it('quando ocorre um erro interno', async () => {
    const response = await chai.request(app).get('/teams/5');
    expect(response.status).to.be.equal(500);
  });
}); 

describe('Testes de integração Rota /matches', () => {
  it('quando a requisição for bem sucedida, quando o progress e passado', async () => {
    const modelMock: unknown = { id: 1, teamName: 'cruzeiro', inProgress: true};
    sinon.stub(match, 'findAll').resolves([modelMock as user]);

    const response = await chai.request(app)
      .get('/matches?inProgress=true')

    expect(response.status).to.equal(200);
    expect(response.body[0]).to.have.property('teamName').equal('cruzeiro'); 

    sinon.restore();
  });
  it('quando a requisição for bem sucedida, quando o progress não e passado', async () => {
    const modelMock: unknown = { id: 1, teamName: 'cruzeiro'};
    sinon.stub(match, 'findAll').resolves([modelMock as user]);

    const response = await chai.request(app).get('/matches')

    expect(response.status).to.equal(200);
    expect(response.body[0]).to.have.property('teamName').equal('cruzeiro'); 

    sinon.restore();
  });
  it('quando ocorre um erro interno', async () => {
    const response = await chai.request(app)
      .get('/matches?inProgress=true')
      .set('query', 'inProgress');

    expect(response.status).to.be.equal(500);
  });
});

describe('Testes de integração Rota /matches', () => {
  it('quando a requisição for bem sucedida', async () => {
    sinon.stub(Jwt, 'verify').resolves({ email: 'test@test.com' });

    const modelMockFindOne: unknown = { id: 1, teamName: 'cruzeiro'};
    sinon.stub(team, 'findOne').resolves(modelMockFindOne as user);

    const modelMockCreate: unknown = { id: 1, teamName: 'cruzeiro', inProgress: true};
    sinon.stub(match, 'create').resolves(modelMockCreate as user);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'fgvbcgdfg54fdgh')
      .send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('inProgress').equal(true); 

    sinon.restore();
  });
  it('quando a requisição falhar pois não foi fornecido um token correto', async () => {
    const response = await chai.request(app)
      .post('/matches')
      .send({ homeTeam: 16, awayTeam: 8, homeTeamGoals: 2, awayTeamGoals: 2 });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('message').equal('Token must be a valid token'); 

    sinon.restore();
  });
  it('quando a requisição falhar pois e fornecido dois times iguais', async () => {
    sinon.stub(Jwt, 'verify').resolves({ email: 'test@test.com' });

    const modelMockFindOne: unknown = { id: 1, teamName: 'cruzeiro'};
    sinon.stub(team, 'findOne').resolves(modelMockFindOne as user);

    const modelMockCreate: unknown = { id: 1, teamName: 'cruzeiro', inProgress: true};
    sinon.stub(match, 'create').resolves(modelMockCreate as user);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'fgvbcgdfg54fdgh')
      .send({
        homeTeam: 5,
        awayTeam: 5,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('message')
      .equal('It is not possible to create a match with two equal teams'); 

    sinon.restore();
  });
  it('quando a requisição falhar pois o id fornecido na requisição não corresponde a um time', async () => {
    sinon.stub(Jwt, 'verify').resolves({ email: 'test@test.com' });
    sinon.stub(team, 'findOne').resolves();

    const modelMockCreate: unknown = { id: 1, teamName: 'cruzeiro', inProgress: true};
    sinon.stub(match, 'create').resolves(modelMockCreate as user);

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'fgvbcgdfg54fdgh')
      .send({
        homeTeam: 1000,
        awayTeam: 0,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('message')
      .equal('There is no team with such id!'); 

    sinon.restore();
  });
  it('quando ocorre um erro interno', async () => {
    sinon.stub(Jwt, 'verify').resolves({ email: 'test@test.com' });

    const response = await chai.request(app)
      .post('/matches')
      .set('authorization', 'fgvbcgdfg54fdgh')
      .send({
        homeTeam: 16,
        awayTeam: 5,
        homeTeamGoals: 2,
        awayTeamGoals: 2
      });

    expect(response.status).to.be.equal(500);
  });
});
