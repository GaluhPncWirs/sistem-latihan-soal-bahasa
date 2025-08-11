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
import { useGetIdStudent } from "../../hooks/getIdStudent";
import LayoutBodyContent from "@/layout/bodyContent";
import { useGetDataStudent } from "../../hooks/getDataStudent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConvertDate } from "../../hooks/getConvertDate";

export default function DashboardStudent() {
  const [resultExam, setResultExam] = useState<any>([]);
  const getIdStudent = useGetIdStudent();
  const getNameStudent = useGetDataStudent(getIdStudent);

  useEffect(() => {
    if (!getIdStudent) return;
    async function getDataExamResult() {
      const { data: examsData, error: examsError } = await supabase
        .from("exams")
        .select(
          "id,nama_ujian,created_at_exams,questions_exam,account_teacher(fullName)"
        );

      const { data: historyData, error: historyError }: any = await supabase
        .from("history-exam-student")
        .select("*")
        .eq("student_id", getIdStudent);

      if (examsError || historyError) {
        toast("data tidak bisa ditampilkan, error");
        return;
      }

      const mergeDatas = examsData?.map((exam: any) => {
        const histori = historyData.find((h: any) => h.exam_id === exam.id);
        return {
          ...exam,
          hasil_ujian: histori?.hasil_ujian ?? null,
          status_exam: histori?.status_exam ?? false,
          created_at: histori?.created_at ?? null,
        };
      });

      setResultExam(mergeDatas);
    }
    getDataExamResult();
  }, [getIdStudent]);

  const isCompleteExam = resultExam
    .map((isDone: any) => isDone.status_exam === true)
    .filter((complete: any) => complete).length;
  const averageValue = resultExam.map((avg: any) => avg.hasil_ujian);

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
              <div className="text-xl">{isCompleteExam}</div>
            </div>
            <div className="bg-[#6096B4] rounded-lg p-5 font-semibold text-center">
              <h1 className="text-lg">Nilai Rata Rata</h1>
              <div className="text-xl">
                {averageValue.length > 0
                  ? Math.floor(
                      averageValue.reduce(
                        (acc: any, cur: any) => acc + cur,
                        0
                      ) / resultExam.length
                    )
                  : 0}
              </div>
            </div>
            <div className="bg-[#FCE38A] rounded-lg p-5 font-semibold text-center">
              <h1 className="text-lg">Ujian Yang Terjadwal</h1>
              <div className="text-xl">{resultExam.length || "0"}</div>
            </div>
          </div>
          <div className="w-3/4 mx-auto mt-8">
            <div className="mb-7">
              <h1 className="text-xl font-semibold bg-[#0F4C75] text-center rounded-md py-2 mb-5 text-slate-100">
                Jadwal Ujian Yang Tersedia
              </h1>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#3282B8]">
                    <TableHead>No</TableHead>
                    <TableHead>Nama Ujian</TableHead>
                    <TableHead>Waktu Tenggat</TableHead>
                    <TableHead>Guru Pengampu</TableHead>
                    <TableHead>Status Ujian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultExam.length > 0 ? (
                    resultExam.map((data: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{data.nama_ujian}</TableCell>
                        <TableCell>
                          {useConvertDate(data.created_at_exams)}
                        </TableCell>
                        <TableCell>{data.account_teacher.fullName}</TableCell>
                        {data.status_exam === true ? (
                          <TableCell>Complete</TableCell>
                        ) : (
                          <TableCell>
                            <HoverCard openDelay={200} closeDelay={200} key={i}>
                              <HoverCardTrigger asChild>
                                <Link
                                  href={`/Student/Exams/?id=${data.id}`}
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
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        className="text-center text-lg font-bold"
                        colSpan={5}
                      >
                        Belum Ada Ujian
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-[#0F4C75] text-center rounded-md py-2 mb-5 text-slate-100">
                Hasil Nilai Ujian
              </h1>
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
                  {resultExam.length > 0 ? (
                    resultExam.map((item: any, i: number) =>
                      item.status_exam === true ? (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>
                            <HoverCard openDelay={200} closeDelay={200} key={i}>
                              <HoverCardTrigger asChild>
                                <Link
                                  href={`/Student//Dashboard/ResultExam/?id=${item.id}`}
                                  className="hover:underline hover:text-blue-700"
                                >
                                  {item.nama_ujian}
                                </Link>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-fit p-2">
                                <h1 className="font-semibold text-xs">
                                  Lihat Hasil Ujian
                                </h1>
                              </HoverCardContent>
                            </HoverCard>
                          </TableCell>
                          <TableCell>
                            {useConvertDate(item.created_at)}
                          </TableCell>
                          <TableCell>
                            {item.hasil_ujian} Dari{" "}
                            {item.questions_exam.length * 10}
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow key={i}>
                          <TableCell
                            colSpan={4}
                            className="text-center text-lg font-semibold"
                          >
                            Belum Ada Nilai
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        className="text-center text-lg font-bold"
                        colSpan={4}
                      >
                        Belum Ada Nilai
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* {resultExam.length > 0 ? (
                
              ) : (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-stone-300 px-4 py-6 w-full flex gap-5">
                      <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                      <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                    </div>
                  </div>
                ))
              )} */}
            </div>
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
