"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/data";
import { toast } from "sonner";
import { useGetIdStudent } from "../hooks/getIdStudent";
import LayoutBodyContent from "@/layout/bodyContent";
import { useGetDataStudent } from "../hooks/getDataStudent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Student() {
  const [resultExam, setResultExam] = useState<any>([]);
  const getIdStudent = useGetIdStudent();
  const [dataStudent, setDataStudent] = useState<any>([]);
  const getNameStudent = useGetDataStudent(getIdStudent);
  useEffect(() => {
    async function getDataExamResult() {
      const { data, error }: any = await supabase.from("exams").select("*");
      setResultExam(data);
      if (error) {
        toast("data tidak bisa ditampilkan, error");
      }
    }
    getDataExamResult();
  }, []);

  useEffect(() => {
    async function getDataExamStudent() {
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select("*, exams (nama_ujian,status_pengerjaan_siswa,id)");
      setDataStudent(data);
      if (error) {
        toast("data tidak bisa ditampilkan, error");
      }
    }
    getDataExamStudent();
  }, []);

  return (
    <LayoutBodyContent>
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        <div className="w-10/12 mx-auto pt-32">
          <div className="mb-7">
            <h1 className="text-2xl font-bold mb-3">
              Halo, Selamat Datang {getNameStudent?.fullName}
            </h1>
            <p className="text-lg">
              Berikut ringkasan aktivitas dan ujian Anda.
            </p>
          </div>
          <div className="flex justify-evenly items-center mt-10">
            <div className="bg-[#F38181] rounded-lg p-5 font-semibold text-center">
              <h1 className="text-lg">Jumlah Ujian Yang Diikuti</h1>
              <div className="text-xl">5</div>
            </div>
            <div className="bg-[#6096B4] rounded-lg p-5 font-semibold text-center">
              <h1 className="text-lg">Nilai Rata Rata</h1>
              <div className="text-xl">77</div>
            </div>
            <div className="bg-[#FCE38A] rounded-lg p-5 font-semibold text-center">
              <h1 className="text-lg">Ujian Terjadwal Hari ini</h1>
              <div className="text-xl">2</div>
            </div>
          </div>
          <div className="w-3/4 mx-auto mt-8">
            <div className="mb-7">
              <h1 className="text-xl font-semibold bg-[#0F4C75] text-center rounded-md py-2 mb-5 text-slate-100">
                Jadwal Ujian Yang Tersedia
              </h1>
              {resultExam.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#3282B8]">
                      <TableHead>No</TableHead>
                      <TableHead>Nama Ujian</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Status Ujian</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultExam.flatMap((data: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{data.nama_ujian}</TableCell>
                        <TableCell>hari ini</TableCell>
                        <TableCell>
                          {data.status_pengerjaan_siswa.map(
                            (test: any, i: number) =>
                              test.status_exam === true &&
                              test.student_id === getIdStudent ? (
                                "Complete"
                              ) : (
                                <HoverCard
                                  openDelay={200}
                                  closeDelay={200}
                                  key={i}
                                >
                                  <HoverCardTrigger asChild>
                                    <Link
                                      href={`/Exams/?id=${data.id}`}
                                      className="hover:underline hover:text-blue-700"
                                    >
                                      Uncomplete
                                    </Link>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-fit p-2">
                                    <h1 className="font-semibold text-xs">
                                      Kerjakan Ujian
                                    </h1>
                                  </HoverCardContent>
                                </HoverCard>
                              )
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-stone-300 px-4 py-6 w-full flex gap-5">
                      <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-[#0F4C75] text-center rounded-md py-2 mb-5 text-slate-100">
                Hasil Nilai Ujian
              </h1>
              {dataStudent.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#3282B8]">
                      <TableHead>No</TableHead>
                      <TableHead>Nama Ujian</TableHead>
                      <TableHead>Tgl Pengerjaan</TableHead>
                      <TableHead>Nilai Ujian</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataStudent
                      .flatMap((datas: any) => datas.exams)
                      .map((data: any, i: number) => (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>
                            {data.status_pengerjaan_siswa.map(
                              (status: any, i: number) =>
                                status.status_exam === true &&
                                status.student_id === getIdStudent ? (
                                  <HoverCard
                                    openDelay={200}
                                    closeDelay={200}
                                    key={i}
                                  >
                                    <HoverCardTrigger asChild>
                                      <Link
                                        href={`/Student/ResultExam/?id=${data.id}`}
                                        className="hover:underline hover:text-blue-700"
                                      >
                                        {data.nama_ujian}
                                      </Link>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit p-2">
                                      <h1 className="font-semibold text-xs">
                                        Lihat Hasil Ujian
                                      </h1>
                                    </HoverCardContent>
                                  </HoverCard>
                                ) : (
                                  data.nama_ujian
                                )
                            )}
                          </TableCell>
                          <TableCell>hari ini</TableCell>
                          <TableCell>
                            {data.status_pengerjaan_siswa.map((stat: any) =>
                              stat.status_exam === true &&
                              stat.student_id === getIdStudent
                                ? stat.hasil_ujian
                                : "Belum Ada Nilai"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-stone-300 px-4 py-6 w-full flex gap-5">
                      <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
