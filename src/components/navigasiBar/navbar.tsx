"use client";
import Image from "next/image";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
import ButtonAutentications from "./buttonAuth/content";
import ListContent from "./listContent/content";

export default function NavigasiBar() {
  return (
    <div className="w-full h-20 bg-slate-50 fixed shadow-lg shadow-slate-500 z-20">
      <div className="flex justify-between md:justify-evenly h-full">
        <div className="flex items-center w-2/3 pl-5 md:w-1/4 md:pl-0">
          <Image
            src="/img/global/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="w-56"
            loading="eager"
          />
          <HamburgerMenu />
        </div>
        <div className="hidden md:flex md:justify-end md:items-center md:gap-5 md:w-2/3">
          <div className="flex w-1/2 justify-evenly">
            <ListContent />
          </div>
          <div className="flex gap-4">
            <ButtonAutentications />
          </div>
        </div>
      </div>
    </div>
  );
}
