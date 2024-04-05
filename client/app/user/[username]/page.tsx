"use client";
import { getUserPostsByUsername } from "@/actions/getUserPosts";
import { Post, Threads } from "@/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCleanedusername } from "@/utils/get-clean-username";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Posts from "@/components/posts/post";
const Userprofilepage = () => {
  const [posts, setPosts] = useState<
    "loading" | { posts: Post[]; threads: Threads[] }
  >("loading");
  const pathname = usePathname();
  const cleanedUsername = getCleanedusername(pathname) as string;
  const [user, setUser] = useState({
    id: "",
    username: cleanedUsername,
  });
  useEffect(() => {
    async function getusePosts(username: string) {
      const res = await getUserPostsByUsername(username);
      return res;
    }
    cleanedUsername &&
      getusePosts(cleanedUsername).then((result) => {
        if (result.data) {
          setPosts(result?.data);
          if (result.data?.posts[0]?.userId) {
            setUser((prev) => ({
              ...prev,
              id: result.data?.posts[0]?.userId,
            }));
          }
        }
      });
  }, [cleanedUsername]);
  if (!cleanedUsername) return <PostSkeleton />;
  const BODY =
    posts === "loading" ? (
      <PostSkeleton />
    ) : posts?.posts?.length === 0 ? (
      <div className="flex items-center justify-center h-44">No posts yet</div>
    ) : (
      user?.username && <Posts threads={posts?.threads} posts={posts?.posts} />
    );
  return <div className="grow">{BODY}</div>;
};

export default Userprofilepage;
