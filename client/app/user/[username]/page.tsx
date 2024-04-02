// "use client";
import { getUserPostsByUsername } from "@/actions/getUserPosts";
import { Post, Threads } from "@/types";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";
import Spinner from "@/components/svg/spinner";
import Posts from "@/components/posts/post";
import Loading from "@/components/guides/loading";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import {
  getCleanedusername,
  getCleanedusernameServer,
} from "@/utils/getCleanedusername";
import { getAllusernames } from "@/actions/getuser";
import { smallProfileFetcher } from "@/actions/getComment";
export async function generateStaticParams() {
  const usernames = await getAllusernames();
  return usernames.data.map((u: any) => ({
    username: `@${u.username}`,
  }));
}
interface posts {
  posts: Post[];
  threads: Threads[];
}
const Userprofilepage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const cleanedUsername = (await getCleanedusernameServer(
    params.username
  )) as string;
  const { data } = await getUserPostsByUsername(cleanedUsername);
  return (
    <Suspense fallback={<PostSkeleton />}>
      {data?.posts?.length === 0 && data?.threads?.length ? (
        <div className="flex items-center justify-center h-44">
          No posts yet
        </div>
      ) : (
        ""
      )}
      {data?.threads && data?.threads && (
        <Posts threads={data?.threads} posts={data?.posts} />
      )}
    </Suspense>
  );
};

export default Userprofilepage;
