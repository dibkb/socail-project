"use client";
import { Globallayout, Profilelayout } from "@/components/layouts/main";
import NameUsername, {
  Bio,
} from "@/components/profile/profile-page/name-username";
import React from "react";
import AvatarForm from "@/components/home/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
export default function Username() {
  const { user } = useUserStore((state) => state);
  return (
    <Globallayout>
      <Profilelayout>
        {" "}
        <div className="flex items-center justify-between">
          <NameUsername name={"The Stiletto Stoner"} username={"imshotta"} />
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
