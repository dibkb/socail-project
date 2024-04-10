"use client";
import { Post, Threadsfull } from "@/types";
import React, { MutableRefObject } from "react";
import {
  sortbyTimeAscending,
  sortbyTimeDescending,
} from "@/utils/sort-by-time";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PostLayout from "./post-layout";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
interface Posts {
  posts: Post[];
  threads: Threadsfull[];
  edit?: boolean;
  defaultTab: MutableRefObject<"single" | "shread">;
  loadMorePosts: () => void;
  loadMoreThreads: () => void;
}
const Posts = React.memo(
  ({
    posts,
    threads,
    edit = false,
    loadMorePosts,
    loadMoreThreads,
    defaultTab,
  }: Posts) => {
    return (
      <div>
        <Tabs defaultValue={defaultTab.current} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single" className="">
              Single posts
            </TabsTrigger>
            <TabsTrigger value="shread">Shread posts</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            {/* Single-posts */}
            {posts &&
              posts
                .sort(sortbyTimeAscending)
                .filter((post) => post.threadId === null)
                .map((th) => {
                  return (
                    <div key={th.id} className="py-4 border-b border-stone-700">
                      <PostLayout post={th} edit={edit} />
                    </div>
                  );
                })}
            <div className="flex px-auto">
              <Button
                className={cn("my-3 mx-auto select-none")}
                variant={"ghost"}
                disabled={posts.length < 4}
                onClick={loadMorePosts}
              >
                Load more
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="shread">
            {/* Thread-posts */}
            {threads &&
              threads.map((i, id) => {
                if (i?.posts?.length)
                  return (
                    <div
                      key={id}
                      className="py-4 w-full border-b border-stone-700"
                    >
                      {i?.posts?.sort(sortbyTimeDescending).map((th: Post) => {
                        return <PostLayout key={th.id} post={th} edit={edit} />;
                      })}
                    </div>
                  );
              })}
            <div className="flex px-auto">
              <Button
                className="my-3 mx-auto"
                variant={"ghost"}
                disabled={threads.length < 4}
                onClick={loadMoreThreads}
              >
                Load more
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
);

export default Posts;
