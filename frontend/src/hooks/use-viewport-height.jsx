import { useState, useEffect } from "react";

export const useViewportHeight = () => {
  const [vh, setVh] = useState(window.innerHeight * 0.01);

  useEffect(() => {
    const handleResize = () => {
      setVh(window.innerHeight * 0.01);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return vh;
};
