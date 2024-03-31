"use client";
import { Post, Threads } from "@/types";
import React from "react";
import { User } from "@/src/stores/user-store";
import {
  sortbyTimeAscending,
  sortbyTimeDescending,
} from "@/utils/sort-by-time";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PostLayout from "./post-layout";
interface Posts {
  posts: Post[];
  threads: Threads[];
  // user?: User | { id: string; username: string };
}
const Posts = React.memo(({ posts, threads }: Posts) => {
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
          {/* Single-posts */}
          {posts
            .sort(sortbyTimeAscending)
            .filter((post) => post.threadId === null)
            .map((th) => {
              return (
                <div key={th.id} className="py-4 border-b border-stone-700">
                  <PostLayout post={th} />
                </div>
              );
            })}
        </TabsContent>
        <TabsContent value="shread">
          {/* Thread-posts */}
          {threadsWithPosts.map((i, id) => {
            if (i.posts.length)
              return (
                <div key={id} className="py-4 w-full border-b border-stone-700">
                  {i.posts.sort(sortbyTimeDescending).map((th: Post) => {
                    return <PostLayout key={th.id} post={th} />;
                  })}
                </div>
              );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
});

export default Posts;
