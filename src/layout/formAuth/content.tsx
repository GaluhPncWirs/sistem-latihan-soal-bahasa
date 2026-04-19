"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type PropsFormAccount = {
  formTitle: string;
  children: React.ReactNode;
};

export default function FormAuth(props: PropsFormAccount) {
  const { formTitle, children } = props;
  const pathName = usePathname();
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div>
        <Link
          href="/Introduction"
          className="flex gap-x-1 border border-slate-500 w-fit px-4 py-1.5 rounded-md hover:bg-blue-100"
        >
          <ArrowLeft /> <span>Kembali</span>
        </Link>
        <div className="bg-blue-100 mt-3">
          <div className="rounded-md shadow-lg shadow-slate-500 py-5 w-md sm:w-lg">
            <h1 className="text-3xl font-bold text-blue-500 text-center mb-3 tracking-wider">
              {formTitle}
            </h1>
            {children}
          </div>
        </div>
        <div className="mt-5">
          {pathName === "/Auth/Login" ? (
            <h1>
              <span>Belum Punya Akun ? </span>
              <Link
                className="font-semibold text-blue-600 hover:underline"
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
    </div>
  );
}
