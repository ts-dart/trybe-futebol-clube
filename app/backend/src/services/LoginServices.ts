import * as bcryptjs from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { ReturnDefaultService, TypeToken, TypeJwtVerify } from '../interfaces/interfaces';
import user from '../database/models/user';

export default class LoginServices {
  public loginPost = async (body: { email: string, password: string })
  : Promise<ReturnDefaultService | TypeToken> => {
    if (!body.email || !body.password) return { code: 400, msg: 'All fields must be filled' };

    const { email, password } = body;
    const userFound = await user.findOne({ where: { email } });
    const uncrypt = await bcryptjs.compare(password, String(userFound?.password));

    if (!userFound || !uncrypt) return { code: 401, msg: 'Incorrect email or password' };
    return { token: Jwt.sign(body, String(process.env.JWT_SECRET)) };
  };

  public loginGet = async (token: string): Promise<any> => {
    const { email } = Jwt.verify(token, String(process.env.JWT_SECRET)) as TypeJwtVerify;
    const userFound = await user.findOne({ where: { email } });
    return { role: userFound?.role };
  };
}
