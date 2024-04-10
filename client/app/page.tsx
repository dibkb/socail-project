"use client";
import { getAllPosts, getAllThreads } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Threadform from "@/components/home/thread-form";
import { Globallayout } from "@/components/layouts/main";
import Posts from "@/components/posts/post";
import { useIsMounted } from "@/hooks/isMounted";
import { useUserStore } from "@/src/providers/user-store-provider";
import { Post, Threads, Threadsfull } from "@/types";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [threads, setThreads] = useState<Threadsfull[]>([]);
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
  }: SWRResponse<{ threads: Threadsfull[] }> = useSWR(
    `all/threads?per_page=${4}&page=${threadsPage}`,
    getAllThreads
  );
  useEffect(() => {
    if (postsData?.posts) {
      setPosts((prev) => {
        return [...prev, ...postsData?.posts];
      });
    }
  }, [postsData]);
  useEffect(() => {
    if (threadsData?.threads) {
      setThreads((prev) => {
        return [...prev, ...threadsData?.threads];
      });
    }
  }, [threadsData]);
  const loadMoreThreads = () => {
    setThreadsPage((prev) => prev + 1);
  };
  const loadMorePosts = () => {
    setPostsPage((prev) => prev + 1);
  };
  return (
    <Globallayout>
      <Threadform />
      {postsLoading || threadsLoading ? (
        <PostSkeleton />
      ) : (
        <div className="grow mt-6">
          {threads && posts && (
            <>
              <Posts
                posts={posts}
                threads={threads}
                loadMoreThreads={loadMoreThreads}
                loadMorePosts={loadMorePosts}
              />
            </>
          )}
        </div>
      )}
    </Globallayout>
  );
}
