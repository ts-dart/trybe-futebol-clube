import {
  TypeAllMatche,
  TypeTeams,
  TypeClasseTeam,
} from '../interfaces/interfaces';

export default class Team implements TypeClasseTeam {
  private static _matches: TypeAllMatche[];
  private static _team: TypeTeams;
  public name: string;
  public totalPoints: number;
  public totalGames: number;
  public totalVictories: number;
  public totalDraws: number;
  public totalLosses: number;
  public goalsFavor: number;
  public goalsOwn: number;
  public goalsBalance: number;
  public efficiency: string;

  constructor(team: TypeTeams, matches: TypeAllMatche[]) {
    Team._matches = matches;
    Team._team = team;

    this.name = team.teamName;
    this.totalPoints = Team.getTotalPoints();
    this.totalGames = Team.getTotalGames();
    this.totalVictories = Team.getTotalVictories();
    this.totalDraws = Team.getTotalDraws();
    this.totalLosses = Team.getTotalLosses();
    this.goalsFavor = Team.getGoalsFavor();
    this.goalsOwn = Team.getGoalsOwn();
    this.goalsBalance = Team.getGoalsBalance();
    this.efficiency = Team.efficiency();
  }

  private static getTotalPoints = () => {
    const points = (Team.getTotalVictories() * 3) + Team.getTotalDraws();
    return points > 0 ? points : 0;
  };

  private static getTotalGames = () => {
    const matches = Team._matches
      .filter((m) => !m.inProgress && m.homeTeam === Team._team.id);
    return matches.length;
  };

  private static getTotalVictories = () => {
    const matches = Team._matches.filter(
      (m) => !m.inProgress && m.homeTeam === Team._team.id && m.homeTeamGoals > m.awayTeamGoals,
    );
    return matches.length;
  };

  private static getTotalDraws = () => {
    const matches = Team._matches.filter(
      (m) => !m.inProgress && m.homeTeam === Team._team.id && m.homeTeamGoals === m.awayTeamGoals,
    );
    return matches.length;
  };

  private static getTotalLosses = () => {
    const matches = Team._matches.filter(
      (m) => !m.inProgress && m.homeTeam === Team._team.id && m.homeTeamGoals < m.awayTeamGoals,
    );
    return matches.length;
  };

  private static getGoalsFavor = () => {
    const matches = Team._matches.filter((m) => !m.inProgress && m.homeTeam === Team._team.id);
    const goals = matches.reduce((acc, m) => acc + m.homeTeamGoals, 0);
    return goals;
  };

  private static getGoalsOwn = () => {
    const matches = Team._matches.filter((m) => !m.inProgress && m.homeTeam === Team._team.id);
    const goals = matches.reduce((acc, m) => acc + m.awayTeamGoals, 0);
    return goals;
  };

  private static getGoalsBalance = () => {
    const matches = Team._matches.filter((m) => !m.inProgress && m.homeTeam === Team._team.id);
    const goalsFavor = matches.reduce((acc, m) => acc + m.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, m) => acc + m.awayTeamGoals, 0);
    return goalsFavor - goalsOwn;
  };

  private static efficiency = () => {
    const use = (Team.getTotalPoints() / (Team.getTotalGames() * 3)) * 100;
    return String(use.toFixed(2));
  };
}
