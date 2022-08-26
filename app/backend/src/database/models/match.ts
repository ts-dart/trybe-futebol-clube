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
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
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

match.belongsTo(team, { foreignKey: 'homeTeam', as: 'teamHome' });
match.belongsTo(team, { foreignKey: 'awayTeam', as: 'teamAway' });

team.hasMany(match, { foreignKey: 'homeTeam', as: 'teamHome' });
team.hasMany(match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default match;
