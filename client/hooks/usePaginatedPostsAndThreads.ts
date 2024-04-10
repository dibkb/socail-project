import { Post, Threadsfull } from "@/types";
import { useEffect, useState } from "react";
import useSWR, { SWRResponse } from "swr";
interface loader {
  url: string;
  loader: (url: string) => Promise<any>;
}
const usePaginatedPostsAndThreads = ({
  postsLoader,
  threadsLoader,
}: {
  postsLoader: loader;
  threadsLoader: loader;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [threads, setThreads] = useState<Threadsfull[]>([]);
  const {
    data: postsData,
    error: postsError,
    isLoading: postsLoading,
  }: SWRResponse<{ posts: Post[] }> = useSWR(
    postsLoader.url,
    postsLoader.loader
  );
  const {
    data: threadsData,
    error: threadsError,
    isLoading: threadsLoading,
  }: SWRResponse<{ threads: Threadsfull[] }> = useSWR(
    threadsLoader.url,
    threadsLoader.loader
  );
  useEffect(() => {
    if (postsData?.posts) {
      setPosts((prev) => {
        return [...prev, ...postsData?.posts];
      });
    }
  }, [postsData]);
  useEffect(() => {
    if (threadsData?.threads) {
      setThreads((prev) => {
        return [...prev, ...threadsData?.threads];
      });
    }
  }, [threadsData]);
  return {
    posts,
    threads,
    postsError,
    threadsError,
    postsLoading,
    threadsLoading,
  };
};
export default usePaginatedPostsAndThreads;
