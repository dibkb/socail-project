import axios from "axios";
import { instance } from "./instance";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export async function commentFetcher(postid: string) {
  return axios
    .get(`${SERVER}/api/v1/comment/${postid}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export async function searchNameUsername(query: string) {
  return axios
    .get(`${SERVER}/api/v1/users/search/name&username?query=${query}`, {
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
export async function getAllPosts(parturl: string) {
  // api/v1/posts/all?per_page=4&page=1
  return instance
    .get(`${SERVER}/api/v1/posts/all?${parturl}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export async function getAllThreads(parturl: string) {
  // posts/all/threads?per_page=4&page=1
  return instance
    .get(`${SERVER}/api/v1/posts/${parturl}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export function getAllCoomentsUser(id: string) {
  return axios
    .get(`${SERVER}/api/v1/comment/user/all`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export function getAllUserNotifications(id: string) {
  return axios
    .get(`${SERVER}/api/v1/notification/all`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
export function getAllCoomentsUserById(id: string) {
  if (!id) return;
  return axios
    .get(`${SERVER}/api/v1/comment/user/${id}/all`, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
