"use client";
import React, { useEffect, useState } from "react";
import { Singlepost } from "./single-post";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import Avatar from "../home/avatar";
import { Input } from "../ui/input";
import { Post, Comment } from "@/types";
import useSWR, { SWRResponse } from "swr";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { commentFetcher, smallProfileFetcher } from "@/actions/getComment";
import Postcomment, { smallProfile } from "./post-comment";
import { addComment } from "@/actions/addComment";
import { sortbyTimeAscending } from "@/utils/sort-by-time";
import { likePost, unlikePost } from "@/actions/likePost";
import { useUserStore } from "@/src/providers/user-store-provider";
interface PostLayout {
  post: Post;
  // username: string;
  // userid: string;
}
interface ErrorData {
  message: string;
}
const PostLayout = React.memo(({ post }: PostLayout) => {
  const { user } = useUserStore((state) => state);
  const { data, error, isLoading }: SWRResponse<Comment[], ErrorData, boolean> =
    useSWR(post?.id, commentFetcher);
  const {
    data: userProfile,
    error: userError,
    isLoading: userLoading,
  }: SWRResponse<smallProfile> = useSWR(post?.userId, smallProfileFetcher);
  const [body, setBody] = useState<string>("");
  const [comment, setComment] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<{
    number: number;
    liked: boolean;
  }>({
    number: post.likedIds.length,
    liked: post.likedIds.includes(user?.id || ""),
  });
  useEffect(() => {
    setLikes({
      number: post.likedIds.length,
      liked: post.likedIds.includes(user?.id || ""),
    });
  }, [post]);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setBody("");
    addComment(post.id, body)
      .then((res) => {
        setComment((prev) => [...prev, res.data]);
      })
      .catch(() => {})
      .finally(() => {});
  };
  const postLikeHandler = () => {
    likePost(post.id)
      .then((res) => {
        if (res.data) {
          setLikes((prev) => ({
            number: prev.number + 1,
            liked: true,
          }));
        }
      })
      .catch(() => {})
      .finally(() => {});
  };
  const postUnlikeHandler = () => {
    unlikePost(post.id)
      .then((res) => {
        if (res.data) {
          setLikes((prev) => ({
            number: prev.number - 1,
            liked: false,
          }));
        }
      })
      .catch(() => {})
      .finally(() => {});
  };
  useEffect(() => {
    if (data) {
      setComment(data);
    }
  }, [data]);
  if (!userLoading && userProfile)
    return (
      <main className="flex flex-col gap-3 py-3 select-none">
        <Singlepost post={post} user={userProfile} trail={true}>
          <div className="w-full">
            {likes.liked ? (
              <IoMdHeart
                className="h-5 w-5 cursor-pointer text-red-600"
                onClick={postUnlikeHandler}
              />
            ) : (
              <IoMdHeartEmpty
                className="h-5 w-5 cursor-pointer"
                onClick={postLikeHandler}
              />
            )}
            <div className="flex justify-between items-center mt-4">
              <span className="flex items-center text-xs gap-3 text-stone-500 font-medium cursor-pointer">
                <p>{likes.number} like</p>
                <p
                  className="hover:underline"
                  onClick={() => setOpenComments((prev) => !prev)}
                >
                  {comment?.length} comments
                </p>
              </span>
              {comment?.length ? (
                <span onClick={() => setOpenComments((prev) => !prev)}>
                  {openComments ? (
                    <RiArrowDropUpLine className="rounded-full hover:bg-stone-800 h-5 w-5 text-stone-500 cursor-pointer" />
                  ) : (
                    <RiArrowDropDownLine className="rounded-full hover:bg-stone-800 h-5 w-5 text-stone-500 cursor-pointer" />
                  )}
                </span>
              ) : (
                ""
              )}
            </div>
            {/* comments */}
            <div className="mt-2 flex flex-col gap-1">
              {openComments &&
                userProfile &&
                comment
                  .sort(sortbyTimeAscending)
                  ?.map((com) => <Postcomment key={com.id} com={com} />)}
            </div>
          </div>
        </Singlepost>
        <span className="flex items-center justify-between text-xs cursor-pointer text-stone-600 font-medium">
          {/* type-comment */}
          <span className="flex gap-2  text-stone-200 w-full">
            <Avatar variant={"self"} />
            <form
              action=""
              className="rounded-md border-none grow flex items-center pr-3"
              onSubmit={handleSubmitComment}
            >
              <Input
                value={body}
                onChange={(e) => setBody(e.target.value)}
                type="text"
                placeholder="Reply to post..."
                className="border-transparent text-xs group focus-visible:border-stone-500 focus-visible:ring-0 grow"
              />
            </form>
          </span>
        </span>
      </main>
    );
  else "Loading";
});

export default PostLayout;
