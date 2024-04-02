import { Post, Threads } from "@/types";
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
// export async function getUserPostsByUsername(userid: string) {
//   return axios
//     .get(`${SERVER}/api/v1/posts/all/username/${userid}`, {
//       withCredentials: true,
//     })
//     .then((res) => res.data as );
// }
export async function getUserPostsByUsername(username: string) {
  try {
    const serverResponse = await axios(
      `${SERVER}/api/v1/posts/all/username/${username}`,
      {
        method: "get",
        withCredentials: true,
      }
    );
    return {
      data: serverResponse.data as { posts: Post[]; threads: Threads[] },
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
}
