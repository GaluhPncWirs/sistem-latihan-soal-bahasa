import { useEffect, useRef, useState } from "react";

export function useHandleClickedHamburgerMenu() {
  const [isCheked, setIsCheked] = useState<boolean>(false);
  const clickOutsidePath = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutsideNavbar(event: MouseEvent) {
      if (
        clickOutsidePath.current &&
        !clickOutsidePath.current.contains(event.target as Node)
      ) {
        setIsCheked(false);
      }
    }

    window.addEventListener("click", handleClickOutsideNavbar);

    return () => {
      window.removeEventListener("click", handleClickOutsideNavbar);
    };
  }, []);

  return {
    isCheked,
    clickOutsidePath,
    setIsCheked,
  };
}
