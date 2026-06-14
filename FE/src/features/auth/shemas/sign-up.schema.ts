import { PASSWORD_REGEX } from "@/constants";
import z from "zod";

export const signUpFormSchema = z.object({
  userName: z
    .string()
    .min(6, "Username must be at least 6 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username only contains letters, numbers and underscores",
    ),

  email: z.email("Enter a valid email address"),

  fullName: z
    .string()
    .min(6, "Full name must be at least 6 characters")
    .max(100, "Full name must be at most 100 characters"),

  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must be 8-72 characters and contain uppercase, lowercase, number and special character",
    ),

  companyName: z
    .string()
    .max(100, "Company name must be at most 100 characters")
    .optional(),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
