"use client";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NavigasiBar() {
  const [isUserThere, setIsUserThere] = useState<boolean>(false);
  const { push } = useRouter();
  useEffect(() => {
    const isUserDataSiswa = localStorage.getItem("idLoginSiswa");
    const isUserDataGuru = localStorage.getItem("idLoginGuru");
    if (isUserDataSiswa) {
      const isObjectTrue = Object.keys(isUserDataSiswa).length > 0;
      setIsUserThere(isObjectTrue);
    } else if (isUserDataGuru) {
      const isObjectTrue = Object.keys(isUserDataGuru).length > 0;
      setIsUserThere(isObjectTrue);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("idLoginSiswa");
    localStorage.removeItem("idLoginGuru");
    document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    push("/Autentikasi/Login");
  }

  return (
    <div className="w-full h-16 bg-amber-300 fixed z-[9999]">
      <div className="flex items-center h-full gap-x-3">
        <div className="basis-1/5 h-full flex items-center justify-center">
          {/* <Image src="" alt="" width={500} height={500}/> */}
          <h1>Logo</h1>
        </div>
        <ul className="basis-3/5 flex justify-around h-full items-center">
          <li className="cursor-pointer text-xl font-semibold">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer text-xl font-semibold">
            <Link href={`${isUserThere === true ? `/Profile` : `/`}`}>
              Profil
            </Link>
          </li>
          <li className="cursor-pointer text-xl font-semibold">
            <Link href={`${isUserThere === true ? `/Student` : `/`}`}>
              Dashboard
            </Link>
          </li>
        </ul>
        <div className="basis-1/5 h-full flex items-center justify-center gap-5 mr-5">
          {isUserThere === true ? (
            <button
              onClick={handleLogout}
              className="bg-blue-400 py-1.5 px-5 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold text-lg"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/Autentikasi/Daftar"
                className="bg-blue-400 py-1.5 px-5 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold text-lg"
              >
                Daftar
              </Link>
              <Link
                href="/Autentikasi/Login"
                className="bg-blue-400 py-1.5 px-5 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold text-lg"
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
