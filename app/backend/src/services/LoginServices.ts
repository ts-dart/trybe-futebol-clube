import * as bcryptjs from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import ReturnDefaultService, { TypeToken } from '../interfaces/interfaces';
import user from '../database/models/user';

export default class LoginServices {
  public loginPost = async (body: { email: string, password: string })
  : Promise<ReturnDefaultService | TypeToken> => {
    if (!body.email || !body.password) return { code: 400, msg: 'All fields must be filled' };

    const { email, password } = body;
    const userFound = await user.findOne({ where: { email } });
    const crypt = await bcryptjs.compare(password, String(userFound?.password));

    if (!userFound || !crypt) return { code: 401, msg: 'All fields must be filled' };
    return { token: Jwt.sign(body, String(process.env.JWT_SECRET)) };
  };
}
