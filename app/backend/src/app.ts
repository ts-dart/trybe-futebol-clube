import * as express from 'express';
import LoginController from './controllers/LoginController';
import TeamsController from './controllers/TeamsController';
import MatchesController from './controllers/MatchesController';

class App {
  public app: express.Express;
  private login: LoginController;
  private teams: TeamsController;
  private matches: MatchesController;

  constructor() {
    this.app = express();
    this.config();

    this.login = new LoginController();
    this.teams = new TeamsController();
    this.matches = new MatchesController();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.post('/login', this.login.loginPost);
    this.app.get('/login/validate', this.login.loginGet);

    this.app.get('/teams', this.teams.getAllTeams);
    this.app.get('/teams/:id', this.teams.getTeamsById);

    this.app.get('/matches', this.matches.getAllMatches);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
