import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";
interface CardContainerProps {
  children: React.ReactNode;
  alternateLabel: string;
  alternateLink: string;
}
const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <div className="max-w-[500px] mx-auto">
      {children}
      <CardContent className="border-none cursor-pointer">
        <Card
          className="border border-stone-700
              hover:bg-stone-700 
        rounded-lg p-6 flex items-center justify-between"
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
