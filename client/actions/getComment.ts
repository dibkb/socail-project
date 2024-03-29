import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export function commentFetcher(postid: string) {
  return axios
    .get(`${SERVER}/api/v1/comment/${postid}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export function smallProfileFetcher(userid: string) {
  return axios
    .get(`${SERVER}/api/v1/users/name-avatar/${userid}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
