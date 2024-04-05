"use client";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
import { getAllPosts, smallProfileFetcher } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Threadform from "@/components/home/thread-form";
import { Globallayout } from "@/components/layouts/main";
import Posts from "@/components/posts/post";
import { Button } from "@/components/ui/button";
import { useIsMounted } from "@/hooks/isMounted";
import { useUserStore } from "@/src/providers/user-store-provider";
import { Post, Threads } from "@/types";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
export default function Home() {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState<{ posts: Post[]; threads: Threads[] }>();
  const [page, setPage] = useState<number>(1);
  const { user } = useUserStore((state) => state);
  const isMounted = useIsMounted();
  useEffect(() => {
    getAllPosts(page)
      .then((res) => {
        setData((prev) => {
          if (page > 1)
            return {
              posts: [...(prev?.posts || []), ...(res?.posts || [])],
              threads: [...(prev?.threads || []), ...(res?.threads || [])],
            };
          else {
            return {
              posts: res?.posts || [],
              threads: res?.threads || [],
            };
          }
        });
      })
      .finally(() => setisLoading(false));
  }, [page]);
  if (!user && isMounted) return redirect("/auth/login");
  return (
    <Globallayout>
      <Threadform />
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <div className="grow mt-6">
          {data?.posts && data.threads && (
            <>
              <Posts posts={data?.posts} threads={data?.threads} />
              <div className="flex px-auto">
                <Button
                  className="my-3 mx-auto"
                  variant={"ghost"}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Load more
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </Globallayout>
  );
}
