import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const followuser = async (userid: string) => {
  try {
    const serverResponse = await axios.post(
      `${SERVER}/api/v1/users/follow/${userid}`,
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

// users/follow/65e5b9dfab244c080276afa0
