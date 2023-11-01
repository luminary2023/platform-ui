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
  bankId: z.string().nonempty({ message: "Bank name is required" }),
  accountNumber: z.string().min(10, { message: "Account number is required" }),
  // accountName: z.string().min(21, { message: "Account name is required" }),
});
export const withdrawDetails = z.object({
  amount: z.string().min(3, { message: "Amount" }),
  bank: z.string().min(3, { message: "Select bank" }),
  // accountName: z.string().min(3, { message: "Account name is required" }),
  // accountNumber: z.string().min(3, { message: "Account number is required" }),
  // accountName: z.string().min(21, { message: "Account name is required" }),
});
export const resetPassword = z.object({
  password: z.string().min(8, { message: "Password is required" }).max(24),
  confirmPassword: z
    .string()
    .min(8, { message: "Password is required" })
    .max(24),
});

export const getInTouch = z.object({
  firstName: z.string().min(3, { message: " required" }),
  lastName: z.string().min(3, { message: " required" }),
  email: z.string().min(3, { message: "required" }),
  phoneNumber: z.string().min(3, { message: " required" }),
  messages: z.string().min(3, { message: " required" }),
});

export const verifyPhoneNumber = z.object({
  phoneNumber: z.string().min(11, { message: " required" }),
});

export const transactionPin = z
  .object({
    pin: z.string().min(4, { message: "Password is required" }).max(4),
    confirmPin: z.string().min(4, { message: "Password is required" }).max(4),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "Passwords don't match",
    path: ["confirmPin"],
  });
export const changeTransactionPinValidation = z
  .object({
    newPin: z.string().min(4, { message: "Password is required" }).max(4),
    currentPin: z.string().min(4, { message: "Password is required" }).max(4),
    confirmPin: z.string().min(4, { message: "Password is required" }).max(4),
  })
  .refine((data) => data.newPin === data.confirmPin, {
    message: "Passwords don't match",
    path: ["confirmPin"],
  });
export const changePasswordValidation = z
  .object({
    newPassword: z.string().min(8, { message: "Password is required" }),
    currentPassword: z.string().min(8, { message: "Password is required" }),
    confirmPassword: z.string().min(8, { message: "Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export const changePasswordPinValidation = z
  .object({
    newPassword: z.string().min(4, { message: "Password is required" }).max(4),
    currentPassword: z
      .string()
      .min(4, { message: "Password is required" })
      .max(4),
    confirmPassword: z
      .string()
      .min(4, { message: "Password is required" })
      .max(4),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
