import { Model, STRING, NUMBER } from 'sequelize';
import db from '.';

class team extends Model {
  public id!: number;
  public teamName!: string;
}

team.init({
  id: {
    type: NUMBER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'team',
  timestamps: false,
  underscored: false,
});

export default team;
