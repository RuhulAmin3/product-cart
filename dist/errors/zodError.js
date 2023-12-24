"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errors = err.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
    }));
    const statusCode = 400;
    return {
        name: err.name,
        statusCode,
        message: "Zod validation Error",
        errorMessages: errors,
    };
};
exports.handleZodError = handleZodError;
