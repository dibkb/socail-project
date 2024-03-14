import { signinSchema } from "@/schemas";
import { z } from "zod";

export const register = async (values: z.infer<typeof signinSchema>) => {
  const validatedFields = signinSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name, username } = validatedFields.data;
  console.log(email, password, name, username);
};
