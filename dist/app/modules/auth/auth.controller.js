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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncTryCatch_1 = require("../../../shared/asyncTryCatch");
const genericResponse_1 = __importDefault(require("../../../shared/genericResponse"));
const auth_services_1 = require("./auth.services");
const registerUser = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const _a = yield auth_services_1.authServices.registerUser(userData), { refreshToken } = _a, result = __rest(_a, ["refreshToken"]);
    res.cookie("refreshToken", refreshToken);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user register successful",
        data: result,
    });
}));
const loginUser = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const _b = yield auth_services_1.authServices.loginUser(loginData), { refreshToken } = _b, result = __rest(_b, ["refreshToken"]);
    res.cookie("refreshToken", refreshToken);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user login successful",
        data: result,
    });
}));
const refreshToken = (0, asyncTryCatch_1.asyncTryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_services_1.authServices.refreshToken(refreshToken);
    (0, genericResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "get new access token",
        data: result,
    });
}));
exports.authController = {
    registerUser,
    loginUser,
    refreshToken,
};
