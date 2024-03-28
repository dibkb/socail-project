import { Post, Threads } from "@/types";
type input = Post | (Threads & { threadId?: never });
export const sortbyTimeAscending = (a: input, b: input) => {
  const timeA = new Date(a.createdAt).getTime();
  const timeB = new Date(b.createdAt).getTime();
  return timeB - timeA;
};
