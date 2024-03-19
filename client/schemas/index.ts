import * as z from "zod";
export const signinSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(3, {
    message: "Minimum 3 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
});
export const loginSchema = z.object({
  password: z.string().min(3, {
    message: "Minimum 3 characters required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
});
export const updateSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  bio: z.string(),
});
