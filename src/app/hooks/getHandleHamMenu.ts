import { useEffect, useRef, useState } from "react";

export function useHandleClickedHamburgerMenu() {
  const [isCheked, setIsCheked] = useState<boolean>(false);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const clickOutsideHamburgerMenu = useRef<HTMLInputElement | null>(null);
  const clickOutsidePath = useRef<any>(null);

  useEffect(() => {
    function handleClickOutsideNavbar(event: any) {
      if (
        clickOutsidePath.current &&
        !clickOutsidePath.current.contains(event.target) &&
        clickOutsideHamburgerMenu.current &&
        !clickOutsideHamburgerMenu.current.contains(event.target)
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
    clickOutsideHamburgerMenu,
    clickOutsidePath,
    setIsCheked,
    setIsTrue,
  };
}
