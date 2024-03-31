"use client";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { getCleanedusername } from "../layout";
import { useUserStore } from "@/src/providers/user-store-provider";
import { stat } from "fs";
import { useUserDataByUsername } from "@/hooks/getUserbyUsername";
import { CommentbodyResponse } from "@/app/profile/replies/page";
import useSWR, { SWRResponse } from "swr";
import {
  getAllCoomentsUser,
  getAllCoomentsUserById,
} from "@/actions/getComment";
import MinimalPost from "@/components/posts/minimal-post";
import Loading from "@/components/guides/loading";

const Userreplies = () => {
  const { user } = useUserStore((state) => state);
  const pathname = usePathname();
  const cleanedUsername = getCleanedusername(pathname);
  if (cleanedUsername === user?.username) {
    redirect("/profile");
  }
  const { res: viewedUserData, loading } =
    useUserDataByUsername(cleanedUsername);
  const { data, error, isLoading }: SWRResponse<CommentbodyResponse[]> = useSWR(
    viewedUserData?.data?.id,
    getAllCoomentsUserById
  );
  if (loading || !viewedUserData?.data) {
    return <Loading />;
  }
  return (
    <div>
      <div>
        {data?.map((c) => {
          return (
            <MinimalPost
              post={c.post}
              key={c.id}
              body={c.body}
              user={viewedUserData?.data}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Userreplies;
