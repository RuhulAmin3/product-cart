import { User } from "@prisma/client";

export type IUser = {
  userId: string;
  email: string;
};

export type RegisterReturnType = {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, "password">;
};

export type LoginReturnType = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RefreshTokenType = {
  accessToken: string;
};
