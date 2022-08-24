import { Request, Response } from 'express';
import TeamsServices from '../services/TeamsServices';

export default class Teams {
  constructor(private teamsServices: TeamsServices = new TeamsServices()) {}

  public getAllTeams = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.teamsServices.getAllTeams();
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public getTeamsById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.teamsServices.getTeamsById(Number(req.params.id));
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}
