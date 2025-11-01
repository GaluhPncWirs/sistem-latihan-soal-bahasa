"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LayoutFormAccount({ formTitle, children }: any) {
  const pathName = usePathname();
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] h-screen flex justify-center items-center flex-col">
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] rounded-xl shadow-xl shadow-slate-500 max-[640px]:w-10/12 sm:w-2/3 sm:py-5 md:w-lg max-[640px]:py-5">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-3">
          {formTitle}
        </h1>
        {children}
      </div>
      <div className="mt-7 text-lg">
        {pathName === "/Autentikasi/Login" ? (
          <h1>
            <span>Belum Punya Akun ? </span>
            <Link
              className="font-semibold text-blue-700 hover:underline"
              href="/Autentikasi/Daftar"
            >
              Daftar
            </Link>
          </h1>
        ) : (
          <h1>
            <span>Sudah Punya Akun ? </span>
            <Link
              className="font-semibold text-blue-700 hover:underline"
              href="/Autentikasi/Login"
            >
              Login
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
}
