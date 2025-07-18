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

export default function Student() {
  const [resultExam, setResultExam] = useState<any>([]);
  const [statusExam, setStatusExam] = useState<any>([]);
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
    async function getDataExamResulta() {
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select("*, exams (nama_ujian,status_pengerjaan_siswa,id)");
      setStatusExam(data);
      if (error) {
        toast("data tidak bisa ditampilkan, error");
      }
    }

    getDataExamResulta();
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
                            test.status_exam === true ? (
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
              <h1>Loading ...</h1>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-amber-400 text-center rounded-md py-2 mb-5">
              Hasil Nilai Ujian
            </h1>
            {statusExam.length > 0 ? (
              <table className="border-collapse w-full">
                <thead>
                  <tr className="bg-slate-500 border-2 border-black">
                    <th className="text-slate-100 p-2">Nama Ujian</th>
                    <th className="text-slate-100 p-2">Nilai Ujian</th>
                  </tr>
                </thead>
                {statusExam
                  .flatMap((datas: any) => datas.exams)
                  .map((data: any, i: number) => (
                    <tbody key={i}>
                      <tr className="border-2 border-black">
                        <td className="px-3">
                          {data.status_pengerjaan_siswa.map(
                            (status: any, i: number) =>
                              status.status_exam === true ? (
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
                                <h1 key={i}>{data.nama_ujian}</h1>
                              )
                          )}
                        </td>
                        <td className="px-3">
                          {data.status_pengerjaan_siswa.map(
                            (stat: any, i: number) =>
                              stat.status_exam === true ? (
                                <div key={i}>
                                  <span>{stat.hasil_ujian}</span>
                                </div>
                              ) : (
                                <div key={i}>
                                  <span>Belum Ada Nilai</span>
                                </div>
                              )
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                {/* {statusExam.map((data: any) => (
                  <tbody key={data.id}>
                    <tr className="border-2 border-black">
                      <td className="px-3">
                        {data.status_pengerjaan === true ? (
                          <HoverCard openDelay={200} closeDelay={200}>
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
                          <h1>{data.nama_ujian}</h1>
                        )}
                      </td>
                      <td className="px-3">
                        {data.status_pengerjaan === true ? (
                          <span>{data.hasil_ujian}</span>
                        ) : (
                          <span>Belum Ada Nilai</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))} */}
              </table>
            ) : (
              <h1>Loading ...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
