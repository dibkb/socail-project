"use client";
import { getAllPosts, smallProfileFetcher } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Threadform from "@/components/home/thread-form";
import { Globallayout } from "@/components/layouts/main";
import Posts from "@/components/posts/post";
import { Post, Threads } from "@/types";
import { useState } from "react";
import useSWR, { SWRResponse } from "swr";
interface getPostResponse {
  posts: Post[];
  threads: Threads[];
}
export default function Home() {
  // const [posts, setPosts] = useState<
  //   "loading" | { posts: Post[]; threads: Threads[] }
  // >("loading");
  const { data, error, isLoading }: SWRResponse<getPostResponse> = useSWR(
    "getAllPosts",
    getAllPosts
  );
  return (
    <Globallayout>
      <Threadform />
      {isLoading ? (
        <PostSkeleton />
      ) : (
        data?.posts &&
        data?.threads && <Posts posts={data?.posts} threads={data?.threads} />
      )}
    </Globallayout>
  );
}
