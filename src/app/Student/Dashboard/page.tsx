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
  const [scheduleExams, setScheduleExams] = useState<any>([]);
  const getIdStudent = useGetIdStudent();
  const getDataStudent = useGetDataStudent(getIdStudent);

  useEffect(() => {
    if (!getDataStudent?.classes || !getIdStudent) return;
    async function getDataExamResult() {
      const { data: examsData, error: examsError } = await supabase
        .from("managed_exams")
        .select("*,account_teacher(fullName),exams(nama_ujian,questions_exam)")
        .eq("kelas", getDataStudent?.classes);

      const { data: historyDataExams, error: historyDataError }: any =
        await supabase
          .from("history-exam-student")
          .select("student_id,exam_id,status_exam,created_at,hasil_ujian")
          .eq("student_id", getIdStudent);

      if (examsError || historyDataError) {
        toast("data tidak bisa ditampilkan, error");
        return;
      }

      const mergedDataScheduleExams = examsData.map((item: any) => {
        const finds = historyDataExams.find(
          (f: any) => f.exam_id === item.idExams
        );
        return {
          ...item,
          status_exam: finds?.status_exam ?? null,
          student_id: finds?.student_id ?? null,
          created_at_historyExams: finds?.created_at ?? null,
          hasil_ujian: finds?.hasil_ujian ?? null,
        };
      });

      setScheduleExams(mergedDataScheduleExams);
    }
    getDataExamResult();
  }, [getDataStudent?.classes, getIdStudent]);

  const averageValue = Math.floor(
    scheduleExams
      .map((avg: any) => avg.hasil_ujian)
      .reduce((acc: any, cur: any) => acc + cur, 0)
  );
  const isCompleteExam = scheduleExams
    .map((isDone: any) => isDone.status_exam === true)
    .filter((complete: any) => complete).length;

  // function deadline(deadlineExams: any) {
  //   const dateNow = new Date();

  // console.log("unutk bulan", new Date().getMonth());
  // console.log("unutk hari", new Date().getDate());
  // console.log("unutk jam", new Date().getHours());
  // console.log("unutk menit", new Date().getMinutes());
  //   // if(dateNow deadlineExams)
  // }

  // console.log(new Date().toUTCString());

  return (
    <LayoutBodyContent>
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        <div className="w-10/12 mx-auto pt-32 max-[640px]:w-11/12 max-[640px]:pt-28">
          <div className="mb-7">
            <h1 className="text-2xl font-bold mb-3">
              Halo, Selamat Datang {getDataStudent?.fullName}
            </h1>
            <p className="text-lg">
              Berikut ringkasan aktivitas dan ujian Anda.
            </p>
          </div>
          <div className="flex justify-evenly items-center mt-10">
            <div className="bg-[#FCE38A] rounded-lg p-5 font-semibold text-center max-[640px]:p-3">
              <h1 className="text-lg max-[640px]:text-base">Ujian Terjadwal</h1>
              <div className="text-xl">{scheduleExams.length || "0"}</div>
            </div>
            <div className="bg-[#6096B4] rounded-lg p-5 font-semibold text-center max-[640px]:p-3">
              <h1 className="text-lg max-[640px]:text-base">Nilai Rata Rata</h1>
              <div className="text-xl">
                {averageValue / isCompleteExam || "0"}
              </div>
            </div>
          </div>
          <div className="mx-auto mt-8 max-[640px]:w-11/12 sm:w-11/12 md:w-3/4">
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
                  {scheduleExams.length > 0 ? (
                    scheduleExams.map((data: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{data.exams.nama_ujian}</TableCell>
                        <TableCell>
                          {data.dibuat_tgl} {data.tenggat_waktu}
                        </TableCell>
                        <TableCell>{data.account_teacher.fullName}</TableCell>
                        {data.status_exam === true ? (
                          <TableCell>Complete</TableCell>
                        ) : (
                          <TableCell>
                            <HoverCard openDelay={200} closeDelay={200} key={i}>
                              <HoverCardTrigger asChild>
                                <Link
                                  href={`/Student/Exams/?id=${data.idExams}`}
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
                Hasil Ujian
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
                  {scheduleExams.length > 0 ? (
                    scheduleExams.map((item: any, i: number) =>
                      item.status_exam === true ? (
                        <TableRow key={i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>
                            <HoverCard openDelay={200} closeDelay={200} key={i}>
                              <HoverCardTrigger asChild>
                                <Link
                                  href={`/Student/Dashboard/ResultExam/?id=${item.idExams}`}
                                  className="hover:underline hover:text-blue-700"
                                >
                                  {item.exams.nama_ujian}
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
                            {useConvertDate(item.created_at_historyExams)}
                          </TableCell>
                          <TableCell>
                            {item.hasil_ujian} Dari{" "}
                            {item.exams.questions_exam.length * 10}
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
