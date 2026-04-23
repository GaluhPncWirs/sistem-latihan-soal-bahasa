"use client";
import CreateNewQuestions from "@/components/local/khususGuru/buatSoal/createQuestions";
import ViewQuestions from "@/components/local/khususGuru/hasilPertanyaan/pertanyaan";
import ManageStudent from "@/components/local/khususGuru/kelolaSiswa/manageStudent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import HeaderDasboard from "@/components/local/forDasboard/content";
import FloatingBarDashboardTeacher from "@/components/local/khususGuru/navigasi/floatingBar";
import { getResultExamDataStudent } from "@/app/hooks/getDataResultStudent";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";
import { useGetDataUsers } from "@/store/useGetDataUsers/state";
import MainContent from "@/layout/mainContent/content";
import { BarChart3, ClipboardCheck, Layers } from "lucide-react";
import { useManageDataExams } from "@/app/hooks/getManageDataExams";

export default function Teacher() {
  const [dashboardButton, setDashboardButton] = useState({
    scheduleExams: true,
    createQuestions: false,
    viewResult: false,
    manageStudent: false,
  });
  const getidTeacher = useGetIdUsers((state) => state.idUser);
  const dataUserTeacher = useGetDataUsers((state) => state.dataUsers);
  const manageDataExams = useManageDataExams(getidTeacher);
  const dataStudentExams = getResultExamDataStudent(getidTeacher);

  function handleClickItem(event: string) {
    setDashboardButton({
      scheduleExams: event === "scheduleExams",
      createQuestions: event === "createQuestions",
      viewResult: event === "viewResult",
      manageStudent: event === "manageStudent",
    });
  }

  const jumlahSiswa = new Set(
    manageDataExams.flatMap((a: any) => a.lengthStudent),
  );

  const averageValueExam = manageDataExams
    ?.flatMap((item: any) => item.hasil_ujian)
    .filter((a: string) => a !== "pending" && a !== "telat")
    .map(Number)
    .reduce((acc: number, cur: number) => acc + cur, 0);

  return (
    <MainContent>
      {manageDataExams.length > 0 ? (
        <div>
          <HeaderDasboard
            user="Pengajar"
            fullName={dataUserTeacher?.fullName ?? ""}
            exams={dataStudentExams}
          />
          <div className="mt-5">
            <h1 className="text-2xl font-semibold tracking-wider">
              Ringkasan Aktifitas Ujian
            </h1>
            <div className="flex justify-evenly my-7 text-slate-200">
              <div className="bg-[#476EAE] rounded-md p-4 sm:basis-[30%] lg:basis-1/5 lg:p-5">
                <ClipboardCheck className="size-9 mx-auto" />
                <span className="text-3xl font-bold block py-2 sm:text-4xl">
                  {manageDataExams.length || "0"}
                </span>
                <h1 className="font-semibold">Ujian Dibuat</h1>
              </div>
              <div className="bg-[#476EAE] rounded-md p-4 sm:basis-[30%] lg:basis-1/5 lg:p-5">
                <Layers className="size-9 mx-auto" />
                <span className="text-3xl font-bold block my-1.5 sm:text-4xl">
                  {jumlahSiswa.size || "0"}
                </span>
                <h1 className="font-semibold">Jumlah Siswa</h1>
              </div>
              <div className="bg-[#476EAE] rounded-md p-4 sm:basis-[30%] lg:basis-1/5 lg:p-5">
                <BarChart3 className="size-9 mx-auto" />
                <span className="text-3xl font-bold block my-2 sm:text-4xl">
                  {Math.round(averageValueExam / jumlahSiswa.size) || "0"}
                </span>
                <h1 className="font-semibold">Nilai Rata-Rata</h1>
              </div>
            </div>
            <FloatingBarDashboardTeacher handleClickItem={handleClickItem} />
            <div className="mt-5">
              {dashboardButton.scheduleExams === true ? (
                <div>
                  <h1 className="mb-5 text-2xl font-semibold tracking-wide">
                    Jadwal Ujian Hari ini
                  </h1>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-300">
                        <TableHead>No</TableHead>
                        <TableHead>Nama Ujian</TableHead>
                        <TableHead>Kelas</TableHead>
                        <TableHead>Tenggat Waktu</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {manageDataExams.length > 0 ? (
                        manageDataExams.map((item: any, i: number) => (
                          <TableRow key={i}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{item.exams?.nama_ujian}</TableCell>
                            <TableCell>{item.kelas}</TableCell>
                            <TableCell>
                              {item.dibuat_tgl} {item.tenggat_waktu}
                            </TableCell>

                            <TableCell>
                              {item.lengthStudent.length ===
                              item.lengthStudentCompleteExams?.length
                                ? "Selesai"
                                : "Belum Selesai"}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center text-lg font-semibold"
                          >
                            Belum Ada Soal Ujian Yang Dikelola
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : dashboardButton.createQuestions === true ? (
                <CreateNewQuestions />
              ) : dashboardButton.viewResult === true ? (
                <ViewQuestions />
              ) : dashboardButton.manageStudent === true ? (
                <ManageStudent />
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-10 max-[640px]:w-1/2 bg-slate-500 animate-pulse rounded-md"></div>
            <div className="w-7 h-7 bg-slate-500 animate-pulse rounded-md"></div>
          </div>
          <div className="h-1 bg-slate-500 animate-pulse rounded-lg mt-3" />
          <div className="mt-5 flex items-center gap-x-7">
            <div className="h-36 sm:w-1/4 md:w-1/6 max-[640px]:w-1/3 max-[640px]:h-28 rounded-full bg-slate-500 animate-pulse"></div>
            <div className="w-2/3 h-28 flex flex-col justify-center">
              <div className="w-2/3 h-7 rounded-md bg-slate-500 animate-pulse"></div>
              <div className="mt-2 h-5 rounded-md bg-slate-500 animate-pulse w-1/3"></div>
            </div>
          </div>
          <div className="mt-5">
            <div className="w-1/2 max-[640px]:w-3/4 h-7 bg-slate-500 animate-pulse rounded-md"></div>

            <div className="flex justify-evenly items-center my-7 text-slate-800 gap-x-1">
              <div className="bg-slate-500 animate-pulse rounded-md max-[640px]:p-4 max-[640px]:w-1/3 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <div className="w-3/4 h-7 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-2/3 h-6 bg-slate-400 animate-pulse rounded-md"></div>
              </div>
              <div className="bg-slate-500 animate-pulse rounded-md max-[640px]:p-4 max-[640px]:w-1/3 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <div className="w-3/4 h-7 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-2/3 h-6 bg-slate-400 animate-pulse rounded-md"></div>
              </div>
              <div className="bg-slate-500 animate-pulse rounded-md max-[640px]:p-4 max-[640px]:w-1/3 sm:basis-[30%] sm:p-4 lg:basis-1/4 lg:p-5">
                <div className="w-3/4 h-7 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md mb-2"></div>
                <div className="w-2/3 h-6 bg-slate-400 animate-pulse rounded-md"></div>
              </div>
            </div>
            <div className="flex justify-evenly mx-auto items-center h-20 bg-slate-500 animate-pulse rounded-md max-[640px]:w-full sm:w-full lg:w-11/12">
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
              <div className="bg-slate-400 animate-pulse rounded-md w-1/6 h-10"></div>
            </div>
            <div className="mt-5">
              <div className="mb-5 bg-slate-500 animate-pulse rounded-md w-1/2 h-10"></div>
              <div>
                {Array.from({ length: 5 }).map((_: any, i: number) => (
                  <div
                    key={i}
                    className="bg-slate-500 animate-pulse rounded-md w-full h-7 mb-3"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </MainContent>
  );
}
