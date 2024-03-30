"use client";
import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/src/providers/user-store-provider";
interface AvatarForm {
  className?: HTMLElement["className"];
  children?: ReactNode;
  imgurl?: string;
  name?: string;
  variant: "self" | "others";
}
const AvatarForm = React.memo(
  ({ className, children, imgurl, name, variant }: AvatarForm) => {
    const { user } = useUserStore((state) => state);
    if (variant === "others") {
      return (
        <Avatar className={className}>
          <AvatarImage src={imgurl} alt={name} />
          <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
          {children}
        </Avatar>
      );
    } else {
      return (
        <Avatar className={className}>
          <AvatarImage src={user?.profilePic} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          {children}
        </Avatar>
      );
    }
  }
);

export default React.memo(AvatarForm);
