import { z } from "zod";

const createProductSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    image: z.string().array().nonempty("add at least one image"),
    slug: z.string({ required_error: "slug is required" }),
    category: z.string({ required_error: "category is required" }),
    color: z.string().array().nonempty("add at least one color varient"),
    size: z.string().array().nonempty("add at least one size varient"),
    price: z.number({ required_error: "price is required" }),
    userId: z.string({
      required_error: "user id is required",
    }),
    description: z.string().optional(),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().array().nonempty("add at least one image").optional(),
    slug: z.string().optional(),
    category: z.string().optional(),
    color: z
      .string()
      .array()
      .nonempty("add at least one color varient")
      .optional(),
    size: z
      .string()
      .array()
      .nonempty("add at least one size varient")
      .optional(),
    price: z.number().optional(),
    userId: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const productValidation = { createProductSchema, updateProductSchema };
