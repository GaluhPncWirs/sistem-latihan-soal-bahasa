import { useEffect, useState } from "react";

export function useGetMediaQuery({ widthScreen }: any) {
  const [isSizeMobile, setIsSizeMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(widthScreen);
    function handler(e: MediaQueryListEvent | MediaQueryList) {
      setIsSizeMobile(e.matches);
    }

    handler(mediaQuery);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isSizeMobile;
}
