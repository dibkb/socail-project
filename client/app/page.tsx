"use client";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
import { getAllPosts, smallProfileFetcher } from "@/actions/getComment";
import Loading from "@/components/guides/loading";
import { PostSkeleton } from "@/components/guides/skeleton-loader";
import Threadform from "@/components/home/thread-form";
import { Globallayout } from "@/components/layouts/main";
import Posts from "@/components/posts/post";
import { Button } from "@/components/ui/button";
import { Post, Threads } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
import useSWRInfinite, { SWRInfiniteResponse } from "swr/infinite";
interface getPostResponse {
  posts: Post[];
  threads: Threads[];
}
const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);
type UseSWRInfiniteReturnType = SWRInfiniteResponse<getPostResponse, Error>;
export default function Home() {
  const [data, setData] = useState<{ posts: Post[]; threads: Threads[] }>();
  const {
    data: response,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading,
  }: UseSWRInfiniteReturnType = useSWRInfinite(
    (index) => `${SERVER}/api/v1/posts/all?per_page=${4}&page=${index + 1}`,
    fetcher
  );
  // const { data, error, isLoading }: SWRResponse<getPostResponse> = useSWR(
  //   "getAllPosts",
  //   getAllPosts
  // );
  useEffect(() => {
    setData((prev) => {
      return {
        posts: [...(prev?.posts || []), ...(response?.[0].posts || [])],
        threads: [...(prev?.threads || []), ...(response?.[0].threads || [])],
      };
    });
  }, [response]);

  return (
    <Globallayout>
      <Threadform />
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <div className="grow">
          {data?.posts && data.threads && (
            <Posts posts={data?.posts} threads={data?.threads} />
          )}
          <div className="flex px-auto">
            <Button
              className="my-3 mx-auto"
              variant={"ghost"}
              onClick={() => setSize((prev) => prev + 1)}
            >
              Load more
            </Button>
          </div>
        </div>
      )}
    </Globallayout>
  );
}
