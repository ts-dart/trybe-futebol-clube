import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;
  public usarname!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usarname: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: false,
});

export default Users;
