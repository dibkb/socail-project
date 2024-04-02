// "use client";
import { getUserPostsByUsername } from "@/actions/getUserPosts";
import React, { Suspense } from "react";
import Posts from "@/components/posts/post";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import { getCleanedusernameServer } from "@/utils/getCleanedusername";
import { getAllusernames } from "@/actions/getuser";
export async function generateStaticParams() {
  const usernames = await getAllusernames();
  return usernames?.data?.map((u: any) => ({
    username: `@${u.username}`,
  }));
}
const Userprofilepage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const cleanedUsername = getCleanedusernameServer(params.username) as string;
  const { data, error } = await getUserPostsByUsername(cleanedUsername);
  return (
    <Suspense fallback={<PostSkeleton />}>
      {data?.posts?.length === 0 && data?.threads?.length === 0 ? (
        <div className="flex items-center justify-center h-44">
          No posts yet
        </div>
      ) : (
        ""
      )}
      {data?.threads.length || data?.threads.length ? (
        <Posts threads={data?.threads} posts={data?.posts} />
      ) : (
        ""
      )}
    </Suspense>
  );
};

export default Userprofilepage;
