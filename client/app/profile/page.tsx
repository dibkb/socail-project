"use client";
import { Button } from "@/components/ui/button";
import React, { useMemo, useRef, useState } from "react";
import ThreadformPortal from "@/modals/thread-modal";
import { getUserPosts, getUserThreads } from "@/actions/getUserPosts";
import { useUserStore } from "@/src/providers/user-store-provider";
import Spinner from "@/components/svg/spinner";
import Posts from "@/components/posts/post";
import Loading from "@/components/guides/loading";
import { useIsMounted } from "@/hooks/isMounted";
import { redirect } from "next/navigation";
import usePaginatedPostsAndThreads from "@/hooks/usePaginatedPostsAndThreads";
const Profilepage = () => {
  const { user } = useUserStore((state) => state);
  const isMounted = useIsMounted();
  if (!user && isMounted) return redirect("/auth/login");
  const [openThreadModal, setOpenThreadModal] = useState(false);
  const [postsPage, setPostsPage] = useState(1);
  const [threadsPage, setThreadsPage] = useState(1);
  const postsLoader = useMemo(
    () => ({
      url: `${user?.id}?per_page=4&page=${postsPage}`,
      loader: getUserPosts,
    }),
    [postsPage, user?.id]
  );
  const threadsLoader = useMemo(
    () => ({
      url: `threads/${user?.id}?per_page=4&page=${threadsPage}`,
      loader: getUserThreads,
    }),
    [threadsPage, user?.id]
  );
  const { postsLoading, threadsLoading, threads, posts } =
    usePaginatedPostsAndThreads({
      postsLoader,
      threadsLoader,
    });
  const defaultTab = useRef<"single" | "shread">("single");
  if (!user) return <Loading />;
  const BODY =
    postsLoading || threadsLoading ? (
      <div className="flex items-center justify-center">
        <Spinner />
        <p>Loading</p>
      </div>
    ) : posts?.length === 0 && threads?.length == 0 ? (
      <div className="flex items-center justify-center min-h-[400px]">
        <Button onClick={() => setOpenThreadModal(true)} variant={"outline"}>
          Start your first thread
        </Button>
      </div>
    ) : (
      user && (
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
          edit={true}
        />
      )
    );

  return (
    <div className="grow">
      {!openThreadModal && BODY}
      {openThreadModal && <ThreadformPortal setOpen={setOpenThreadModal} />}
    </div>
  );
};

export default Profilepage;
