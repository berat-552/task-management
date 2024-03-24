import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email({ message: "Invalid email address format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((password) => !/\s/.test(password), {
      message: "Password cannot contain spaces",
    }),
});

export default userSchema;
