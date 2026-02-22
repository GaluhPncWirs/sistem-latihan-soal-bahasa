import { useEffect, useRef, useState } from "react";

export function useHandleClickedHamburgerMenu() {
  const [isCheked, setIsCheked] = useState<boolean>(false);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const clickOutsidePath = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutsideNavbar(event: MouseEvent) {
      if (
        clickOutsidePath.current &&
        !clickOutsidePath.current.contains(event.target as Node)
      ) {
        setIsTrue(true);
      }
    }

    window.addEventListener("click", handleClickOutsideNavbar);

    return () => {
      window.removeEventListener("click", handleClickOutsideNavbar);
    };
  }, []);

  useEffect(() => {
    if (isTrue) {
      setIsCheked(false);
      setIsTrue(false);
    }
  }, [isTrue]);

  return {
    isCheked,
    clickOutsidePath,
    setIsCheked,
    setIsTrue,
  };
}
