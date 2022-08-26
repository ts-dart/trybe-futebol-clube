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
}
