import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: "first name is required" }),
    lastName: z.string({ required_error: "last name is required" }),
    email: z
      .string({ required_error: "email is required" })
      .email("provide valid email address"),
    password: z.string({ required_error: "password id required" }),
  }),
});

export const authValidation = { registerSchema };
