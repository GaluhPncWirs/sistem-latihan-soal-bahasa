"use client";
import Image from "next/image";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
import ButtonAutentications from "./buttonAuth/content";
import ListContent from "./listContent/content";

export default function NavigasiBar() {
  return (
    <div className="w-full h-20 bg-[#A6E3E9] fixed shadow-lg shadow-slate-500 z-20">
      <div className="flex justify-between md:justify-evenly h-full">
        <div className="flex items-center max-[640px]:basis-2/3 max-[640px]:pl-5 sm:basis-2/3 sm:pl-5 md:basis-1/4 md:pl-0">
          <Image
            src="/img/global/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="w-56"
          />
          <HamburgerMenu />
        </div>
        <div className="max-[640px]:hidden sm:hidden md:flex md:items-center md:basis-2/3">
          <div className="basis-2/3 flex justify-evenly">
            <ListContent />
          </div>
          <div className="basis-1/3 flex justify-end gap-3">
            <ButtonAutentications />
          </div>
        </div>
      </div>
    </div>
  );
}
