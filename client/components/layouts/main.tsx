import React from "react";

export const Globallayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-2xl container">{children}</div>;
};

export const Profilelayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full sm:max-w-2xl sm:container sm:min-h-[90vh] flex flex-col">
      {children}
    </div>
  );
};
