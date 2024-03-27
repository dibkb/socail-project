"use client";
import { Globallayout, Profilelayout } from "@/components/layouts/main";
import NameUsername, {
  Bio,
} from "@/components/profile/profile-page/name-username";
import React, { useEffect, useState, useTransition } from "react";
import AvatarForm from "@/components/home/avatar";
import { getUserInfo } from "@/actions/getuser";
import Spinner from "@/components/svg/spinner";
import { User } from "@/src/stores/user-store";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/src/providers/user-store-provider";
import { followuser } from "@/actions/followuser";
import { update } from "@/actions/update";
// server actions
export default function Username(pathname: any) {
  const cleanedUsername = pathname.params.username
    .split("/")
    .pop()
    ?.split("%40")[1];
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
  const { user } = useUserStore((state) => state);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function getuser() {
      const res = await getUserInfo(cleanedUsername);
      return res;
    }
    getuser().then((result) => setRes(result));
  }, [cleanedUsername]);
  // TODO : follow user and following
  const handleFollowUser = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      if (res?.data?.id) followuser(res?.data?.id);
    });
  };
  console.log(user);
  //
  if (res) {
    if (res.data) {
      const data = res.data;
      return (
        <Globallayout>
          <Profilelayout>
            <div className="flex items-center justify-between">
              <NameUsername
                name={data.name}
                username={data.username}
                variant="others"
              />
              <aside>
                <AvatarForm
                  className="w-20 h-20"
                  imgurl={data.profilePic}
                  name={data.name}
                  variant="others"
                />
              </aside>
            </div>
            <main className="mt-4">
              <Bio bio={data.bio} />
              <Button
                variant="default"
                className="w-full rounded-lg mt-9"
                onClick={handleFollowUser}
              >
                Follow
              </Button>
            </main>
          </Profilelayout>
        </Globallayout>
      );
    }
    if (res.error) {
      return "Some error occured";
    }
  } else {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
        <p>Loading</p>
      </div>
    );
  }
}
