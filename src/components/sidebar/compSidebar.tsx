import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import ListSidebar from "./listSidebar/content";

export default function HamburgerMenuBar() {
  const [isCheked, setIsCheked] = useState<boolean>(false);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const clickOutsideHamburgerMenu = useRef<any>(null);
  const clickOutsidePath = useRef<HTMLUListElement | null>(null);

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

  return (
    <div className="md:hidden">
      <div className="menu flex flex-col items-center gap-y-1">
        <Input
          type="checkbox"
          className="absolute size-6 cursor-pointer z-20 opacity-0"
          ref={clickOutsideHamburgerMenu}
          checked={isCheked}
          onChange={() => {
            setIsCheked((prev) => !prev);
            setIsTrue(false);
          }}
        />
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
      </div>
      <ul
        className={`flex gap-y-10 fixed left-0 top-0 flex-col bg-[#476EAE] items-center w-1/2 transition-all duration-300 text-xl font-semibold h-screen z-50 pt-28 sm:w-1/3
      ${isCheked ? `translate-x-0` : `-translate-x-full`}`}
        ref={clickOutsidePath}
        id="navbar"
      >
        <ListSidebar />
      </ul>
    </div>
  );
}
