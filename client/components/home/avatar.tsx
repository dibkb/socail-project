import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const AvatarForm = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default AvatarForm;
