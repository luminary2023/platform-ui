import { z } from "zod";

export const SignUp = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name is required" })
    .max(18)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore (_)"
    ),
  lastName: z
    .string()
    .min(3, { message: "Last name  is required" })
    .max(18)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "The username must contain only letters, numbers and underscore (_)"
    ),
  password: z.string().min(8, { message: "Password is required" }).max(24),
  email: z.string().email({ message: "Email required" }),
});

export const Login = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(8, { message: "Password required" }).max(24),
});

export const codeValidation = z.object({
  // email: z.string().email({ message: "Email is required" }),
  verificationCode: z.string().min(8, { message: "code required" }).max(24),
});

export const forgotPassword = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const bankDetails = z.object({
  // bankId: z.string().min(3, { message: "Bank name is required" }).max(10),
  accountNumber: z
    .string()
    .min(10, { message: "Account number is required" })
    .max(12),
});
