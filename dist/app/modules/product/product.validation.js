"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "title is required",
        }),
        image: zod_1.z.string().array().nonempty("add at least one image"),
        slug: zod_1.z.string({ required_error: "slug is required" }),
        category: zod_1.z.string({ required_error: "category is required" }),
        color: zod_1.z.string().array().nonempty("add at least one color varient"),
        size: zod_1.z.string().array().nonempty("add at least one size varient"),
        price: zod_1.z.number({ required_error: "price is required" }),
        userId: zod_1.z.string({
            required_error: "user id is required",
        }),
        description: zod_1.z.string().optional(),
    }),
});
const updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        image: zod_1.z.string().array().nonempty("add at least one image").optional(),
        slug: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        color: zod_1.z
            .string()
            .array()
            .nonempty("add at least one color varient")
            .optional(),
        size: zod_1.z
            .string()
            .array()
            .nonempty("add at least one size varient")
            .optional(),
        price: zod_1.z.number().optional(),
        userId: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.productValidation = { createProductSchema, updateProductSchema };
