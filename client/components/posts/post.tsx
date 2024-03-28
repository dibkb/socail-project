"use client";
import { Post, Threads } from "@/types";
import React from "react";
import { User } from "@/src/stores/user-store";
import { Singlepost } from "./single-post";
import { sortbyTimeAscending } from "@/utils/sort-by-time";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa6";
import Avatar from "../home/avatar";
import { Input } from "../ui/input";
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
      {[...threads, ...posts.filter((post) => post.threadId === null)]
        .sort(sortbyTimeAscending)
        .map((th: Post | (Threads & { threadId?: never })) => (
          <main
            key={th.id}
            className="flex flex-col gap-3 border-b border-stone-800 py-6"
          >
            {/* Thread body */}
            <Singlepost
              post={th}
              username={user?.username}
              trail={th.threadId !== null}
            >
              <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
              {/* <FaRegComment className="h-4 w-4 cursor-pointer" /> */}
            </Singlepost>
            {posts
              .filter((post) => post.threadId === th.id)
              .map((post, id) => (
                <Singlepost key={post.id} post={post} username={user?.username}>
                  <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
                  {/* <FaRegComment className="h-4 w-4 cursor-pointer" /> */}
                </Singlepost>
              ))}
            <span className="flex items-center justify-between text-xs cursor-pointer text-stone-600 font-medium">
              <span className="flex gap-2  text-stone-200 w-full">
                <Avatar variant={"self"} />
                <form
                  action=""
                  className="hover:border hover:border-stone-500 rounded-md border border-transparent grow flex items-center pr-3"
                >
                  <Input
                    type="text"
                    placeholder="Add a comment"
                    className="border-none text-xs focus-visible:ring-0 grow"
                  />
                </form>
              </span>
            </span>
          </main>
        ))}
    </div>
  );
};

export default Posts;
