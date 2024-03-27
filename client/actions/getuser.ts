import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getUserInfo(username: string) {
  try {
    const serverResponse = await axios.get(
      `${SERVER}/api/v1/users/${username}`,
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
}
