"use client";
import { Notification } from "@/types";
import React from "react";
import useSWR, { SWRResponse } from "swr";
import { smallProfile } from "../posts/post-comment";
import { smallProfileFetcher } from "@/actions/getComment";
import Avatar from "../home/avatar";
import Link from "next/link";
import { useIsBelowWidth } from "@/hooks/isBelowWidth";
interface Props {
  data: Notification;
}
const Notificationbody = ({ data }: Props) => {
  const { isBelowWidth } = useIsBelowWidth(600);
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
  const ske = (
    <span className="animate-pulse h-16 rounded-xl bg-stone-800 flex"></span>
  );
  if (isLoading) return ske;
  return (
    <Link
      href={`user/@${creatorProfile?.username}`}
      className="h-16 flex rounded-lg group"
    >
      <span className="flex gap-2 text-sm items-start">
        <Avatar
          variant="others"
          imgurl={creatorProfile?.profilePic}
          name={creatorProfile?.username}
        />
        <span className="flex gap-4 items-center">
          {!isBelowWidth && (
            <p className="cursor-pointer group-hover:underline">
              {creatorProfile?.username}
            </p>
          )}

          <p className="text-stone-600">{body}</p>
        </span>
      </span>
    </Link>
  );
};

export default Notificationbody;
