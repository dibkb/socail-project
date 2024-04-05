import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const deletePost = async (postid: string) => {
  try {
    const serverResponse = await axios.delete(
      `${SERVER}/api/v1/posts/${postid}`,
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
