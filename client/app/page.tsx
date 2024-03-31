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
import { removeDuplicates } from "@/utils/removeDuplicates";
import axios from "axios";
import { useEffect, useState } from "react";
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
  // const { data, error, isLoading }: SWRResponse<getPostResponse> = useSWR(
  //   "getAllPosts",
  //   getAllPosts
  // );
  // ${SERVER}/api/v1/posts/all?per_page=${4}&page=${index + 1}
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    getAllPosts(page).then((res) => {
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
    });
  }, [page]);
  let isLoading = false;
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
              onClick={() => setPage((prev) => prev + 1)}
            >
              Load more
            </Button>
          </div>
        </div>
      )}
    </Globallayout>
  );
}
