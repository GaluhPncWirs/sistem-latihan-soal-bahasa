"use client";
import ButtonLogin from "@/component/btnFormAccount/btnLogin";
import ButtonRegister from "@/component/btnFormAccount/btnRegister";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

export default function LayoutFormAccount({ formTitle, children }: any) {
  const pathName = usePathname();
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center flex-col">
      <Toaster />
      <div className="bg-slate-200 w-2/5 py-3 rounded-xl shadow-lg shadow-slate-400">
        <h1 className="text-3xl font-bold text-blue-500 text-center mt-2 mb-4">
          {formTitle}
        </h1>
        {children}
      </div>
      {pathName === "/Autentikasi/Login" ? <ButtonLogin /> : <ButtonRegister />}
    </div>
  );
}
