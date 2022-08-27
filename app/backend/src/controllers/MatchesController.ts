import { Response, Request } from 'express';
import MatchesServices from '../services/MatchesServices';

export default class MatchesController {
  constructor(private matchesServices: MatchesServices = new MatchesServices()) {}

  public getAllMatches = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this
        .matchesServices.getAllMatches(req.query.inProgress);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public postMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this
        .matchesServices.postMatch(String(req.headers.authorization), req.body);
      if (result.code) return res.status(result.code).send({ message: result.msg });
      return res.status(201).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public alterProgressMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.matchesServices.alterProgressMatch(Number(req.params.id));
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public updateMatch = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log(req.params.id, req.body);
      const result = await this.matchesServices.updateMatch(Number(req.params.id), req.body);
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}
