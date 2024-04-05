import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const logoutUser = async () => {
  try {
    const serverResponse = await axios.post(
      `${SERVER}/api/v1/users/logout/`,
      {},
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
