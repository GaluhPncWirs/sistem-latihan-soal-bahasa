import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ButtonAutentications from "../buttonAuth/content";
import ListContent from "../listContent/content";

export default function HamburgerMenu({
  isUserThereTeacher,
  isUserThereStudent,
  handleLogout,
}: any) {
  const [isCheked, setIsCheked] = useState<boolean>(false);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const clickOutsideHamburgerMenu = useRef<HTMLInputElement | null>(null);
  const clickOutsidePath = useRef<HTMLDivElement | null>(null);

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
      <div className="menu flex flex-col h-5 justify-between absolute right-7 top-7">
        <Input
          type="checkbox"
          className="size-5 absolute z-20 cursor-pointer opacity-0"
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
      <div
        className={`flex pt-24 gap-y-12 absolute right-0 top-16 h-screen flex-col bg-[#A6E3E9] bg-gradient-to-b to-sky-300 items-center w-60 transition-all duration-300 text-xl font-semibold rounded-bl-lg
      ${isCheked ? `translate-x-0` : `translate-x-full`}`}
        ref={clickOutsidePath}
      >
        <ListContent />
        <ButtonAutentications
          isUserThereStudent={isUserThereStudent}
          isUserThereTeacher={isUserThereTeacher}
          handleLogout={handleLogout}
        />
      </div>
    </div>
  );
}
