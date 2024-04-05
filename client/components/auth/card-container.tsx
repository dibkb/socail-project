import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
interface CardContainerProps {
  children: React.ReactNode;
  alternateLabel: string;
  alternateLink: string;
}
const CardContainer = ({
  children,
  alternateLabel,
  alternateLink,
}: CardContainerProps) => {
  return (
    <>
      {children}
      <CardContent className="flex items-center gap-x-4">
        <hr className="w-full rounded-lg border-stone-700" />
        <p className="text-sm text-stone-500">OR</p>
        <hr className="w-full border-stone-700 rounded-lg" />
      </CardContent>
      <CardContent className="border-none cursor-pointer">
        {/* <Card
          className="border border-stone-700
              hover:bg-stone-700 
        rounded-lg p-6 flex items-center justify-between"
        >
          <GitHubLogoIcon className="h-8 w-8" />
          <p className="font-semibold">Continue with Github</p>
          <ChevronRightIcon />
        </Card> */}
        <div className="mt-4 text-sm text-center text-stone-500 hover:underline">
          <Link href={alternateLink}>{alternateLabel}</Link>
        </div>
      </CardContent>
    </>
  );
};

export default CardContainer;
