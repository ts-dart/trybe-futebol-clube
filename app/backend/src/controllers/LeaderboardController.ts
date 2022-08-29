import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardController {
  constructor(private leaderboardServices: LeaderboardServices = new LeaderboardServices()) {}

  public homeTeamRankings = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.leaderboardServices.homeTeamRankings();
      // if (result.code) return res.status(result.code).send({ message: result.msg });
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}
