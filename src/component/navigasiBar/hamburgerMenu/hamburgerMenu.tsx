import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ListClickContent from "../listContent/listClick";

export default function HamburgerMenu({
  isUserThereTeacher,
  isUserThereStudent,
  handleLogout,
}: any) {
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
    <div className="sm:hidden">
      <div className="menu flex flex-col h-5 justify-between absolute right-7 top-6">
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
      <ul
        className={`flex justify-center gap-y-10 absolute right-0 h-screen flex-col bg-[#A6E3E9] bg-gradient-to-b to-sky-300 items-center w-1/2 -z-10 transition-all duration-300 text-xl font-semibold rounded-bl-lg
      ${isCheked ? `translate-x-0` : `translate-x-full`}`}
        ref={clickOutsidePath}
        id="navbar"
      >
        <ListClickContent />
        <li>
          {isUserThereStudent === true || isUserThereTeacher === true ? (
            <button
              onClick={handleLogout}
              className="bg-[#71C9CE] py-1.5 px-5 rounded-lg hover:bg-teal-500 cursor-pointer font-semibold text-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/Autentikasi/Daftar"
                className="bg-[#71C9CE] py-1.5 px-5 rounded-lg hover:bg-teal-500 cursor-pointer font-semibold text-lg block mb-3"
              >
                Daftar
              </Link>
              <Link
                href="/Autentikasi/Login"
                className="border border-black py-1.5 px-5 rounded-lg hover:bg-teal-400 cursor-pointer font-semibold text-lg block"
              >
                Login
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}
