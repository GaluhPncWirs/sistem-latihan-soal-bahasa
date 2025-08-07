"use client";

import CreateNewQuestions from "@/component/khususGuru/buatSoal/createQuestions";
import ViewQuestions from "@/component/khususGuru/hasilPertanyaan/pertanyaan";
import ManageStudent from "@/component/khususGuru/kelolaSiswa/manageStudent";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LayoutBodyContent from "@/layout/bodyContent";
import Link from "next/link";
import { useState } from "react";

export default function Teacher() {
  const [dashboardButton, setDashboardButton] = useState({
    createQusetions: false,
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
    } else if (event === "createQusetions") {
      setDashboardButton({
        createQusetions: true,
        viewResult: false,
        manageStudent: false,
      });
    }
  }

  return (
    <LayoutBodyContent>
      <div className="pt-28 w-3/4 mx-auto">
        <h1 className="text-4xl font-bold text-center">Dashboard Pengajar</h1>
        <h1 className="text-2xl font-bold my-5">Halo, Selamat Datang</h1>
        <div className="flex justify-evenly items-center mt-10">
          <div className="bg-amber-300 p-5 rounded-lg text-center">
            <h1 className="font-semibold text-lg">Total Ujian Dibuat</h1>{" "}
            <span className="font-bold">12</span>
          </div>
          <div className="bg-amber-300 p-5 rounded-lg text-center">
            <h1 className="font-semibold text-lg">Siswa Terdaftar</h1>{" "}
            <span className="font-bold">54</span>
          </div>
          <div className="bg-amber-300 p-5 rounded-lg text-center">
            <h1 className="font-semibold text-lg">Ujian Hari Ini</h1>{" "}
            <span className="font-bold">4</span>
          </div>
          <div className="bg-amber-300 p-5 rounded-lg text-center">
            <h1 className="font-semibold text-lg">Total Ujian Dibuat</h1>{" "}
            <span className="font-bold">128</span>
          </div>
        </div>
        <ul className="w-10/12 mx-auto mt-16 flex justify-around font-semibold text-lg">
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer"
            id="createQusetions"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            Buat Soal
          </li>
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer"
            id="viewResult"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            Kelola Soal
          </li>
          <li
            className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer"
            id="manageStudent"
            onClick={(e) => handleClickItem(e.currentTarget.id)}
          >
            Kelola Siswa
          </li>
          <li className="bg-blue-400 px-5 py-2 rounded-lg hover:bg-blue-500 cursor-pointer">
            <button onClick={() => window.location.reload()}>Kembali</button>
          </li>
        </ul>
        <div className="border border-slate-800 mt-10 mb-7 rounded-xl" />

        <div className="mt-5">
          {dashboardButton.viewResult === true ? (
            <ViewQuestions />
          ) : dashboardButton.manageStudent === true ? (
            <ManageStudent />
          ) : dashboardButton.createQusetions === true ? (
            <CreateNewQuestions />
          ) : (
            <div>
              <h1 className="mb-7 text-2xl text-center font-semibold">
                Jadwal Ujian Hari ini
              </h1>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3282B8]">
                    <TableHead>No</TableHead>
                    <TableHead>Nama Ujian</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Dibuat Tanggal</TableHead>
                    <TableHead>Waktu Mulai</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>tes2</TableCell>
                    <TableCell>tes 3</TableCell>
                    <TableCell>tes 4</TableCell>
                    <TableCell>tes 3</TableCell>
                    <TableCell>tes 4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </LayoutBodyContent>
  );
}
