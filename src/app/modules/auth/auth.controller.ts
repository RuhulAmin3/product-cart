import httpStatus, { extra } from "http-status";
import { asyncTryCatch } from "../../../shared/asyncTryCatch";
import genericResponse from "../../../shared/genericResponse";
import { authServices } from "./auth.services";

const registerUser = asyncTryCatch(async (req, res, next) => {
  const userData = req.body;
  const { refreshToken, ...result } = await authServices.registerUser(userData);

  res.cookie("refreshToken", refreshToken);

  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user register successful",
    data: result,
  });
});

const loginUser = asyncTryCatch(async (req, res, next) => {
  const loginData = req.body;
  const { refreshToken, ...result } = await authServices.loginUser(loginData);

  res.cookie("refreshToken", refreshToken);

  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user login successful",
    data: result,
  });
});

const refreshToken = asyncTryCatch(async (req, res, next) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  genericResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "get new access token",
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
  refreshToken,
};
