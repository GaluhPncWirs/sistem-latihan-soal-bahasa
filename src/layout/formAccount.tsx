"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LayoutFormAccount({ formTitle, children }: any) {
  const pathName = usePathname();
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] h-screen flex justify-center items-center flex-col">
      <div className="to-[#A6E3E9] rounded-md shadow-xl shadow-slate-500 py-5 w-10/12 sm:w-2/3 md:w-lg">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-3">
          {formTitle}
        </h1>
        {children}
      </div>
      <div className="mt-7 text-lg">
        {pathName === "/Auth/Login" ? (
          <h1>
            <span>Belum Punya Akun ? </span>
            <Link
              className="font-semibold text-blue-700 hover:underline"
              href="/Auth/Daftar"
            >
              Daftar
            </Link>
          </h1>
        ) : (
          <h1>
            <span>Sudah Punya Akun ? </span>
            <Link
              className="font-semibold text-blue-700 hover:underline"
              href="/Auth/Login"
            >
              Login
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
}
