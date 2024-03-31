import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export async function commentFetcher(postid: string) {
  return axios
    .get(`${SERVER}/api/v1/comment/${postid}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export async function smallProfileFetcher(userid: string) {
  return axios
    .get(`${SERVER}/api/v1/users/name-avatar/${userid}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export async function getAllPosts() {
  return axios
    .get(`${SERVER}/api/v1/posts/all`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
