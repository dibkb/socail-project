import { Globallayout, Profilelayout } from "@/components/layouts/main";
import NameUsername, {
  Bio,
} from "@/components/profile/profile-page/name-username";
import React, { useEffect } from "react";
import AvatarForm from "@/components/home/avatar";
import { getUserInfo } from "@/actions/getuser";
import { usePathname } from "next/navigation";
import Spinner from "@/components/svg/spinner";
import { User } from "@/src/stores/user-store";
// server actions
export default async function Username(pathname: any) {
  const cleanedUsername = pathname.params.username
    .split("/")
    .pop()
    ?.split("%40")[1];
  const res = await getUserInfo(cleanedUsername);
  if (res) {
    if (res.data) {
      const data = res.data as User;
      return (
        <Globallayout>
          <Profilelayout>
            <div className="flex items-center justify-between">
              <NameUsername
                name={data.name}
                username={data.username}
                variant="others"
              />
              <aside>
                <AvatarForm
                  className="w-20 h-20"
                  imgurl={data.profilePic}
                  name={data.name}
                  variant="others"
                />
              </aside>
            </div>
            <main className="mt-4">
              <Bio bio={data.bio} />
            </main>
          </Profilelayout>
        </Globallayout>
      );
    }

    if (res.error) {
      return "Some error occured";
    }
  } else {
    return <Spinner />;
  }
}
