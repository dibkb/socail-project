"use client";
import { Post, Threads } from "@/types";
import React from "react";
import { User } from "@/src/stores/user-store";
import { Singlepost } from "./single-post";
import {
  sortbyTimeAscending,
  sortbyTimeDescending,
} from "@/utils/sort-by-time";
import { IoMdHeartEmpty } from "react-icons/io";
import Avatar from "../home/avatar";
import { Input } from "../ui/input";
interface Posts {
  posts: Post[];
  threads: Threads[];
  user?: User;
}
const Posts = ({ posts, threads, user }: Posts) => {
  if (!user) return;

  const filterByThreadid = (id: string) => {
    return posts.filter((p) => p.threadId === id);
  };
  const threadsWithPosts = threads.sort(sortbyTimeAscending).map((thread) => ({
    posts: filterByThreadid(thread.id),
  }));
  return (
    <div>
      {threadsWithPosts.map((i, id) => (
        <main key={id} className="py-4 border-b border-stone-700">
          {/* Thread body */}
          {i.posts.sort(sortbyTimeDescending).map((th: Post) => {
            return (
              <main key={th.id} className="flex flex-col gap-3 py-3">
                <Singlepost
                  post={th}
                  username={user?.username}
                  trail={th.threadId !== null}
                >
                  <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
                  {/* <FaRegComment className="h-4 w-4 cursor-pointer" /> */}
                </Singlepost>
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
            );
          })}
        </main>
      ))}
      {[...posts.filter((post) => post.threadId === null)].map((th) => {
        return (
          <main key={th.id} className="py-4 border-b border-stone-700">
            <main key={th.id} className="flex flex-col gap-3 py-3">
              <Singlepost
                post={th}
                username={user?.username}
                trail={th.threadId !== null}
              >
                <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
                {/* <FaRegComment className="h-4 w-4 cursor-pointer" /> */}
              </Singlepost>
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
          </main>
        );
      })}
    </div>
  );
};

export default Posts;
