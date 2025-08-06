"use client";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NavigasiBar() {
  const [isUserThereStudent, setIsUserThereStudent] = useState<boolean>(false);
  const [isUserThereTeacher, setIsUserThereTeacher] = useState<boolean>(false);

  const { push } = useRouter();
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

  function handleLogout() {
    localStorage.removeItem("idLoginSiswa");
    localStorage.removeItem("idLoginGuru");
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    push("/Autentikasi/Login");
  }

  return (
    <div className="w-full h-16 bg-[#A6E3E9] fixed z-10 shadow-lg shadow-slate-500">
      <div className="flex items-center h-full gap-x-3">
        <div className="basis-1/5 h-full flex items-center justify-center">
          {/* <Image src="" alt="" width={500} height={500}/> */}
          <h1>Logo</h1>
        </div>
        <ul className="basis-3/5 flex justify-around h-full items-center">
          {isUserThereTeacher === true ? (
            <ul className="cursor-pointer text-xl basis-3/5 flex justify-around h-full items-center font-semibold">
              <li>Dashboard</li>
              <li>Profil</li>
            </ul>
          ) : (
            <>
              <li className="cursor-pointer text-xl font-semibold">
                <Link href="/">Beranda</Link>
              </li>
              <li className="cursor-pointer text-xl font-semibold">
                <Link
                  href={`${isUserThereStudent === true ? `/Profile` : `/`}`}
                >
                  Profil
                </Link>
              </li>
              <li className="cursor-pointer text-xl font-semibold">
                <Link href="#">Panduan</Link>
              </li>
              <li className="cursor-pointer text-xl font-semibold">
                <Link
                  href={`${isUserThereStudent === true ? `/Student` : `/`}`}
                >
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="basis-1/5 h-full flex items-center justify-center gap-5 mr-5">
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
