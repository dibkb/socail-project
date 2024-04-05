"use client";
import { followuser, unFollowUser } from "@/actions/followuser";
import { searchNameUsername } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import Avatar from "@/components/home/avatar";
import { Globallayout } from "@/components/layouts/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/src/providers/user-store-provider";
import { User } from "@/src/stores/user-store";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
export default function Search() {
  const { user, addFollowing, removeFollowing } = useUserStore(
    (state) => state
  );
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [notTyping, setNotTyping] = useState<boolean>(false);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedValue(inputValue);
      setNotTyping(true);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
      setNotTyping(false);
    };
  }, [inputValue]);
  const {
    data,
    error,
    isLoading,
  }: SWRResponse<Pick<User, "id" | "name" | "profilePic" | "username">[]> =
    useSWR(debouncedValue || "*", searchNameUsername);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const followHandler = (id: string) => {
    addFollowing(id);
    followuser(id).then((r) => {
      if (r.data) {
      }
      if (r.error) {
        removeFollowing(id);
      }
    });
  };
  const unfollowHandler = (id: string) => {
    removeFollowing(id);
    unFollowUser(id)
      .then((r) => {
        if (r.data) {
        }
        if (r.error) {
          addFollowing(id);
        }
      })
      .catch(() => {});
  };
  const userbody = data?.map((u) => (
    <section key={u.id} className="py-2 flex gap-3 items-start">
      <Avatar variant="others" imgurl={u.profilePic} name={u.name} />
      <main className="flex grow border-b-[1px] border-stone-800 pb-4">
        <Link
          href={`/user/@${u.username}`}
          className="grow flex flex-col gap-1 text-sm cursor-pointer group"
        >
          <span className="group-hover:underline">{u.name}</span>
          <span className="text-stone-700">{u.username}</span>
        </Link>
        {user?.followingIds?.includes(u.id) ? (
          <Button
            variant={"ghost"}
            className="rounded-xl px-8"
            onClick={() => unfollowHandler(u.id)}
          >
            Following
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className="rounded-xl px-8"
            onClick={() => followHandler(u.id)}
          >
            Follow
          </Button>
        )}
      </main>
    </section>
  ));
  return (
    <Globallayout>
      <Input
        type="text"
        placeholder="Search users"
        className="p-8 rounded-xl text-sm"
        onChange={handleChange}
        value={inputValue}
      />
      <div className="mt-4">
        {notTyping ? (
          <div className="flex flex-col gap-3">{userbody}</div>
        ) : (
          <Loading />
        )}
      </div>
    </Globallayout>
  );
}
