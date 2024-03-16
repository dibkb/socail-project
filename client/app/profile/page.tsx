"use client";
import AvatarForm from "@/components/home/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
import React from "react";

export default function Profile() {
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
    </div>
  );
}
