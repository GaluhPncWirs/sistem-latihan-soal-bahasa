"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
import ButtonAutentications from "./buttonAuth/content";

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
      <div className="flex items-center h-full">
        <div className="h-full flex items-center justify-center bg-[#A6E3E9] bg-gradient-to-l to-sky-300 max-[640px]:basis-2/3 max-[640px]:justify-start max-[640px]:pl-5 sm:basis-1/3 md:basis-1/5">
          <Image
            src="/img/footer/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="w-52"
          />
          <HamburgerMenu
            isUserThereTeacher={isUserThereTeacher}
            isUserThereStudent={isUserThereStudent}
            handleLogout={handleLogout}
          />
        </div>
        <div className="h-full flex items-center bg-[#A6E3E9] bg-gradient-to-r to-sky-300 max-[640px]:hidden sm:basis-2/3 md:basis-4/5">
          <div className="basis-2/3 flex justify-evenly items-center">
            <Link
              href="/"
              className="cursor-pointer font-semibold text-slate-800 hover:text-slate-600"
            >
              <span className="text-xl">Beranda</span>
            </Link>
            <Link
              href="/HowToUse"
              className="cursor-pointer font-semibold text-slate-800 hover:text-slate-600"
            >
              <span className="text-xl">Cara Pakai</span>
            </Link>
          </div>
          <div className="basis-1/3 flex items-center justify-center gap-5">
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
