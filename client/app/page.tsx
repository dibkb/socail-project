"use client";
import { getAllPosts, getAllThreads } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Threadform from "@/components/home/thread-form";
import { Globallayout } from "@/components/layouts/main";
import Posts from "@/components/posts/post";
import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/hooks/isMounted";
import { useUserStore } from "@/src/providers/user-store-provider";
import { Post, Threads } from "@/types";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUserStore((state) => state);
  const isMounted = useIsMounted();
  if (!user && isMounted) return redirect("/auth/login");
  const [postsPage, setPostsPage] = useState(1);
  const [threadsPage, setThreadsPage] = useState(1);
  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  }: SWRResponse<{ posts: Post[] }> = useSWR(
    `per_page=${4}&page=${postsPage}`,
    getAllPosts
  );
  const {
    data: threadsData,
    error: threadsError,
    isLoading: threadsLoading,
  }: SWRResponse<{ threads: Post[] }> = useSWR(
    `per_page=${4}&page=${threadsPage}`,
    getAllThreads
  );
  useEffect(() => {
    if (postsData?.posts) {
      setPosts((prev) => {
        return [...prev, ...postsData?.posts];
      });
    }
  }, [postsData]);
  const loadMoreThreads = () => {};
  const loadMorePosts = () => {};
  console.log(posts);
  return (
    <Globallayout>
      <Threadform />
      {postsLoading || threadsLoading ? (
        <PostSkeleton />
      ) : (
        <div className="grow mt-6">
          {/* {postsData && data?.threads && (
            <>
              <Posts
                posts={data?.posts}
                threads={data?.threads}
                loadMoreThreads={loadMoreThreads}
                loadMorePosts={loadMorePosts}
              />
            </>
          )} */}
        </div>
      )}
    </Globallayout>
  );
}
