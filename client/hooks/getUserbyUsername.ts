import { getUserInfo } from "@/actions/getuser";
import { User } from "@/src/stores/user-store";
import { useEffect, useState } from "react";

export const useUserDataByUsername = (cleanedUsername: string | undefined) => {
  const [res, setRes] = useState<
    | {
        data: User;
        error?: undefined;
      }
    | {
        error: any;
        data?: undefined;
      }
  >();
  useEffect(() => {
    async function getuser(username: string) {
      const res = await getUserInfo(username);
      return res;
    }
    cleanedUsername?.length &&
      getuser(cleanedUsername).then((result) => setRes(result));
  }, [cleanedUsername]);
  return res;
};
