import { z } from "zod";

const createAddToCartSchema = z.object({
  body: z.object({
    quantity: z
      .number({
        required_error: "quantity is required",
      })
      .positive("quantity must be greater than 0"),

    color: z.string({
      required_error: "color is required",
    }),
    size: z.string({
      required_error: "size is required",
    }),
    subTotal: z.number({
      required_error: "subTotal is required",
    }),
    productId: z.string({
      required_error: "product id is required",
    }),
    userId: z.string({
      required_error: "user id is required",
    }),
  }),
});

export const addToCartValidtion = {
  createAddToCartSchema,
};
