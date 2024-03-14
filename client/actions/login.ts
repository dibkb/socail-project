import { loginSchema } from "@/schemas";
import { z } from "zod";
import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { password, username } = validatedFields.data;
  try {
    const serverResponse = await axios.post(
      `${SERVER}/api/v1/users/login`,
      {
        password,
        username,
      },
      {
        withCredentials: true,
      }
    );
    return {
      data: serverResponse.data,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
