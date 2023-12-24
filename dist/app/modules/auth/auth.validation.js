"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string({ required_error: "first name is required" }),
        lastName: zod_1.z.string({ required_error: "last name is required" }),
        email: zod_1.z
            .string({ required_error: "email is required" })
            .email("provide valid email address"),
        password: zod_1.z.string({ required_error: "password id required" }),
    }),
});
exports.authValidation = { registerSchema };
