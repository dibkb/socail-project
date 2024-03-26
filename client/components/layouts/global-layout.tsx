import React from "react";

const Globallayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-2xl container">{children}</div>;
};

export default Globallayout;
