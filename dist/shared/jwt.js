"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
const createToken = (payload, secret, expireTime) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expireTime });
    return token;
};
exports.createToken = createToken;
