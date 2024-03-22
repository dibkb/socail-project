import { post } from "@/actions/post";
const processPosts = ({ threads, imgs }: post): threadposts => {
  const posts: { body?: string; image?: string }[] = [];
  threads.forEach((thread) => {
    posts[thread.id] = { body: thread.value };
  });

  imgs.forEach((img) => {
    posts[img.id] = { ...posts[img.id], image: img.data };
  });

  return {
    title: threads[0].value ?? "",
    image: imgs[0].data ?? "",
    posts: posts,
  };
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
