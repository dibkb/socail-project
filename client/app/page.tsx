"use client";
import { getAllPosts, getAllThreads } from "@/actions/getComment";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Threadform from "@/components/home/thread-form";
import { Globallayout } from "@/components/layouts/main";
import Posts from "@/components/posts/post";
import { useIsMounted } from "@/hooks/isMounted";
import usePaginatedPostsAndThreads from "@/hooks/usePaginatedPostsAndThreads";
import { useUserStore } from "@/src/providers/user-store-provider";
import { redirect } from "next/navigation";
import { useMemo, useRef, useState } from "react";
export default function Home() {
  const { user } = useUserStore((state) => state);
  const isMounted = useIsMounted();
  if (!user && isMounted) return redirect("/auth/login");
  const [postsPage, setPostsPage] = useState(1);
  const [threadsPage, setThreadsPage] = useState(1);
  const postsLoader = useMemo(
    () => ({
      url: `per_page=4&page=${postsPage}`,
      loader: getAllPosts,
    }),
    [postsPage]
  );
  const threadsLoader = useMemo(
    () => ({
      url: `all/threads?per_page=4&page=${threadsPage}`,
      loader: getAllThreads,
    }),
    [threadsPage]
  );
  const { postsLoading, threadsLoading, threads, posts } =
    usePaginatedPostsAndThreads({
      postsLoader,
      threadsLoader,
    });
  const defaultTab = useRef<"single" | "shread">("single");
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
                defaultTab={defaultTab}
                loadMorePosts={() => {
                  setPostsPage((prev) => prev + 1);
                  defaultTab.current = "single";
                }}
                loadMoreThreads={() => {
                  setThreadsPage((prev) => prev + 1);
                  defaultTab.current = "shread";
                }}
              />
            </>
          )}
        </div>
      )}
    </Globallayout>
  );
}
