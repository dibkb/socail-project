import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getUserPosts(userid: string) {
  try {
    const serverResponse = await axios.get(
      `${SERVER}/api/v1/posts/all/${userid}`,
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
export async function getUserPostsByUsername(username: string) {
  try {
    const serverResponse = await axios.get(
      `${SERVER}/api/v1/posts/all/username/${username}`,
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
