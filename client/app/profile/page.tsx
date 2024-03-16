import { Button } from "@/components/ui/button";
import React from "react";

const Profilepage = () => {
  const noThread = <Button variant={"outline"}>Start your first thread</Button>;
  return (
    <div className="grow flex items-center justify-center">{noThread}</div>
  );
};

export default Profilepage;
