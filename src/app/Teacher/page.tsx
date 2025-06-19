"use client";

import CreateNewQuestions from "@/component/khususGuru/buatSoal/createQuestions";
import ViewQuestions from "@/component/khususGuru/hasilPertanyaan/pertanyaan";
import ManageStudent from "@/component/khususGuru/kelolaSiswa/manageStudent";
import NavigasiBar from "@/component/navigasiBar/navbar";
import Link from "next/link";
import { useState } from "react";

export default function Teacher() {
  const [dashboardButton, setDashboardButton] = useState({
    createQusetions: true,
    viewResult: false,
    manageStudent: false,
  });

  function handleClickItem(event: any) {
    if (event === "viewResult") {
      setDashboardButton({
        createQusetions: false,
        viewResult: true,
        manageStudent: false,
      });
    } else if (event === "manageStudent") {
      setDashboardButton({
        createQusetions: false,
        viewResult: false,
        manageStudent: true,
      });
    } else {
      setDashboardButton({
        createQusetions: true,
        viewResult: false,
        manageStudent: false,
      });
    }
  }

  return (
    <div className="bg-slate-200">
      <NavigasiBar />

      {/* dasboard untuk siswa */}
      <div className="w-3/4 mx-auto mt-5 p-5 pb-10">
        <h1 className="text-4xl font-bold text-center">Dashboard Pengajar</h1>
        <ul className="w-10/12 mx-auto mt-16 flex justify-around">
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500"
            id="createQusetions"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            <Link href="">Buat Soal</Link>
          </li>
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500"
            id="viewResult"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            <Link href="">Lihat Hasil</Link>
          </li>
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500"
            id="manageStudent"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            <Link href="">Kelola Siswa</Link>
          </li>
        </ul>
        <div className="border border-slate-800 mt-10 mb-7 rounded-xl" />

        <div className="mt-5">
          {dashboardButton.viewResult === true ? (
            <ViewQuestions />
          ) : dashboardButton.manageStudent === true ? (
            <ManageStudent />
          ) : (
            <CreateNewQuestions />
          )}
        </div>
      </div>
    </div>
  );
}
