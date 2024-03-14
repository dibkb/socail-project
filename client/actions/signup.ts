import { signinSchema } from "@/schemas";
import { z } from "zod";
import axios from "axios";
export const register = async (values: z.infer<typeof signinSchema>) => {
  const validatedFields = signinSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name, username } = validatedFields.data;
  const serverResponse = axios.post(
    "http://localhost:3999/api/v1/users/signup",
    {
      email,
      password,
      name,
      username,
    }
  );
};
