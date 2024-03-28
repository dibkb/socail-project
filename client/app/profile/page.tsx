"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ThreadformPortal from "@/modals/thread-modal";
import { getUserPosts } from "@/actions/getUserPosts";
import { useUserStore } from "@/src/providers/user-store-provider";
import Spinner from "@/components/svg/spinner";
import { Post, Threads } from "@/types";
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
  const BODY =
    posts === "loading" ? (
      <div className="flex items-center">
        <Spinner />
        <p>Loading</p>
      </div>
    ) : posts.posts.length === 0 ? (
      <Button onClick={() => setOpenThreadModal(true)} variant={"outline"}>
        Start your first thread
      </Button>
    ) : (
      "Posts"
    );

  return (
    <div className="grow flex items-center justify-center">
      {!openThreadModal && BODY}
      {openThreadModal && <ThreadformPortal setOpen={setOpenThreadModal} />}
    </div>
  );
};

export default Profilepage;
