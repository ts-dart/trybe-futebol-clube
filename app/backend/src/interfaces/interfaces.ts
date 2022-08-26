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
