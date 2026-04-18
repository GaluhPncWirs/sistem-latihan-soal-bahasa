import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function HamburgerMenu({ children }: React.PropsWithChildren) {
  const [isCheked, setIsCheked] = useState<boolean>(false);
  const clickOutsidePath = useRef<HTMLDivElement | null>(null);

  console.log(isCheked);

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

  return (
    <div className="md:hidden" ref={clickOutsidePath}>
      <div className="menu flex flex-col items-center gap-y-1">
        <Input
          type="checkbox"
          className="size-5 absolute z-50 cursor-pointer opacity-0"
          checked={isCheked}
          onChange={() => setIsCheked((prev) => !prev)}
        />
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
        <span className="block w-6 h-1 bg-black rounded-md transition-all"></span>
      </div>
      <div
        className={`absolute right-0 left-0 top-0 bg-slate-50 w-full transition-all duration-300 text-xl font-semibold h-60 p-5
      ${isCheked ? `translate-y-0` : `-translate-y-full`}`}
      >
        <Image
          src="/img/global/logo.png"
          alt="Logo"
          width={400}
          height={400}
          className="w-52"
        />
        {children}
      </div>
    </div>
  );
}
