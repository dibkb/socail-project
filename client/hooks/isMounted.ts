import { useEffect, useState } from "react";
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // Component is mounted
    setIsMounted(true);
    // Cleanup function to handle component unmounting
    return () => {
      // Component is unmounted
      setIsMounted(false);
    };
  }, []);
  return isMounted;
};
