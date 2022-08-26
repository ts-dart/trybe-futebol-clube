import team from '../database/models/team';
import match from '../database/models/match';
import { TypeAllMatche } from '../interfaces/interfaces';

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
}
