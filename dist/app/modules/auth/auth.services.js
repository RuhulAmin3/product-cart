"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const http_errors_1 = __importDefault(require("http-errors"));
const jwt_1 = require("../../../shared/jwt");
const envConfig_1 = __importDefault(require("../../../envConfig"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ExcludeField_1 = require("../../../shared/ExcludeField");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isExistUser) {
        throw new http_errors_1.default.BadRequest("user already exist. try with another email");
    }
    //   hash password by bcrypt
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(envConfig_1.default.bcryptSoltRound));
    const user = yield prisma_1.prisma.user.create({
        data: payload,
    });
    if (!user) {
        throw new http_errors_1.default.BadRequest("failed to create user");
    }
    const tokenData = { userId: user.id, email: user.email };
    const userExceptPassword = (0, ExcludeField_1.excludeField)(user, ["password"]);
    // create access and refresh token
    const accessToken = (0, jwt_1.createToken)(tokenData, envConfig_1.default.jwt.jwt_secret, envConfig_1.default.jwt.jwt_expireIn);
    const refreshToken = (0, jwt_1.createToken)(tokenData, envConfig_1.default.jwt.jwt_secret, envConfig_1.default.jwt.jwt_refresh_expireIn);
    return {
        accessToken,
        refreshToken,
        user: userExceptPassword,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist or not
    const user = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new http_errors_1.default.BadRequest("wrong credientials");
    }
    //   check password
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new http_errors_1.default.Unauthorized("wrong credientials");
    }
    const tokenData = { userId: user.id, email: user.email };
    const userExceptPassword = (0, ExcludeField_1.excludeField)(user, ["password"]);
    //   create access and refresh token
    const accessToken = (0, jwt_1.createToken)(tokenData, envConfig_1.default.jwt.jwt_secret, envConfig_1.default.jwt.jwt_expireIn);
    const refreshToken = (0, jwt_1.createToken)(tokenData, envConfig_1.default.jwt.jwt_secret, envConfig_1.default.jwt.jwt_refresh_expireIn);
    return {
        accessToken,
        refreshToken,
        user: userExceptPassword,
    };
});
const refreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check token is valid or not
    const verifiedToken = (0, jwt_1.verifyToken)(payload, envConfig_1.default.jwt.jwt_secret);
    if (!verifiedToken) {
        throw new http_errors_1.default.Unauthorized("invalid refresh token");
    }
    const { userId } = verifiedToken;
    //check user exist or not by this token email
    const isUserExist = yield prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!isUserExist) {
        throw new http_errors_1.default.Unauthorized("user does not exist");
    }
    const tokenData = { userId: isUserExist.id, email: isUserExist.email };
    //create new access token
    const newAccessToken = (0, jwt_1.createToken)(tokenData, envConfig_1.default.jwt.jwt_secret, envConfig_1.default.jwt.jwt_expireIn);
    return { accessToken: newAccessToken };
});
exports.authServices = { registerUser, loginUser, refreshToken };
