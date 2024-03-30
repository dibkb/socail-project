"use client";
import { getUserPostsByUsername } from "@/actions/getUserPosts";
import { Post, Threads } from "@/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCleanedusername } from "./layout";
import Spinner from "@/components/svg/spinner";
import Posts from "@/components/posts/post";
import Loading from "@/components/guides/loading";
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
        setPosts(result.data);
        console.log(result.data?.posts[0]?.userId);
        if (result.data?.posts[0]?.userId) {
          setUser((prev) => ({
            ...prev,
            id: result.data?.posts[0]?.userId,
          }));
        }
      });
  }, [cleanedUsername]);
  if (!cleanedUsername) return <Loading />;
  const BODY =
    posts === "loading" ? (
      <div className="flex items-center justify-center">
        <Spinner />
        <p>Loading</p>
      </div>
    ) : posts.posts.length === 0 ? (
      <div className="flex items-center justify-center"></div>
    ) : (
      user.username && (
        <Posts threads={posts.threads} posts={posts.posts} user={user} />
      )
    );

  return <div className="grow">{BODY}</div>;
};

export default Userprofilepage;
