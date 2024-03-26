"use client";
import AvatarForm from "@/components/home/avatar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/src/providers/user-store-provider";
import tabs from "../../utils/profile-tabs";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import EditProfilePortal from "@/modals/edit-profile-modal";
import NameUsername from "@/components/profile/profile-page/name-username";
interface Profile {
  children: React.ReactNode;
}
export default function Profile({ children }: Profile) {
  const { user } = useUserStore((state) => state);
  const [openEditModal, setOpenEditModal] = useState(false);
  const pathname = usePathname();
  if (!user) return null;
  return (
    <div className="w-full max-w-2xl container min-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between">
        <NameUsername name={user?.name} username={user?.username} />
        <aside>
          <AvatarForm className="w-20 h-20" />
        </aside>
      </div>
      <main className="mt-4">
        <p className="text-sm text-stone-200">{user?.bio}</p>
        {/* TODO : followers */}
        <Button
          variant="outline"
          className="w-full rounded-lg mt-9"
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
