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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardStudent() {
  const [scheduleExams, setScheduleExams] = useState<any>([]);
  const getIdStudent = useGetIdStudent();
  const getDataStudent = useGetDataStudent(getIdStudent);
  const { push } = useRouter();

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

  const averageValue = scheduleExams
    .filter(
      (avg: any) => avg.status_exam === true && avg.hasil_ujian !== "pending"
    )
    .map((values: any) => Number(values.hasil_ujian))
    .reduce((acc: any, cur: any) => acc + cur, 0);

  const isCompleteExam = scheduleExams
    .map((isDone: any) => isDone.status_exam === true)
    .filter((complete: any) => complete).length;

  // untuk fitur deadline
  const waktuHariIni = useConvertDate(new Date().toISOString(), {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .split(" ")
    .slice(0, 3)
    .join(" ");

  const waktuDurasiIni = useConvertDate(new Date().toISOString(), {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .split(" ")
    .slice(4, 5)
    .join(" ");

  function toMinute(val: any) {
    const deleteDot = val.replace(/[:.]/g, "-");
    const [hoursStr, minuteStr = "0"] = deleteDot.split("-").map(Number);
    return hoursStr * 60 + minuteStr;
  }

  function resultDeadlineExam(
    tenggat_waktu: string,
    nama_ujian: string,
    idUjian: number,
    tgl_ujian: string
  ) {
    const [startTimeExam, endTimeExams] = tenggat_waktu
      .split("-")
      .map((item: any) => item.trim());

    const mulaiUjian = toMinute(startTimeExam);
    const akhirUjian = toMinute(endTimeExams);
    const hariIni = toMinute(waktuDurasiIni);

    let messageExams = "";

    if (tgl_ujian === waktuHariIni) {
      if (hariIni < mulaiUjian) {
        messageExams += "Ujian Belum Dimulai";
      } else if (hariIni > akhirUjian) {
        messageExams += "Ujian Telah Lewat Batas Waktu";
      } else {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button className="hover:underline hover:text-blue-700 cursor-pointer">
                Uncomplete
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-2">
                  Konfirmasi Masuk Ujian
                </DialogTitle>
                <DialogDescription>
                  Apakah Anda Yakin ingin Mengerjakan Soal{" "}
                  <span className="font-bold">"{nama_ujian}"</span> Ini ?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={() => push(`/Student/Exams/?id=${idUjian}`)}
                    className="cursor-pointer"
                  >
                    Oke
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      }
    } else {
      messageExams += "Ujian Telah Lewat Batas Waktu";
    }
    return messageExams;
  }

  // console.log(isMessage);

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
                {Math.floor(averageValue / isCompleteExam) || "0"}
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

                        <TableCell>
                          {data.status_exam === true
                            ? "Complete"
                            : resultDeadlineExam(
                                data.tenggat_waktu,
                                data.exams.nama_ujian,
                                data.idExams,
                                data.dibuat_tgl
                              )}
                        </TableCell>
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
                            {useConvertDate(item.created_at_historyExams, {
                              minute: "numeric",
                              hour: "numeric",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell>
                            {item.tipe_ujian === "pg"
                              ? `${item.hasil_ujian} Dari ${
                                  item.exams.questions_exam.length * 10
                                }`
                              : `${item.hasil_ujian} ${
                                  item.hasil_ujian !== "pending"
                                    ? "Dari 100"
                                    : ""
                                }`}
                          </TableCell>
                        </TableRow>
                      ) : resultDeadlineExam(
                          item.tenggat_waktu,
                          item.exams.nama_ujian,
                          item.idExams,
                          item.dibuat_tgl
                        ) === "Ujian Telah Lewat Batas Waktu" ? (
                        <TableRow key={i}>
                          <TableCell
                            colSpan={4}
                            className="text-center text-lg font-semibold"
                          >
                            Tidak Ada Nilai (Ujian Telat)
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
            </div>
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
