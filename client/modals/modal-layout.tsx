"use client";
import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}
const Modallayout: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);
  const content = (
    <main
      className="h-full w-full fixed top-0 left-0 z-[1000]"
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
      }}
    >
      <div
        className="fixed"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        {children}
      </div>
    </main>
  );
  return mounted
    ? ReactDOM.createPortal(
        content,
        document.getElementById("portal-root") as HTMLElement
      )
    : null;
};

export default Modallayout;
