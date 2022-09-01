import team from '../database/models/team';
import match from '../database/models/match';
import Team from '../classes/GenericTeam';
import { TypeAllMatche, TypeTeams, TypeClasseTeam } from '../interfaces/interfaces';

export default class LeaderboardServices {
  private ranking = () => {

  };

  public homeTeamRankings = async (): Promise<Array<TypeClasseTeam>> => {
    const teams: Array<TypeTeams> = await team.findAll();
    const matches: Array<TypeAllMatche> = await match.findAll();
    const leaderboard: Array<TypeClasseTeam> = [];

    teams.forEach((t) => leaderboard.push(new Team(t, matches)));
    const ranking = leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return 1;
      if (a.totalPoints < b.totalPoints) return -1;
      if (a.totalVictories > b.totalVictories) return 1;
      if (a.totalVictories < b.totalVictories) return -1;
      if (a.goalsBalance > b.goalsBalance) return 1;
      if (a.goalsBalance < b.goalsBalance) return -1;
      if (a.goalsFavor > b.goalsFavor) return 1;
      if (a.goalsFavor < b.goalsFavor) return -1;
      return 0;
    });

    const result = ranking.reverse();
    return result;
  };
}

// Reaferencia: Material consultado para fazer o sort "https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort"