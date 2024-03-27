"use client";
import { Globallayout, Profilelayout } from "@/components/layouts/main";
import NameUsername, {
  Bio,
} from "@/components/profile/profile-page/name-username";
import React from "react";
import AvatarForm from "@/components/home/avatar";
import { getUserInfo } from "@/actions/getuser";
import { usePathname } from "next/navigation";
// server actions
export default function Username() {
  const pathname = usePathname();
  const username = pathname.split("/").pop()?.split("@")[1];
  console.log(username);
  return (
    <Globallayout>
      <Profilelayout>
        <div className="flex items-center justify-between">
          <NameUsername
            name={"The Stiletto Stoner"}
            username={"imshotta"}
            variant="others"
          />
          <aside>
            <AvatarForm className="w-20 h-20" />
          </aside>
        </div>
        <main className="mt-4">
          <Bio
            bio={
              "I DROP GEMS 💎GOD 1st GOD Willing اللہ for bookings contact getatshotta@gmail.com “Dats Right” Out Now ‼️‼️"
            }
          />
        </main>
      </Profilelayout>
    </Globallayout>
  );
}
