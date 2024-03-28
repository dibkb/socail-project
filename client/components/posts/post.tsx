import { Post, Threads } from "@/types";
import React from "react";
import Avatar from "../home/avatar";
import { User } from "@/src/stores/user-store";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
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
        <main key={th.id} className="flex gap-2">
          {/* Thread body */}
          <div>
            <Avatar variant="self" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm">{user?.username}</p>
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
