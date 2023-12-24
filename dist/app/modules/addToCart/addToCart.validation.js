"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartValidtion = void 0;
const zod_1 = require("zod");
const createAddToCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z
            .number({
            required_error: "quantity is required",
        })
            .positive("quantity must be greater than 0"),
        color: zod_1.z.string({
            required_error: "color is required",
        }),
        size: zod_1.z.string({
            required_error: "size is required",
        }),
        subTotal: zod_1.z.number({
            required_error: "subTotal is required",
        }),
        productId: zod_1.z.string({
            required_error: "product id is required",
        }),
        userId: zod_1.z.string({
            required_error: "user id is required",
        }),
    }),
});
exports.addToCartValidtion = {
    createAddToCartSchema,
};
