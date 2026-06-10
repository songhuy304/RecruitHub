import { z } from "zod";

export const signInFormSchema = z.object({
  userName: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
