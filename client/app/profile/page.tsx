"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ThreadformPortal from "@/modals/thread-modal";
import { getUserPosts } from "@/actions/getUserPosts";
import { useUserStore } from "@/src/providers/user-store-provider";
import Spinner from "@/components/svg/spinner";
import { Post, Threads } from "@/types";
import Posts from "@/components/posts/post";
import Loading from "@/components/guides/loading";
const Profilepage = () => {
  const { user } = useUserStore((state) => state);
  const [openThreadModal, setOpenThreadModal] = useState(false);
  const [posts, setPosts] = useState<
    "loading" | { posts: Post[]; threads: Threads[] }
  >("loading");
  useEffect(() => {
    async function getuser(id: string) {
      const res = await getUserPosts(id);
      return res;
    }
    user?.id && getuser(user.id).then((result) => setPosts(result.data));
  }, [user]);
  if (!user) return <Loading />;
  const BODY =
    posts === "loading" ? (
      <div className="flex items-center justify-center">
        <Spinner />
        <p>Loading</p>
      </div>
    ) : posts.posts.length === 0 ? (
      <div className="flex items-center justify-center min-h-[400px]">
        <Button onClick={() => setOpenThreadModal(true)} variant={"outline"}>
          Start your first thread
        </Button>
      </div>
    ) : (
      user && <Posts threads={posts.threads} posts={posts.posts} user={user} />
    );

  return (
    <div className="grow">
      {!openThreadModal && BODY}
      {openThreadModal && <ThreadformPortal setOpen={setOpenThreadModal} />}
    </div>
  );
};

export default Profilepage;
