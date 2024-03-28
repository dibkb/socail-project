import { Post, Threads } from "@/types";
import React from "react";
import { User } from "@/src/stores/user-store";
import { Singlepost } from "./single-post";
interface Posts {
  posts: Post[];
  threads: Threads[];
  user?: User;
}
const Posts = ({ posts, threads, user }: Posts) => {
  console.log(posts);
  console.log(threads);
  if (!user) return;
  return (
    <div>
      {threads.map((th) => (
        <main
          key={th.id}
          className="flex flex-col gap-3 border-b border-stone-800 pb-6"
        >
          {/* Thread body */}
          <Singlepost post={th} username={user?.username} />
          {posts
            .filter((post) => post.threadId === th.id)
            .map((post, id) => (
              <Singlepost
                key={post.id}
                post={post}
                username={user?.username}
                trail={
                  id === posts.filter((post) => post.threadId === th.id).length
                }
              />
            ))}
        </main>
      ))}
    </div>
  );
};

export default Posts;
