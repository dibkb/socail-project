"use client";
import { getAllCoomentsUser } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import MinimalPost from "@/components/posts/minimal-post";
import { useIsMounted } from "@/hooks/isMounted";
import { useUserStore } from "@/src/providers/user-store-provider";
import { Post } from "@/types";
import { redirect } from "next/navigation";
import React from "react";
import useSWR, { SWRResponse } from "swr";
export type CommentbodyResponse = Post & { post: Post };
const ProfileReplies = () => {
  const { user } = useUserStore((state) => state);
  const isMounted = useIsMounted();
  const { data, error, isLoading }: SWRResponse<CommentbodyResponse[]> = useSWR(
    "user-comments",
    getAllCoomentsUser
  );
  if (!user) {
    if (isMounted) return redirect("/auth/login");
    else {
      <Loading />;
    }
  } else {
    return (
      <div>
        {data?.map((c) => {
          return (
            <MinimalPost
              post={c.post}
              key={c.id}
              body={c.body}
              commentUser={user}
            />
          );
        })}
      </div>
    );
  }
};

export default ProfileReplies;
