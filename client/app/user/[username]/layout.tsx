"use client";
import { Globallayout, Profilelayout } from "@/components/layouts/main";
import NameUsername, {
  Bio,
} from "@/components/profile/profile-page/name-username";
import tabs from "../../../utils/profile-tabs";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import AvatarForm from "@/components/home/avatar";
import { getUserInfo } from "@/actions/getuser";
import { User } from "@/src/stores/user-store";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/src/providers/user-store-provider";
import { followuser, unFollowUser } from "@/actions/followuser";
import { redirect, usePathname } from "next/navigation";
import Loading from "@/components/guides/loading";
// server actions
interface Username {
  children: React.ReactNode;
}
export default function Username({ children }: Username) {
  const pathname = usePathname();
  const { user, addFollowing, removeFollowing } = useUserStore(
    (state) => state
  );
  const cleanedUsername = getCleanedusername(pathname);
  console.log(cleanedUsername);
  if (cleanedUsername === user?.username) {
    redirect("/profile");
  }
  const [res, setRes] = useState<
    | {
        data: User;
        error?: undefined;
      }
    | {
        error: any;
        data?: undefined;
      }
  >();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    async function getuser(username: string) {
      const res = await getUserInfo(username);
      return res;
    }
    cleanedUsername?.length &&
      getuser(cleanedUsername).then((result) => setRes(result));
  }, [cleanedUsername]);
  // TODO : follow user and following
  const handleFollowUser = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      if (res?.data?.id && user) {
        addFollowing(res?.data?.id);
        followuser(res?.data?.id).then((res) => {
          if (res.error) {
            removeFollowing(res?.data?.id);
          }
        });
      }
    });
  };
  const handleUnfollowUser = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      if (res?.data?.id && user) {
        removeFollowing(res?.data?.id);
        unFollowUser(res?.data?.id).then((res) => {
          if (res.error) {
            addFollowing(res?.data?.id);
          }
        });
      }
    });
  };
  //  //
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
              {user?.followingIds.includes(res?.data?.id) ? (
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
                if (pathname === link) {
                  return (
                    <Link
                      href={link}
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
                    href={link}
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

function getCleanedusername(name: string) {
  const res = name.split("/@").pop();
  if (res?.split("/").length) {
    return res?.split("/")[0];
  } else {
    return res;
  }
}
