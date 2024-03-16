"use client";
import AvatarForm from "@/components/home/avatar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/src/providers/user-store-provider";
import tabs from "../../utils/profile-tabs";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import EditProfilePortal from "@/modals/edit-profile-modal";
interface Profile {
  children: React.ReactNode;
}
export default function Profile({ children }: Profile) {
  const { user } = useUserStore((state) => state);
  const [openEditModal, setOpenEditModal] = useState(false);
  const pathname = usePathname();
  return (
    <div className="w-full max-w-2xl container min-h-[90vh] flex flex-col">
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
        <Button
          variant="outline"
          className="w-full rounded-lg"
          onClick={() => setOpenEditModal(true)}
        >
          Edit Profile
        </Button>
      </main>
      {openEditModal && <EditProfilePortal setOpen={setOpenEditModal} />}
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
    </div>
  );
}
