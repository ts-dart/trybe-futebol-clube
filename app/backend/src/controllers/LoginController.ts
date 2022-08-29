import { Request, Response } from 'express';
import LoginServices from '../services/LoginServices';

export default class LoginController {
  private loginServices: LoginServices;

  constructor() {
    this.loginServices = new LoginServices();
  }

  public loginPost = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.loginServices.loginPost(req.body);
      if (result.code) return res.status(result.code).send({ message: result.msg });
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public loginGet = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this
        .loginServices.loginGet(String(req.headers.authorization)) as { role: string };
      return res.status(200).send({ role: result.role });
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}
