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
      {[...threads, ...posts.filter((post) => post.threadId === null)].map(
        (th: Post | (Threads & { threadId?: never })) => (
          <main
            key={th.id}
            className="flex flex-col gap-3 border-b border-stone-800 py-6"
          >
            {/* Thread body */}
            <Singlepost
              post={th}
              username={user?.username}
              trail={th.threadId !== null}
            />
            {posts
              .filter((post) => post.threadId === th.id)
              .map((post, id) => (
                <Singlepost
                  key={post.id}
                  post={post}
                  username={user?.username}
                  //   trail={}
                />
              ))}
          </main>
        )
      )}
    </div>
  );
};

export default Posts;
