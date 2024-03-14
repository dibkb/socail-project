import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
const AvatarForm = () => {
  const { user } = useUserStore((state) => state);
  return (
    <Avatar>
      <AvatarImage
        src={user?.profilePic || "https://github.com/shadcn.png"}
        alt={user?.name}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarForm;
