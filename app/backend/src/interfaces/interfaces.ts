export interface ReturnDefaultService {
  code: number,
  msg: string,
}

export interface TypeToken {
  token: string,
  code?: number,
  msg?: string,
}

export interface TypeJwtVerify {
  email: string,
  password: string,
  iat: number,
}

export interface TypeTeams {
  id: number,
  teamName: string,
}

export interface TypeAllMatche {
  id: number,
  homeTeam:number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?: {
    id?: number,
    teamName: string,
  },
  teamAway?: {
    id?: number,
    teamName: string,
  }
}

export interface TypeNewMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  code?: number,
  msg?: string,
}

export interface TypeAlterProgressMatch {
  message: string,
}

export interface TypeUpdateMatch {
  homeTeamGoals?: number,
  awayTeamGoals?: number,
  message?: string,
}

export interface TypeClasseTeam {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}
