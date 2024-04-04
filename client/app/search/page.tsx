"use client";
import { searchNameUsername } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import Avatar from "@/components/home/avatar";
import { Globallayout } from "@/components/layouts/main";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/src/stores/user-store";
import React, { ChangeEvent, useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
export default function Search() {
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
  const userbody = data?.map((u) => (
    <section key={u.id} className="py-2 flex gap-3 items-start">
      <Avatar variant="others" imgurl={u.profilePic} name={u.name} />
      <main className="flex grow">
        <div className="grow flex flex-col gap-1 text-sm">
          <span>{u.name}</span>
          <span className="text-stone-700">{u.username}</span>
        </div>
        <Button variant={"outline"} className="rounded-xl px-8 bg-transparent">
          Follow
        </Button>
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
