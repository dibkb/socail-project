"use client";
import {
  getUserPostsByUsername,
  getUserThreadsByUsername,
} from "@/actions/getUserPosts";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { getCleanedusername } from "@/utils/get-clean-username";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Posts from "@/components/posts/post";
import usePaginatedPostsAndThreads from "@/hooks/usePaginatedPostsAndThreads";
const Userprofilepage = () => {
  const pathname = usePathname();
  const cleanedUsername = getCleanedusername(pathname) as string;
  const [user, setUser] = useState({
    id: "",
    username: cleanedUsername,
  });
  const [postsPage, setPostsPage] = useState(1);
  const [threadsPage, setThreadsPage] = useState(1);
  const postsLoader = useMemo(
    () => ({
      url: `/all/username/${cleanedUsername}?per_page=4&page=${postsPage}`,
      loader: getUserPostsByUsername,
    }),
    [postsPage, cleanedUsername]
  );
  const threadsLoader = useMemo(
    () => ({
      url: `/all/threads/username/${cleanedUsername}?per_page=4&page=${threadsPage}`,
      loader: getUserThreadsByUsername,
    }),
    [threadsPage, cleanedUsername]
  );
  const { postsLoading, threadsLoading, threads, posts } =
    usePaginatedPostsAndThreads({
      postsLoader,
      threadsLoader,
    });
  const defaultTab = useRef<"single" | "shread">("single");
  if (!cleanedUsername) return <PostSkeleton />;
  useEffect(() => {
    if (posts.length || threads.length) {
      setUser((p) => ({
        ...p,
        id: posts[0].userId || threads[0].userId,
      }));
    }
  }, [posts]);
  const BODY =
    postsLoading || threadsLoading ? (
      <PostSkeleton />
    ) : posts?.length === 0 && threads.length === 0 ? (
      <div className="flex items-center justify-center h-44">No posts yet</div>
    ) : (
      user?.username && (
        <Posts
          threads={threads}
          posts={posts}
          defaultTab={defaultTab}
          loadMorePosts={() => {
            setPostsPage((p) => p + 1);
            defaultTab.current = "single";
          }}
          loadMoreThreads={() => {
            setThreadsPage((t) => t + 1);
            defaultTab.current = "shread";
          }}
        />
      )
    );
  return <div className="grow">{BODY}</div>;
};

export default Userprofilepage;
