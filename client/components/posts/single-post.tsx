"use client";
import { calulateTime } from "@/utils/calulate-time-passed";
import React from "react";
import Avatar from "../home/avatar";
import { Post } from "@/types";
import Image from "next/image";
import { smallProfile } from "./post-comment";
interface Singlepost {
  post: Post;
  user: smallProfile;
  trail?: boolean;
  children: React.ReactNode;
}
export const Singlepost = React.memo(
  ({ post, user, trail = false, children }: Singlepost) => {
    return (
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-1">
          <Avatar
            variant="others"
            imgurl={user.profilePic}
            name={user.username}
          />
          {trail && (
            <span className="grow border border-stone-800 bg-stone-800"></span>
          )}
        </div>
        <div className="flex flex-col grow">
          <span className="flex items-center justify-between w-full">
            <p className="text-sm">{user.username}</p>
            <span className="flex items-center gap-1 text-stone-600 text-xs font-medium">
              <p>{calulateTime(post.createdAt).quantity}</p>
              <p>{calulateTime(post.createdAt).unit}</p>
            </span>
          </span>
          <p className="text-base">
            {post.body.split("\n").map((line) => (
              <p>{line}</p>
            ))}
          </p>
          {post.image && (
            <div className="flex items-center justify-between mt-3">
              <Image
                src={post.image}
                alt={post.body}
                width={269}
                height={269}
                className="rounded-lg"
              />
            </div>
          )}
          <span className="mt-3 flex gap-3 items-center">{children}</span>
        </div>
      </div>
    );
  }
);
