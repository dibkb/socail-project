"use client";
import React from "react";
interface NameUsername {
  name: string;
  username: string;
  variant: "self" | "others";
}
const NameUsername = ({ name, username, variant }: NameUsername) => {
  return (
    <aside>
      <h3 className="text-2xl font-medium">{name}</h3>
      <span className="flex items-center gap-x-2">
        <p className="text-sm text-stone-200">{username}</p>
        {variant === "self" && (
          <p className="bg-stone-800 text-xs px-2 py-1 rounded-xl text-stone-500">
            shreds.net
          </p>
        )}
      </span>
    </aside>
  );
};
export default NameUsername;
export const Bio = ({ bio }: { bio: string }) => {
  return (
    <main className="text-sm text-stone-200">
      {bio.split("\n").map((line) => (
        <p key={line}>{line}</p>
      ))}
    </main>
  );
};
