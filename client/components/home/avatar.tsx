import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
interface AvatarForm {
  className?: HTMLElement["className"];
}
const AvatarForm = ({ className }: AvatarForm) => {
  const { user } = useUserStore((state) => state);
  return (
    <Avatar className={className}>
      <AvatarImage
        src={user?.profilePic || "https://github.com/shadcn.png"}
        alt={user?.name}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarForm;
