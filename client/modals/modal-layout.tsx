"use client";
import { useIsBelowWidth } from "@/hooks/isBelowWidth";
import React, {
  useRef,
  useEffect,
  useState,
  RefObject,
  Dispatch,
  SetStateAction,
} from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  closeOnClick?: boolean;
  children: React.ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
  z?: number;
  responsive?: boolean;
}
const Modallayout: React.FC<PortalProps> = ({
  closeOnClick = true,
  children,
  setOpen,
  responsive = false,
  z = 1000,
}) => {
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const { isBelowWidth } = useIsBelowWidth(600);
  useEffect(() => {
    if (closeOnClick) {
      const handleClickOutside = (event: MouseEvent) => {
        const targetElement = event.target as HTMLElement;
        if (ref.current && !ref.current?.contains(targetElement)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, setOpen, closeOnClick]);
  const [mounted, setMounted] = React.useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  const content = (
    <main
      className="h-full w-full fixed top-0 left-0 "
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: z,
      }}
    >
      <div
        ref={ref}
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
  const responsivContent = (
    <main
      className="h-full w-full border fixed top-0 left-0 "
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: z,
      }}
    >
      {children}
    </main>
  );
  return mounted
    ? ReactDOM.createPortal(
        responsive && isBelowWidth ? responsivContent : content,
        document.getElementById("portal-root") as HTMLElement
      )
    : null;
};

export default Modallayout;
