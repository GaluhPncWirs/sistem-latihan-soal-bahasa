"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import Link from "next/link";
import { useGetDataStudent } from "../hooks/getDataStudent";
import { useGetIdStudent } from "../hooks/getIdStudent";

export default function Profil() {
  const id = useGetIdStudent();
  const dataStudent = useGetDataStudent(id);

  return (
    <div>
      <NavigasiBar />
      <Toaster />
      <div className="w-full mx-auto flex justify-center items-center h-screen pt-14">
        {!dataStudent ? (
          <div className="w-1/2 bg-slate-400 rounded-lg h-80 p-5 animate-pulse">
            <h1 className="w-full bg-slate-300 h-8 rounded-md"></h1>
            <div className="flex bg-slate-300 rounded-md mt-3 h-24 px-3 justify-around items-center">
              <div className="w-1/4 bg-slate-200 h-16 rounded-md flex justify-center items-center">
                <div className="w-3/4 bg-slate-300 h-12 rounded-md"></div>
              </div>
              <ul className="w-2/3 bg-slate-200 h-16 rounded-md flex flex-col justify-center gap-1 p-2">
                <li className="w-full bg-slate-300 h-4 rounded-md"></li>
                <li className="w-full bg-slate-300 h-4 rounded-md"></li>
                <li className="w-full bg-slate-300 h-4 rounded-md"></li>
              </ul>
            </div>
            <div className="w-full bg-slate-200 h-24 rounded-md mt-3 flex flex-col justify-center gap-1 p-3">
              <div className="w-full bg-slate-300 h-4 rounded-md"></div>
              <div className="w-full bg-slate-300 h-4 rounded-md"></div>
              <div className="w-full bg-slate-300 h-4 rounded-md"></div>
              <div className="w-full bg-slate-300 h-4 rounded-md"></div>
            </div>
            <div className="w-1/4 bg-slate-300 h-5 mt-4 rounded-md"></div>
          </div>
        ) : (
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
                  id :{" "}
                  <span className="font-bold">{dataStudent.idStudent}</span>
                </li>
                <li>
                  Nama :{" "}
                  <span className="font-bold">{dataStudent.fullName}</span>
                </li>
                <li>
                  Kelas :{" "}
                  <span className="font-bold">{dataStudent.classes}</span>
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
        )}
      </div>
    </div>
  );
}
