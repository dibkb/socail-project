import { useLayoutEffect, useState } from "react";

export const useIsBelowWidth = (number: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isBelowWidth, setIsBelowWidth] = useState(false);
  useLayoutEffect(() => {
    function handleResize() {
      setLoading(false);
      setIsBelowWidth(window.innerWidth < number); // Adjust the width threshold as needed
    }
    // Initial check on component mount
    handleResize();
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove event listener
    return () => {
      setLoading(true);
      window.removeEventListener("resize", handleResize);
    };
  }, [number]); // Empty dependency array to run effect only once on mount
  return { isBelowWidth, loading };
};
