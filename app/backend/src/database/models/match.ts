import { Model, INTEGER, BOOLEAN } from 'sequelize';
import team from './team';
import db from '.';

class match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

match.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamsGoal: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeams: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamsGoal: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'match',
  timestamps: false,
  underscored: false,
});

match.belongsTo(team, { foreignKey: 'homeTeam', as: 'homeTeam' });
match.belongsTo(team, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default match;
