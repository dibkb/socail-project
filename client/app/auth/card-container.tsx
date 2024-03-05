import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-[400px]">
      {children}
      <CardContent className="border-none cursor-pointer">
        <Card
          className="border border-stone-700
              hover:bg-stone-700 
        rounded-lg px-6 py-4 flex items-center justify-between"
        >
          <GitHubLogoIcon className="h-8 w-8" />
          <p className="font-semibold">Continue with Github</p>
          <ChevronRightIcon />
        </Card>
      </CardContent>
    </div>
  );
};

export default CardContainer;
