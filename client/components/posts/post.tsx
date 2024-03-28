import { Post, Threads } from "@/types";
import React from "react";
import Avatar from "../home/avatar";
import { User } from "@/src/stores/user-store";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { calulateTime } from "@/utils/calulate-time-passed";
interface Posts {
  posts: Post[];
  threads: Threads[];
  user?: User;
}
const Posts = ({ posts, threads, user }: Posts) => {
  console.log(posts);
  console.log(threads);
  return (
    <div>
      {threads.map((th) => (
        <main key={th.id} className="flex gap-2 border-b border-stone-800 pb-3">
          {/* Thread body */}
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="self" />
            <span className="grow border border-stone-800 bg-stone-800"></span>
          </div>
          <div className="flex flex-col grow">
            <span className="flex items-center justify-between w-full">
              <p className="text-sm">{user?.username}</p>
              <span className="flex items-center gap-1 text-stone-600 text-xs font-medium">
                <p>{calulateTime(th.createdAt).quantity}</p>
                <p>{calulateTime(th.createdAt).unit}</p>
              </span>
            </span>
            <p>{th.title}</p>
            <span className="mt-3 flex gap-3 items-center">
              <IoMdHeartEmpty className="h-5 w-5 cursor-pointer" />
              <FaRegComment className="h-4 w-4 cursor-pointer" />
            </span>
          </div>
        </main>
      ))}
    </div>
  );
};

export default Posts;
