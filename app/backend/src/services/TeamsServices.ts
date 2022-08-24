import team from '../database/models/team';
import { TypeTeams } from '../interfaces/interfaces';

export default class TeamsServices {
  public getAllTeams = async (): Promise<Array<TypeTeams>> => {
    const teams = await team.findAll();
    return teams;
  };

  public getTeamsById = async (id: number): Promise<TypeTeams> => {
    const teamFound = await team.findByPk(id);
    return teamFound as TypeTeams;
  };
}
