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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { FaRegComment } from "react-icons/fa6";
import { redirect } from "next/navigation";
interface Posts {
  posts: Post[];
  threads: Threads[];
  user?: User;
}
const Posts = ({ posts, threads, user }: Posts) => {
  if (!user) return redirect("/auth/login");

  const filterByThreadid = (id: string) => {
    return posts.filter((p) => p.threadId === id);
  };
  const threadsWithPosts = threads.sort(sortbyTimeAscending).map((thread) => ({
    posts: filterByThreadid(thread.id),
  }));
  return (
    <div>
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single" className="">
            Single posts
          </TabsTrigger>
          <TabsTrigger value="shread">Shread posts</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
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
                        <FaRegComment className="h-4 w-4 cursor-pointer" />
                      </form>
                    </span>
                  </span>
                </main>
              </main>
            );
          })}
        </TabsContent>
        <TabsContent value="shread">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Posts;
