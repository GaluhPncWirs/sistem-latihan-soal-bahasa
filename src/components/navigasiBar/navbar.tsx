"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";

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
    <div className="w-full h-16 bg-[#A6E3E9] fixed shadow-lg shadow-slate-500 z-20">
      <div className="flex items-center h-full">
        <div className="md:basis-1/5 sm:basis-1/3 h-full flex items-center justify-center max-[640px]:basis-2/3 max-[640px]:justify-start max-[640px]:pl-5 bg-[#A6E3E9] bg-gradient-to-l to-sky-300">
          <Image
            src="/img/footer/logo.png"
            alt="Logo"
            width={500}
            height={500}
            className="w-10/12 max-[640px]:w-3/5"
          />
        </div>
        <HamburgerMenu
          isUserThereTeacher={isUserThereTeacher}
          isUserThereStudent={isUserThereStudent}
          handleLogout={handleLogout}
        />
        <ul className="md:basis-3/5 sm:basis-1/2 flex justify-evenly h-full items-center max-[640px]:hidden">
          <Link
            href="/"
            className="cursor-pointer text-xl font-semibold text-slate-800"
          >
            <span className="text-xl">Beranda</span>
          </Link>
          <Link
            href="/HowToUse"
            className="cursor-pointer text-xl font-semibold text-slate-800"
          >
            <span className="text-xl">Cara Pakai</span>
          </Link>
        </ul>
        <div className="basis-1/4 pr-5 h-full flex items-center justify-center gap-5 max-[640px]:hidden bg-[#A6E3E9] bg-gradient-to-r to-sky-300">
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
                className="bg-[#71C9CE] py-1.5 px-5 rounded-lg hover:bg-teal-500 cursor-pointer font-semibold text-lg"
              >
                Daftar
              </Link>
              <Link
                href="/Autentikasi/Login"
                className="border border-black py-1.5 px-5 rounded-lg hover:bg-teal-400 cursor-pointer font-semibold text-lg"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
