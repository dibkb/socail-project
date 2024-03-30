import { signinSchema } from "@/schemas";
import { z } from "zod";
import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const register = async (values: z.infer<typeof signinSchema>) => {
  const validatedFields = signinSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, name, username } = validatedFields.data;
  try {
    const serverResponse = await axios.post(`${SERVER}/api/v1/users/signup`, {
      email,
      password,
      name,
      username,
    });
    return {
      data: serverResponse.data,
    };
  } catch (error: any) {
    return {
      error: error?.response?.data?.error,
    };
  }
};
// `${SERVER}/api/v1/users/login`
