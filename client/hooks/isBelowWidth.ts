import { useLayoutEffect, useState } from "react";

export const useIsBelowWidth = (number: number) => {
  const [isBelowWidth, setIsBelowWidth] = useState(false);
  useLayoutEffect(() => {
    function handleResize() {
      setIsBelowWidth(window.innerWidth < number); // Adjust the width threshold as needed
    }

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [number]); // Empty dependency array to run effect only once on mount
  return { isBelowWidth };
};
