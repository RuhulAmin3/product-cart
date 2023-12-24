"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const zodError_1 = require("../../errors/zodError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = "something is wrong";
    let errorMessages = [];
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, zodError_1.handleZodError)(err);
        statusCode = zodError.statusCode;
        message = zodError.name;
        errorMessages = zodError.errorMessages;
    }
    else if (err instanceof Error) {
        message = err.name;
        statusCode = err.status;
        errorMessages = [{ path: "", message: err.message }];
    }
    res.status(statusCode ? statusCode : 500).json({
        success: false,
        name: message,
        errorMessages,
    });
};
exports.default = globalErrorHandler;
