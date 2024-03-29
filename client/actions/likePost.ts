import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const likePost = async (postid: string) => {
  try {
    const serverResponse = await axios.post(
      `${SERVER}/api/v1/posts/like/${postid}`,
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
export const unlikePost = async (postid: string) => {
  try {
    const serverResponse = await axios.post(
      `${SERVER}/api/v1/posts/unlike/${postid}`,
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
