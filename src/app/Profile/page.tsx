"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Profil() {
  const getDataStudent = localStorage.getItem("dataLoginSiswa");
  const [dataStudent, setDataStudent] = useState<any>(
    JSON.parse(getDataStudent!)
  );

  return (
    <div>
      <NavigasiBar />
      <Toaster />
      <div className="w-full mx-auto flex justify-center items-center h-screen pt-14">
        <div className="w-1/2 bg-sky-500 shadow-md shadow-slate-600 pb-5 rounded-lg">
          <h1 className="font-semibold text-xl text-center my-1.5">
            Profile Kamu
          </h1>
          <div className="flex bg-amber-200">
            <div className="basis-1/4">
              <Image
                src="/img/profile/userProfile.png"
                alt="Profile"
                width={500}
                height={500}
                className="w-full"
              />
            </div>
            <ul className="tracking-wide font-semibold basis-2/3 flex flex-col justify-center pl-7">
              <li>
                id : <span className="font-bold">{dataStudent.idStudent}</span>
              </li>
              <li>
                Nama : <span className="font-bold">{dataStudent.fullName}</span>
              </li>
              <li>
                Kelas : <span className="font-bold">{dataStudent.classes}</span>
              </li>
            </ul>
          </div>
          <div className="overflow-auto p-5 mb-5">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              beatae error quisquam temporibus itaque illum quibusdam
              consequatur sapiente quia praesentium expedita dolore delectus
              accusamus, quod aperiam reprehenderit fugit quo quidem?
            </h1>
          </div>
          <Link
            className="bg-slate-300 px-10 py-1.5 rounded-md ml-5 text-lg font-bold"
            href="/Student"
          >
            Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
