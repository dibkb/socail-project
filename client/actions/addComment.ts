import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const addComment = async (postid: string, body: string) => {
  try {
    const serverResponse = await axios.post(
      `${SERVER}/api/v1/comment/${postid}`,
      { body },
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
