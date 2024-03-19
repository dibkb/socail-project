import axios from "axios";
const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export interface updateval {
  bio?: string;
  username?: string;
  name?: string;
}
export const update = async (data: updateval) => {
  const { bio, username, name } = data;
  try {
    const serverResponse = await axios.put(
      `${SERVER}/api/v1/users/update`,
      {
        name,
        username,
        bio,
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
