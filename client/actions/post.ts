import { imgurl, threads } from "@/modals/thread-modal";
import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

interface post {
  threads: threads[];
  imgs: imgurl[];
}
export const createPost = async (data: post) => {
  const { threads, imgs } = data;
  try {
    if (!(threads || imgs)) throw new Error("No empty fields");
    //   SINGLE POST
    if ((threads ?? []).length === 1 || (imgs ?? []).length === (1 || 0)) {
      const serverResponse = await axios.post(
        `${SERVER}/api/v1/posts/create`,
        {
          body: threads[0].value,
          image: imgs[0].data,
        },
        {
          withCredentials: true,
        }
      );
      return {
        data: serverResponse.data,
      };
    } else {
      //   THREADS POST
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
