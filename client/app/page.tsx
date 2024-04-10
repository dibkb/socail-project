"use client";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
import { getAllPosts, smallProfileFetcher } from "@/actions/getComment";
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
import useSWR from "swr";
export default function Home() {
  const [data, setData] = useState<{ posts: Post[]; threads: Threads[] }>();
  const [page, setPage] = useState<number>(1);
  const { user } = useUserStore((state) => state);
  const isMounted = useIsMounted();
  if (!user && isMounted) return redirect("/auth/login");
  const [postsPage, setPostsPage] = useState(1);
  const {
    data: postsData,
    error,
    isLoading,
  } = useSWR(`per_page=${4}&page=${postsPage}`, getAllPosts);
  console.log(postsData?.posts);
  useEffect(() => {
    setData((prev) => {
      if (prev)
        return {
          ...prev,
          posts: [...(prev?.posts || []), ...(postsData?.posts || [])],
        };
      else {
        return {
          threads: [...(postsData?.threads || [])],
          posts: [...(postsData?.posts || [])],
        };
      }
    });
  }, [postsData]);
  const loadMoreThreads = () => {};
  const loadMorePosts = () => {};
  console.log(data);
  return (
    <Globallayout>
      <Threadform />
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <div className="grow mt-6">
          {data?.posts && data?.threads && (
            <>
              <Posts
                posts={data?.posts}
                threads={data?.threads}
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
