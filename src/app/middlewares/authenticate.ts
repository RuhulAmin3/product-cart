import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Secret } from "jsonwebtoken";
import { verifyToken } from "../../shared/jwt";
import envConfig from "../../envConfig";

export const authenticate =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new createHttpError.Unauthorized("unauthorized user");
      }
      const verifiedToken = verifyToken(
        token,
        envConfig.jwt.jwt_secret as Secret
      );

      if (!verifiedToken) {
        throw new createHttpError.Unauthorized("invalid token");
      }
      req.user = verifiedToken;
      next();
    } catch (err) {
      next(err);
    }
  };
