"use client";
import { Globallayout, Profilelayout } from "@/components/layouts/main";
import NameUsername, {
  Bio,
} from "@/components/profile/profile-page/name-username";
import { userProfileTabs as tabs } from "../../../utils/profile-tabs";
import Link from "next/link";
import React, { cloneElement, useEffect, useState, useTransition } from "react";
import AvatarForm from "@/components/home/avatar";
import { getUserInfo } from "@/actions/getuser";
import { User } from "@/src/stores/user-store";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/src/providers/user-store-provider";
import { followuser, unFollowUser } from "@/actions/followuser";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/guides/loading";
import { useUserDataByUsername } from "@/hooks/getUserbyUsername";
// server actions
interface Username {
  children: React.ReactNode;
}
export default function Username({ children }: Username) {
  const { user, addFollowing, removeFollowing } = useUserStore(
    (state) => state
  );
  const pathname = usePathname();
  const cleanedUsername = getCleanedusername(pathname);
  if (cleanedUsername === user?.username) {
    redirect("/profile");
  }
  const { res, loading } = useUserDataByUsername(cleanedUsername);
  const [isPending, startTransition] = useTransition();
  const handleFollowUser = () => {
    startTransition(async () => {
      if (res?.data?.id && user) {
        followuser(res?.data?.id).then((result) => {
          if (res.data) {
            addFollowing(res?.data?.id);
          }
        });
      }
    });
  };
  const handleUnfollowUser = () => {
    startTransition(async () => {
      if (res?.data?.id && user) {
        unFollowUser(res?.data?.id).then((result) => {
          if (res.data) {
            removeFollowing(res?.data?.id);
          }
        });
      }
    });
  };
  if (res) {
    if (res.data) {
      const data = res.data;
      return (
        <Globallayout>
          <Profilelayout>
            <div className="flex items-center justify-between">
              <NameUsername
                name={data?.name}
                username={data?.username}
                variant="others"
              />
              <aside>
                <AvatarForm
                  className="w-20 h-20"
                  imgurl={data?.profilePic}
                  name={data?.name}
                  variant="others"
                />
              </aside>
            </div>
            <main className="mt-4">
              <Bio bio={data?.bio} />
              <div className="mt-3 text-stone-600 text-sm">
                {data?.followerIds?.length || 0} followers
              </div>
              {user?.followingIds?.includes(res?.data?.id) ? (
                <Button
                  variant="outline"
                  className="w-full rounded-lg mt-9"
                  onClick={handleUnfollowUser}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full rounded-lg mt-9"
                  onClick={handleFollowUser}
                >
                  Follow
                </Button>
              )}
            </main>
            <div className="flex justify-between my-6 font-medium text-stone-600">
              {tabs.map(({ name, link }) => {
                // active
                if (
                  pathname.split("/").pop() === name.toLowerCase() ||
                  (pathname.split("/").pop()?.substring(1) ===
                    cleanedUsername &&
                    link === "")
                ) {
                  return (
                    <Link
                      href={`/user/@${cleanedUsername}/${link}`}
                      key={name}
                      className="cursor-pointer text-stone-100 border-b border-stone-100 pb-4 grow text-center"
                    >
                      {name}
                    </Link>
                  );
                }
                // in-active
                return (
                  <Link
                    href={`/user/@${cleanedUsername}/${link}`}
                    key={name}
                    className="cursor-pointer border-b-[.5px] border-stone-600 pb-4 grow text-center"
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
            {children}
          </Profilelayout>
        </Globallayout>
      );
    }
    if (res.error) {
      return "Some error occured";
    }
  } else {
    return <Loading />;
  }
}

export function getCleanedusername(name: string) {
  const res = name.split("/@").pop();
  if (res?.split("/").length) {
    return res?.split("/")[0];
  } else {
    return res;
  }
}
