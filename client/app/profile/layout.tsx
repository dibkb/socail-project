"use client";
import AvatarForm from "@/components/home/avatar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/src/providers/user-store-provider";
import React from "react";
interface Profile {
  children: React.ReactNode;
}
const tabs = [
  {
    name: "Shreads",
    id: 0,
    link: "/",
  },
  {
    name: "Replies",
    id: 1,
    link: "/replies",
  },
  {
    name: "Reposts",
    id: 2,
    link: "/reposts",
  },
];
export default function Profile({ children }: Profile) {
  const { user } = useUserStore((state) => state);
  return (
    <div className="w-full max-w-2xl container">
      <div className="flex items-center justify-between">
        <aside>
          <h3 className="text-2xl font-medium">{user?.name}</h3>
          <span className="flex items-center gap-x-2">
            <p className="text-sm text-stone-200">{user?.username}</p>
            <p className="bg-stone-800 text-xs px-2 py-1 rounded-xl text-stone-500">
              shreds.net
            </p>
          </span>
        </aside>
        <aside>
          <AvatarForm className="w-20 h-20" />
        </aside>
      </div>
      <main className="mt-9">
        <p className="text-sm text-stone-200">{user?.bio}</p>
        {/* TODO : followers */}
        <Button variant="outline" className="w-full rounded-lg ">
          Edit Profile
        </Button>
      </main>
      <div className="flex justify-between my-6 font-medium text-stone-600">
        {tabs.map(({ name }) => (
          <span
            key={name}
            className="cursor-pointer border-b-[.5px] border-stone-600 pb-4 grow text-center"
          >
            {name}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}
