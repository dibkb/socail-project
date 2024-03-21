import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
interface AvatarForm {
  className?: HTMLElement["className"];
  children?: ReactNode;
}
const AvatarForm = ({ className, children }: AvatarForm) => {
  const { user } = useUserStore((state) => state);
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
};

export default React.memo(AvatarForm);
