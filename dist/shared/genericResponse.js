"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericResponse = (res, data) => {
    return res.status(data.statusCode).json({
        success: true,
        message: data.message,
        data: data.data,
        meta: data.meta || null,
    });
};
exports.default = genericResponse;
