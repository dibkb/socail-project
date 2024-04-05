import { Post } from "@/types";
import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
type updateval = Pick<Post, "id" | "image" | "body">;
export const updatePost = async (data: updateval) => {
  const { body, image, id } = data;
  try {
    const serverResponse = await axios.put(
      `${SERVER}/api/v1/posts/${id}`,
      {
        body,
        image,
      },
      {
        withCredentials: true,
      }
    );
    return {
      data: serverResponse.data,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
