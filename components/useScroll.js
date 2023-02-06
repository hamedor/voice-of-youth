import { useState, useEffect } from "react";

const useScroll = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScroll = (currentTarget) => {
    setScrollTop(currentTarget.scrollTop);
    setClientHeight(currentTarget.clientHeight);
    setScrollHeight(currentTarget.scrollHeight);
  };

  // setScrollY(window.pageYOffset);
  useEffect(() => {
    handleScroll();
    window.addEventListener(
      "scroll",
      (currentTarget) => handleScroll(currentTarget),
      { passive: true }
    );
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, []);

  return [scrollTop, clientHeight, scrollHeight];
};

export default useScroll;
