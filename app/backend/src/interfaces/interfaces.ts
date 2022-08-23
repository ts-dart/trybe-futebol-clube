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
