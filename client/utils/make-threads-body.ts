import { post } from "@/actions/post";
import { threads } from "@/modals/thread-modal";
const findIndexById = (
  arr: { body?: string; image?: string; id: number }[],
  id: number
): number => {
  return arr.findIndex((item) => item.id === id);
};
const processPosts = ({ threads, imgs }: post): threadposts => {
  const posts: { body?: string; image?: string; id: number }[] = [];
  threads
    ?.filter((thread) => thread.id !== 0)
    .forEach((t) => {
      posts.push({
        id: t.id,
        body: t.value,
      });
    });
  imgs
    ?.filter((img) => img.id !== 0)
    .forEach((img) => {
      const match = findIndexById(posts, img.id);
      posts[match] = { ...posts[match], image: img.data };
    });
  const titleImg = imgs?.filter((i) => i.id === 0)[0];
  const body = {
    title: threads?.filter((thread) => thread.id === 0)[0].value ?? "",
    ...(titleImg !== undefined && { image: titleImg.data }),
    posts: posts,
  };
  return body;
};
interface postBody {
  body?: string;
  image?: string;
}
interface threadposts {
  title?: string;
  image?: string;
  posts: postBody[];
}

export default processPosts;
