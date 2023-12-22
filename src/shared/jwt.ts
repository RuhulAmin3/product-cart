import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IUser } from "../interfaces/user";

export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const createToken = (
  payload: IUser,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime });

  return token;
};
