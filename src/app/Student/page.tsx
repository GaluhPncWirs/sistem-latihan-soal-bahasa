"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
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

export default function Student() {
  const [resultExam, setResultExam] = useState<any>([]);
  const getIdStudent = useGetIdStudent();
  const [dataStudent, setDataStudent] = useState<any>([]);
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
    <div>
      <NavigasiBar />
      {/* dasboard untuk siswa */}
      <div className="w-11/12 mx-auto p-24">
        <h1 className="text-4xl font-bold text-center">Dashboard Siswa</h1>
        <h1 className="text-2xl font-bold mt-5">
          {/* Halo {getDataStudent.fullName} */}
        </h1>
        <div className="w-10/12 mx-auto mt-8">
          <div className="mb-7">
            <h1 className="text-xl font-semibold bg-amber-400 text-center rounded-md py-2 mb-5">
              Ujian Yang Tersedia
            </h1>
            {resultExam.length > 0 ? (
              <table className="border-collapse w-full">
                <thead>
                  <tr className="bg-slate-500 border-2 border-black">
                    <th className="text-slate-100 p-2">Ujian</th>
                    <th className="text-slate-100 p-2">Status</th>
                  </tr>
                </thead>
                {resultExam.flatMap((tes: any, i: number) => (
                  <tbody key={i}>
                    <tr className="border-2 border-black">
                      <td className="px-3">{tes.nama_ujian}</td>
                      <td className="px-3">
                        {tes.status_pengerjaan_siswa.map(
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
                                    href={`/Exams/?id=${tes.id}`}
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
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            ) : (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-stone-300 px-4 py-6 w-full flex gap-5">
                    <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                  </div>
                  <div className="bg-stone-300 px-4 py-6 w-full flex gap-5">
                    <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-amber-400 text-center rounded-md py-2 mb-5">
              Hasil Nilai Ujian
            </h1>
            {dataStudent.length > 0 ? (
              <table className="border-collapse w-full">
                <thead>
                  <tr className="bg-slate-500 border-2 border-black">
                    <th className="text-slate-100 p-2">Nama Ujian</th>
                    <th className="text-slate-100 p-2">Nilai Ujian</th>
                  </tr>
                </thead>
                {dataStudent
                  .flatMap((datas: any) => datas.exams)
                  .map((data: any, i: number) => (
                    <tbody key={i}>
                      <tr className="border-2 border-black">
                        <td className="px-3">
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
                        </td>
                        <td className="px-3">
                          {data.status_pengerjaan_siswa.map((stat: any) =>
                            stat.status_exam === true &&
                            stat.student_id === getIdStudent
                              ? stat.hasil_ujian
                              : "Belum Ada Nilai"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            ) : (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-stone-300 px-4 py-6 w-full flex gap-5">
                    <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                    <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                  </div>
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
  );
}
