"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/data";
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
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import HeaderDasboard from "@/components/forDasboard/headerDashboard";
import { useDataScheduleExams } from "@/app/hooks/getScheduleExams";

export default function DashboardStudent() {
  const scheduleExams = useDataScheduleExams();
  const getIdStudent = useGetIdStudent();
  const getDataStudent = useGetDataStudent(getIdStudent);
  const { push } = useRouter();
  const processedLateExams = useRef<Set<string>>(new Set());
  const [confirm, setConfirm] = useState<number>(0);
  const [accepted, setAccepted] = useState<boolean>(false);
  const isLocationPage = usePathname();

  const filterScoreExams = scheduleExams.filter(
    (avg: any) =>
      avg.status_exam === true &&
      avg.hasil_ujian !== "pending" &&
      avg.hasil_ujian !== "telat"
  );

  const averageValue =
    filterScoreExams
      .map((values: any) => Number(values.hasil_ujian))
      .reduce((acc: any, cur: any) => acc + cur, 0) / filterScoreExams.length;

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

  async function lateExams(idUjian: number) {
    const { data: historyExams, error: errHistoryExams }: any = await supabase
      .from("history-exam-student")
      .select("hasil_ujian,exam_id")
      .eq("hasil_ujian", "telat")
      .eq("exam_id", idUjian);

    if (historyExams?.length > 0) {
      return;
    } else if (errHistoryExams) {
      console.log("Gagal Simpan Data");
    } else {
      const payload = {
        created_at: new Date().toISOString(),
        student_id: getIdStudent,
        exam_id: Number(idUjian),
        answer_student: null,
        hasil_ujian: "telat",
        status_exam: true,
        kelas: getDataStudent?.classes,
      };
      const { error } = await supabase
        .from("history-exam-student")
        .insert(payload);
      if (error) {
        console.log("Gagal Simpan Data");
      }
    }
  }

  async function handleLateExam(idUjian: number, student_id: string) {
    const key = `${idUjian}-${student_id}`;
    if (!processedLateExams.current.has(key)) {
      processedLateExams.current.add(key);
      await lateExams(idUjian);
    }
  }

  function convertDateToISO(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const resultConvert = `${year}-${month}-${day}`;
    return new Date(resultConvert + "T00:00:00").getTime();
  }

  function convertToNumber(tenggat_waktu: string) {
    const [startTimeExam, endTimeExams] = tenggat_waktu
      .split("-")
      .map((item: any) => item.trim());
    return [toMinute(startTimeExam), toMinute(endTimeExams)];
  }

  function getExamsStatusAndHandleLateExam(
    tenggat_waktu: string,
    nama_ujian: string,
    idUjian: number,
    tgl_ujian: string
  ) {
    const startAndEndExams = convertToNumber(tenggat_waktu);

    const mulaiUjian = startAndEndExams[0];
    const akhirUjian = startAndEndExams[1];
    const hariIni = toMinute(waktuDurasiIni);

    let messageExams = "";

    if (tgl_ujian === waktuHariIni) {
      if (hariIni < mulaiUjian) {
        messageExams += "Ujian Belum Dimulai";
      } else if (hariIni > akhirUjian) {
        messageExams += "Ujian Telah Lewat Batas Waktu";
        handleLateExam(idUjian, getIdStudent);
      } else {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="hover:underline hover:text-blue-700 cursor-pointer"
                onClick={() => setAccepted(true)}
              >
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
                  Persiapkan Diri Anda Dikarenakan Jika Sudah Masuk Kedalam
                  Halaman Ujian Maka Sudah Tidak Bisa Kembali Lagi.
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
                        `/Student/Exams/StartExam?idExams=${idUjian}&idStudent=${getIdStudent}`
                      )
                    }
                    className="cursor-pointer"
                    disabled={accepted}
                  >
                    {confirm <= 0 ? "Oke" : confirm}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        );
      }
    } else if (convertDateToISO(tgl_ujian) > convertDateToISO(waktuHariIni)) {
      messageExams += "Ujian Belum Dimulai";
    } else {
      messageExams += "Ujian Telah Lewat Batas Waktu";
      handleLateExam(idUjian, getIdStudent);
    }
    return messageExams;
  }

  const isComingSoonExams = scheduleExams.filter(
    (fil: any) => fil.status_exam !== true && fil.dibuat_tgl === waktuHariIni
  );

  function deadlineUjianTercepatHariIni() {
    const hariIni = toMinute(waktuDurasiIni);
    const validExams = isComingSoonExams.filter((exam: any) => {
      const filterScheduleExam = convertToNumber(exam.tenggat_waktu);
      return hariIni > filterScheduleExam[0] && hariIni < filterScheduleExam[1];
    });

    if (validExams.length === 0) {
      return null;
    }

    return validExams.reduce((closestExam: any, currentExam: any) => {
      const closestDeadline = convertToNumber(closestExam.tenggat_waktu)[0];
      const currentDeadline = convertToNumber(currentExam.tenggat_waktu)[0];
      return Math.abs(currentDeadline - toMinute(waktuDurasiIni)) <
        Math.abs(closestDeadline - toMinute(waktuDurasiIni))
        ? currentExam
        : closestExam;
    });
  }

  useEffect(() => {
    if (accepted) {
      setConfirm(5);
      const timer = setInterval(() => {
        setConfirm((prev: any) => {
          if (prev <= 0) {
            clearInterval(timer);
            setAccepted(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [accepted]);

  return (
    <LayoutBodyContent isLocationPage={isLocationPage}>
      {scheduleExams.length > 0 ? (
        <>
          <HeaderDasboard
            user="Siswa"
            fullName={getDataStudent?.fullName}
            isLocationPage={isLocationPage}
          />
          <div className="mt-5">
            <p className="text-2xl font-semibold">
              Berikut Ringkasan Ujian Anda
            </p>
            <div className="mt-8">
              <div className="flex justify-around items-center">
                <div className="bg-[#3396D3] rounded-lg p-5 font-semibold flex flex-col justify-center items-center gap-y-2 w-44 shadow-md shadow-slate-700">
                  <Image
                    src="/img/dashboardStudent/schedule.png"
                    alt="Jadwal"
                    width={300}
                    height={300}
                    className="size-9"
                  />
                  <h1 className="text-lg">Ujian Terjadwal</h1>
                  <span className="text-xl">
                    {scheduleExams.filter(
                      (done: any) => done.status_exam !== true
                    ).length || "0"}
                  </span>
                </div>
                <div className="bg-[#3396D3] rounded-lg p-5 font-semibold flex flex-col justify-center items-center gap-y-2 w-44 shadow-md shadow-slate-700">
                  <Image
                    src="/img/dashboardStudent/average.png"
                    alt="Average"
                    width={300}
                    height={300}
                    className="size-9"
                  />
                  <h1 className="text-lg">Nilai Rata Rata</h1>
                  <span className="text-xl">
                    {Math.round(averageValue) || "0"}
                  </span>
                </div>
              </div>
              <div className="mt-10">
                {deadlineUjianTercepatHariIni() !== null && (
                  <>
                    <h1 className="text-xl font-semibold mb-4">
                      Ujian Yang Waktu Tenggatnya Akan Habis
                    </h1>
                    <div className="bg-sky-300 flex justify-between gap-x-3 p-5 items-center rounded-xl shadow-md shadow-slate-600">
                      <div className="flex justify-center items-center gap-x-5">
                        <Image
                          src="/img/dashboardStudent/notification.png"
                          alt="Notifikasi"
                          width={300}
                          height={300}
                          className="w-[12%]"
                        />
                        <div>
                          <h1 className="text-2xl font-semibold mb-2">
                            {deadlineUjianTercepatHariIni()?.exams.nama_ujian}
                          </h1>
                          <p className="text-sm font-medium">
                            {`${
                              deadlineUjianTercepatHariIni()?.dibuat_tgl
                            } di Jam ${
                              deadlineUjianTercepatHariIni()?.tenggat_waktu
                            }`}
                          </p>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="cursor-pointer text-base font-semibold px-5"
                            variant="secondary"
                            onClick={() => setAccepted(true)}
                          >
                            Mulai
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="mb-2">
                              Konfirmasi Masuk Ujian
                            </DialogTitle>
                            <DialogDescription className="text-start">
                              Apakah Anda Yakin ingin Mengerjakan Soal{" "}
                              <span className="font-bold">
                                "
                                {deadlineUjianTercepatHariIni()?.exams
                                  .nama_ujian || ""}
                                "
                              </span>{" "}
                              Ini ? Persiapkan Diri Anda Dikarenakan Jika Sudah
                              Masuk Kedalam Halaman Ujian Maka Sudah Tidak Bisa
                              Kembali Lagi.
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                onClick={() => setAccepted(false)}
                              >
                                Batal
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                onClick={() =>
                                  push(
                                    `/Student/Exams/StartExam?idExams=${
                                      deadlineUjianTercepatHariIni().idExams
                                    }&idStudent=${getIdStudent}`
                                  )
                                }
                                className="cursor-pointer"
                                disabled={accepted}
                              >
                                {confirm <= 0 ? "Oke" : confirm}
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
                <div className="mt-8">
                  <div className="mb-7">
                    <div className="font-semibold bg-[#0F4C75] rounded-md py-3 mb-5 text-slate-200 flex items-center justify-between px-5 lg:px-7">
                      <span className="text-xl">Ujian Tersedia</span>
                      <div className="flex">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <Image
                            src="/img/dashboardStudent/right.png"
                            alt="Arrow Right"
                            width={500}
                            height={500}
                            className="size-8"
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
                              <TableCell>
                                {data.account_teacher.fullName}
                              </TableCell>
                              <TableCell>
                                {data.status_exam === true &&
                                data.hasil_ujian !== "telat"
                                  ? "Selesai"
                                  : data.status_exam === true &&
                                    data.hasil_ujian === "telat"
                                  ? "Telat"
                                  : getExamsStatusAndHandleLateExam(
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
                    <div className="font-semibold bg-[#0F4C75] rounded-md py-3 mb-5 text-slate-200 flex items-center flex-row-reverse justify-between px-5 lg:px-7">
                      <span className="text-xl text-end">Nilai Terakhir</span>
                      <div className="flex">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <Image
                            src="/img/dashboardStudent/left.png"
                            alt="Arrow Right"
                            width={500}
                            height={500}
                            className="size-8"
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
                            item.status_exam === true &&
                            item.hasil_ujian !== "telat" ? (
                              <TableRow key={i}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>
                                  <HoverCard
                                    openDelay={200}
                                    closeDelay={200}
                                    key={i}
                                  >
                                    <HoverCardTrigger asChild>
                                      <Link
                                        href={`/Student/Dashboard/ResultExam/?id=${item.idExams}&idStudent=${getIdStudent}`}
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
                                  {useConvertDate(
                                    item.created_at_historyExams,
                                    {
                                      minute: "numeric",
                                      hour: "numeric",
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )}
                                </TableCell>
                                <TableCell>
                                  {item.hasil_ujian !== "telat"
                                    ? item.tipe_ujian === "pg"
                                      ? `${item.hasil_ujian} Dari 100`
                                      : `${item.hasil_ujian} ${
                                          item.hasil_ujian !== "pending"
                                            ? "Dari 100"
                                            : ""
                                        }`
                                    : "Tidak Ada Nilai"}
                                </TableCell>
                              </TableRow>
                            ) : getExamsStatusAndHandleLateExam(
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
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-7 max-[640px]:w-1/2 bg-slate-500 animate-pulse rounded-md"></div>
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
            <div className="w-full mt-8">
              <div className="flex justify-around items-center">
                <div className="bg-slate-500 animate-pulse w-1/5 max-[640px]:w-1/3 rounded-lg p-5 max-[640px]:p-3 flex flex-col justify-center items-center gap-y-2">
                  <div className="w-3/4 h-6 bg-slate-400 animate-pulse rounded-md"></div>
                  <div className="w-10/12 h-6 bg-slate-400 animate-pulse rounded-md"></div>
                  <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md"></div>
                </div>
                <div className="bg-slate-500 animate-pulse w-1/5 max-[640px]:w-1/3 rounded-lg p-5 max-[640px]:p-3 flex flex-col justify-center items-center gap-y-2">
                  <div className="w-3/4 h-6 bg-slate-400 animate-pulse rounded-md"></div>
                  <div className="w-10/12  h-6 bg-slate-400 animate-pulse rounded-md"></div>
                  <div className="w-1/2 h-6 bg-slate-400 animate-pulse rounded-md"></div>
                </div>
              </div>
              <div className="mt-10">
                <div className="mb-7">
                  <div className="bg-slate-500 animate-pulse rounded-md py-3 mb-5 flex items-center max-[640px]:pl-0 max-[640px]:py-2 justify-center">
                    <span className="max-[640px]:basis-1/2 sm:basis-2/5 h-5 bg-slate-500 animate-pulse rounded-md"></span>
                  </div>
                  <div className="w-full rounded-md">
                    <div className="bg-slate-500 animate-pulse w-2/3 h-6 rounded-md mb-1"></div>
                    <div className="bg-slate-500 animate-pulse w-1/2 h-6 rounded-md mb-1"></div>
                    <div className="bg-slate-500 animate-pulse w-3/4 h-6 rounded-md mb-1"></div>
                    <div className="bg-slate-500 animate-pulse w-1/3 h-6 rounded-md mb-1"></div>
                  </div>
                  <div className="bg-slate-500 animate-pulse rounded-md mt-10 py-3 mb-5 flex items-center max-[640px]:pl-0 max-[640px]:py-2 justify-center">
                    <span className="max-[640px]:basis-1/2 sm:basis-2/5 h-5 bg-slate-500 animate-pulse rounded-md"></span>
                  </div>
                  <div className="w-full rounded-md">
                    <div className="bg-slate-500 animate-pulse w-2/3 h-6 rounded-md mb-1"></div>
                    <div className="bg-slate-500 animate-pulse w-1/2 h-6 rounded-md mb-1"></div>
                    <div className="bg-slate-500 animate-pulse w-3/4 h-6 rounded-md mb-1"></div>
                    <div className="bg-slate-500 animate-pulse w-1/3 h-6 rounded-md mb-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </LayoutBodyContent>
  );
}
