"use client";
import { Notification } from "@/types";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { smallProfile } from "../posts/post-comment";
import { smallProfileFetcher } from "@/actions/getComment";
import Avatar from "../home/avatar";
import Link from "next/link";
interface Props {
  data: Notification;
}
const Notificationbody = ({ data }: Props) => {
  const {
    data: creatorProfile,
    error,
    isLoading,
  }: SWRResponse<smallProfile> = useSWR(data.creatorId, smallProfileFetcher);
  let body = "";
  if (data.type === "LIKE") {
    body = "liked your post";
  } else if (data.type === "COMMENT") {
    body = "commented your post";
  } else body = "started following you";
  return (
    <div className="h-16 rounded-lg">
      <span className="flex gap-2 text-sm items-start">
        <Avatar
          variant="others"
          imgurl={creatorProfile?.profilePic}
          name={creatorProfile?.username}
        />
        <span className="flex gap-2 items-center">
          <Link href={`user/@${creatorProfile?.username}`}>
            <p className="cursor-pointer hover:underline">
              {creatorProfile?.username}
            </p>
          </Link>
          <p className="uppercase text-stone-600">{body}</p>
        </span>
      </span>
    </div>
  );
};

export default Notificationbody;
