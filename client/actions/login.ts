import { loginSchema } from "@/schemas";
import { z } from "zod";
import axios from "axios";
export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { password, username } = validatedFields.data;
  const serverResponse = axios.post(
    "http://localhost:3999/api/v1/users/login",
    {
      password,
      username,
    },
    {
      withCredentials: true,
    }
  );
  console.log(serverResponse);
};
