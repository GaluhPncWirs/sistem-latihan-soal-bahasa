import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  });

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
        className={`flex justify-center gap-y-10 absolute right-0 h-screen flex-col items-center w-2/5 bg-[#A6E3E9] -z-10 transition-all duration-300 text-xl font-semibold rounded-bl-lg
      ${isCheked ? `translate-x-0` : `translate-x-full`}`}
        ref={clickOutsidePath}
        id="navbar"
      >
        <li className="cursor-pointer text-xl font-semibold">
          <Link href="/">Beranda</Link>
        </li>
        {isUserThereTeacher === true ? (
          <>
            <li className="cursor-pointer text-xl font-semibold">
              <Link href="/Teacher/dashboard">Dashboard</Link>
            </li>
            <li className="cursor-pointer text-xl font-semibold">
              <Link href="/Teacher/Profil">Profil</Link>
            </li>
          </>
        ) : (
          <>
            <li className="cursor-pointer text-xl font-semibold">
              <Link
                href={`${
                  isUserThereStudent === true ? `/Student/Profile` : `/`
                }`}
              >
                Profil
              </Link>
            </li>

            <li className="cursor-pointer text-xl font-semibold">
              <Link
                href={`${
                  isUserThereStudent === true ? `/Student/Dashboard` : `/`
                }`}
              >
                Dashboard
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
