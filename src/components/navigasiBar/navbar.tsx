"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
import ButtonAutentications from "./buttonAuth/content";
import ListContent from "./listContent/content";

export default function NavigasiBar() {
  const [isUserThereStudent, setIsUserThereStudent] = useState<boolean>(false);
  const [isUserThereTeacher, setIsUserThereTeacher] = useState<boolean>(false);

  useEffect(() => {
    const isUserDataSiswa = localStorage.getItem("idLoginSiswa");
    const isUserDataGuru = localStorage.getItem("idLoginGuru");
    if (isUserDataSiswa) {
      const isObjectTrue = Object.keys(isUserDataSiswa).length > 0;
      setIsUserThereStudent(isObjectTrue);
    } else if (isUserDataGuru) {
      const isObjectTrue = Object.keys(isUserDataGuru).length > 0;
      setIsUserThereTeacher(isObjectTrue);
    }
  }, []);

  const { push } = useRouter();
  async function handleLogout() {
    const responseDelCookies = await fetch("/api/delCookies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const messageRespons = await responseDelCookies.json();
    localStorage.removeItem("idLoginSiswa");
    localStorage.removeItem("idLoginGuru");
    push("/Autentikasi/Login");
    toast("Berhasil ✅", { description: messageRespons.message });
  }

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
          <HamburgerMenu
            isUserThereTeacher={isUserThereTeacher}
            isUserThereStudent={isUserThereStudent}
            handleLogout={handleLogout}
          />
        </div>
        <div className="max-[640px]:hidden sm:hidden md:flex md:items-center md:basis-2/3">
          <div className="basis-2/3 flex justify-evenly">
            <ListContent />
          </div>
          <div className="basis-1/3 flex justify-end gap-3">
            <ButtonAutentications
              isUserThereStudent={isUserThereStudent}
              isUserThereTeacher={isUserThereTeacher}
              handleLogout={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
