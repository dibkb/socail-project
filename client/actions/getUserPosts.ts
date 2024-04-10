import { Post, Threads } from "@/types";
import axios from "axios";
import { instance } from "./instance";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export async function getUserPosts(parturl: string) {
  // api/v1/posts/all/65f291d200d69492e11a65e2?per_page=4&page=1
  return instance
    .get(`${SERVER}/api/v1/posts/all/${parturl}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export async function getUserThreads(parturl: string) {
  // api/v1/posts/all/threads/65f291d200d69492e11a65e2?per_page=4&page=1
  return instance
    .get(`${SERVER}/api/v1/posts/all/${parturl}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
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
