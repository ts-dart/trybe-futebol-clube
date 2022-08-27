import * as Jwt from 'jsonwebtoken';
import team from '../database/models/team';
import match from '../database/models/match';

import {
  TypeAllMatche,
  TypeNewMatch,
  TypeJwtVerify,
  ReturnDefaultService,
  TypeAlterProgressMatch,
  TypeUpdateMatch,
} from '../interfaces/interfaces';

export default class MatchesServices {
  public getAllMatches = async (progress: unknown): Promise<Array<TypeAllMatche>> => {
    const allMatches: Array<TypeAllMatche> = await match.findAll({
      include: [{
        model: team,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: team,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    if (progress !== undefined) {
      return allMatches.filter((OBJ) => String(OBJ.inProgress) === progress);
    }

    return allMatches;
  };

  public postMatch = async (token: string, body: TypeNewMatch)
  : Promise<TypeNewMatch | ReturnDefaultService> => {
    const { email } = Jwt.verify(token, String(process.env.JWT_SECRET)) as TypeJwtVerify;
    if (!email) return { code: 401, msg: 'Token must be a valid token' };
    if (body.homeTeam === body.awayTeam) {
      return { code: 401, msg: 'It is not possible to create a match with two equal teams' };
    }

    const homeTeam = await team.findOne({ where: { id: body.homeTeam } });
    const awayTeam = await team.findOne({ where: { id: body.awayTeam } });
    if (!homeTeam || !awayTeam) return { code: 404, msg: 'There is no team with such id!' };

    const data = await match.create({ ...body, inProgress: true });
    return data;
  };

  public alterProgressMatch = async (id: number): Promise<TypeAlterProgressMatch> => {
    await match.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  public updateMatch = async (id: number, body: TypeUpdateMatch): Promise<TypeUpdateMatch> => {
    await match.update({
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
    }, {
      where: { id },
    });

    return { message: `The match identified by id ${id} has been updated successfully` };
  };
}
