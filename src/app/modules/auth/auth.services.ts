import { User } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import createHttpError from "http-errors";
import { createToken, verifyToken } from "../../../shared/jwt";
import envConfig from "../../../envConfig";
import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RefreshTokenType, RegisterReturnType } from "../../../interfaces/user";
import { excludeField } from "../../../shared/ExcludeField";

const registerUser = async (payload: User): Promise<RegisterReturnType> => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isExistUser) {
    throw new createHttpError.BadRequest(
      "user already exist. try with another email"
    );
  }
  //   hash password by bcrypt
  payload.password = await bcrypt.hash(
    payload.password,
    Number(envConfig.bcryptSoltRound)
  );

  const user = await prisma.user.create({
    data: payload,
  });

  if (!user) {
    throw new createHttpError.BadRequest("failed to create user");
  }

  const tokenData = { userId: user.id, email: user.email };
  const userExceptPassword = excludeField(user, ["password"]);
  // create access and refresh token
  const accessToken = createToken(
    tokenData,
    envConfig.jwt.jwt_secret as Secret,
    envConfig.jwt.jwt_expireIn as string
  );

  const refreshToken = createToken(
    tokenData,
    envConfig.jwt.jwt_secret as Secret,
    envConfig.jwt.jwt_refresh_expireIn as string
  );

  return {
    accessToken,
    refreshToken,
    user: userExceptPassword,
  };
};

const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<RegisterReturnType> => {
  // check user exist or not
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new createHttpError.BadRequest("wrong credientials");
  }

  //   check password
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new createHttpError.Unauthorized("wrong credientials");
  }

  const tokenData = { userId: user.id, email: user.email };

  const userExceptPassword = excludeField(user, ["password"]);

  //   create access and refresh token
  const accessToken = createToken(
    tokenData,
    envConfig.jwt.jwt_secret as Secret,
    envConfig.jwt.jwt_expireIn as string
  );

  const refreshToken = createToken(
    tokenData,
    envConfig.jwt.jwt_secret as Secret,
    envConfig.jwt.jwt_refresh_expireIn as string
  );

  return {
    accessToken,
    refreshToken,
    user: userExceptPassword,
  };
};

const refreshToken = async (payload: string): Promise<RefreshTokenType> => {
  // check token is valid or not
  const verifiedToken = verifyToken(
    payload,
    envConfig.jwt.jwt_secret as Secret
  );
  if (!verifiedToken) {
    throw new createHttpError.Unauthorized("invalid refresh token");
  }
  const { userId } = verifiedToken;

  //check user exist or not by this token email
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUserExist) {
    throw new createHttpError.Unauthorized("user does not exist");
  }

  const tokenData = { userId: isUserExist.id, email: isUserExist.email };

  //create new access token
  const newAccessToken = createToken(
    tokenData,
    envConfig.jwt.jwt_secret as Secret,
    envConfig.jwt.jwt_expireIn as string
  );
  return { accessToken: newAccessToken };
};

export const authServices = { registerUser, loginUser, refreshToken };
