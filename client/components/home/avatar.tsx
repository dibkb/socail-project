import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
interface AvatarForm {
  className?: HTMLElement["className"];
  children?: ReactNode;
  imgurl?: string;
}
const AvatarForm = ({ className, children, imgurl }: AvatarForm) => {
  const { user } = useUserStore((state) => state);
  if (imgurl) {
    return (
      <Avatar className={className}>
        <AvatarImage
          src={imgurl || "https://github.com/shadcn.png"}
          alt={imgurl}
        />
        <AvatarFallback>CN</AvatarFallback>
        {children}
      </Avatar>
    );
  } else {
    return (
      <Avatar className={className}>
        <AvatarImage
          src={user?.profilePic || "https://github.com/shadcn.png"}
          alt={user?.name}
        />
        <AvatarFallback>CN</AvatarFallback>
        {children}
      </Avatar>
    );
  }
};

export default React.memo(AvatarForm);
