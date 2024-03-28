import { Post, Threads } from "@/types";
import React from "react";
interface Posts {
  posts: Post[];
  threads: Threads[];
}
const Posts = ({ posts, threads }: Posts) => {
  return <div>Posts</div>;
};

export default Posts;
