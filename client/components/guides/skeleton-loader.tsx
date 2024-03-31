import React from "react";

export const Postsk = () => {
  return <div className="w-full h-64 rounded-xl bg-stone-900"></div>;
};
export const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 mt-4 animate-pulse">
      {[...Array(4).fill(4)].map((ele) => (
        <Postsk key={ele} />
      ))}
    </div>
  );
};
