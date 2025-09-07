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
import Image from "next/image";

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
          .select("exam_id,status_exam,created_at,hasil_ujian")
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
                Sedang Berlangsung
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
                    onClick={() =>
                      push(
                        `/Student/Exams?idExams=${idUjian}&idStudent=${getIdStudent}`
                      )
                    }
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
    } else if (tgl_ujian !== waktuHariIni && hariIni > mulaiUjian) {
      messageExams += "Ujian Belum Dimulai";
    } else {
      messageExams += "Ujian Telah Lewat Batas Waktu";
    }
    return messageExams;
  }

  return (
    <LayoutBodyContent>
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        <div className="w-10/12 mx-auto pt-32 max-[640px]:w-11/12 max-[640px]:pt-28">
          <div className="mb-7">
            <h1 className="text-3xl max-[640px]:text-2xl font-bold mb-3">
              Halo, Selamat Datang {getDataStudent?.fullName}
            </h1>
            <p className="max-[640px]:text-lg text-xl">
              Berikut ringkasan aktivitas dan ujian Anda.
            </p>
          </div>
          <div className="flex justify-evenly items-center mt-10">
            <div className="bg-[#3D74B6] text-slate-100 rounded-lg p-4 font-semibold max-[640px]:p-3 flex flex-col justify-center items-center gap-y-1">
              <Image
                src="/img/dashboardStudent/schedule.png"
                alt="Jadwal"
                width={300}
                height={300}
                className="w-1/4"
              />
              <h1 className="text-lg max-[640px]:text-base">Ujian Terjadwal</h1>
              <span className="text-xl">
                {scheduleExams.filter((done: any) => done.status_exam !== true)
                  .length || "0"}
              </span>
            </div>
            <div className="bg-[#3D74B6] text-slate-100 rounded-lg p-4 font-semibold max-[640px]:p-3 flex flex-col justify-center items-center gap-y-1">
              <Image
                src="/img/dashboardStudent/average.png"
                alt="Average"
                width={300}
                height={300}
                className="w-1/4"
              />
              <h1 className="text-lg max-[640px]:text-base">Nilai Rata Rata</h1>
              <span className="text-xl">
                {Math.floor(averageValue / isCompleteExam) || "0"}
              </span>
            </div>
          </div>
          <div className="mx-auto mt-8 max-[640px]:w-11/12 sm:w-11/12 md:w-10/12 lg:w-3/4">
            <div className="mb-7">
              <div className="font-semibold bg-[#0F4C75] rounded-md py-3 mb-5 text-slate-200 flex items-center max-[640px]:pl-0 max-[640px]:py-2 justify-center">
                <span className="max-[640px]:basis-1/2 max-[640px]:text-base sm:text-xl sm:basis-2/5">
                  Jadwal Ujian Tersedia
                </span>
                <div className="max-[640px]:basis-1/3 flex sm:basis-1/2 justify-end">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Image
                      src="/img/dashboardStudent/right.png"
                      alt="Arrow Right"
                      width={500}
                      height={500}
                      className="max-[640px]:w-1/6 sm:w-[13%] lg:w-1/12"
                      key={i}
                    />
                  ))}
                </div>
              </div>
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
              <div className="font-semibold bg-[#0F4C75] rounded-md py-3 mb-5 text-slate-200 flex flex-row-reverse max-[640px]:gap-x-3 sm:gap-x-0 items-center max-[640px]:py-2 justify-center">
                <span className="max-[640px]:basis-1/2 max-[640px]:text-base sm:text-xl text-end sm:basis-2/5">
                  Hasil Ujian Kamu
                </span>
                <div className="max-[640px]:basis-1/3 flex sm:basis-1/2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Image
                      src="/img/dashboardStudent/left.png"
                      alt="Arrow Right"
                      width={500}
                      height={500}
                      className="max-[640px]:w-1/6 sm:w-[13%] lg:w-1/12"
                      key={i}
                    />
                  ))}
                </div>
              </div>
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
