import { imgurl, threads } from "@/modals/thread-modal";
import makeThreadsBody from "@/utils/make-threads-body";
import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export interface post {
  threads: threads[];
  imgs: imgurl[];
}
export const createPost = async (data: post) => {
  const { threads, imgs } = data;
  try {
    if (!(threads || imgs)) throw new Error("No empty fields");
    if (threads?.length > 1 || imgs?.length > 1) {
      //   THREADS POST
      const body = makeThreadsBody({ threads, imgs });
      const serverResponse = await axios.post(
        `${SERVER}/api/v1/posts/threads/create`,
        body,
        {
          withCredentials: true,
        }
      );
      return {
        data: serverResponse.data,
      };
    } else {
      //   SINGLE POST
      {
        const serverResponse = await axios.post(
          `${SERVER}/api/v1/posts/create`,
          {
            body: threads[0].value,
            ...(imgs[0] !== undefined && { image: imgs[0].data }),
          },
          {
            withCredentials: true,
          }
        );
        return {
          data: serverResponse.data,
        };
      }
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
