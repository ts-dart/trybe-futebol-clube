import team from '../database/models/team';
import match from '../database/models/match';
import Team from '../classes/GenericTeam';
import { TypeAllMatche, TypeTeams, TypeClasseTeam } from '../interfaces/interfaces';

export default class LeaderboardServices {
  // eslint-disable-next-line max-lines-per-function
  public homeTeamRankings = async ()/* : Promise<Array<TypeClasseTeam>> */ => {
    const teams: Array<TypeTeams> = await team.findAll();
    const matches: Array<TypeAllMatche> = await match.findAll();
    const leaderboard: Array<TypeClasseTeam> = [];
    const result: Array<TypeClasseTeam> = [];

    teams.forEach((t) => leaderboard.push(new Team(t, matches)));
    return result;
  };
}
