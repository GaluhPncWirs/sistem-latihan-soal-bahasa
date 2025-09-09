"use client";
import { useConvertDate } from "@/app/hooks/getConvertDate";
import { useGetDataTeacher } from "@/app/hooks/getDataTeacher";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
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
import { supabase } from "@/lib/supabase/data";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TeacherProfile() {
  const idTeacher = useGetIdTeacher();
  const [getHistoryExams, setGetHistoryExams] = useState<any>([]);
  const getProfileTeacher = useGetDataTeacher(idTeacher);
  const totalStudent = getHistoryExams?.flatMap((acc: any) => acc.student_id);
  const averageValueExam = getHistoryExams
    ?.flatMap((item: any) => item.hasil_ujian)
    .filter((a: any) => a !== "pending" && a !== "telat")
    .map((toNum: any) => Number(toNum))
    .reduce((acc: any, cur: any) => acc + cur, 0);

  useEffect(() => {
    if (!idTeacher) return;
    async function historyExams() {
      const { data: dataManageExams, error: errorDataManageExams }: any =
        await supabase
          .from("managed_exams")
          .select("kelas,dibuat_tgl,id_Teacher,idExams")
          .eq("id_Teacher", idTeacher);
      const { data: dataHistoryExams, error: errorDataHistoryExams }: any =
        await supabase
          .from("history-exam-student")
          .select(
            "exam_id,hasil_ujian,student_id,kelas,exams(nama_ujian,tipeUjian,idTeacher)"
          )
          .eq("exams.idTeacher", idTeacher);

      if (errorDataManageExams || errorDataHistoryExams) {
        console.log("data error ditampilkan");
      }

      const fillterNotNull = dataHistoryExams.filter(
        (data: any) => data.exams !== null
      );

      const result = fillterNotNull?.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (item: any) =>
            item.kelas === cur.kelas && item.exam_id === cur.exam_id
        );
        if (!found) {
          acc.push({
            kelas: cur.kelas,
            exam_id: cur.exam_id,
            nama_ujian: cur.exams.nama_ujian,
            tipeUjian: cur.exams.tipeUjian,
            hasil_ujian: [cur.hasil_ujian],
            student_id: [cur.student_id],
          });
        } else {
          found.hasil_ujian.push(cur.hasil_ujian);
          found.student_id.push(cur.student_id);
        }
        return acc;
      }, []);

      const mergedData = result?.map((item: any) => {
        const findDetail = dataManageExams.find(
          (f: any) => f.kelas === item.kelas && f.idExams === item.exam_id
        );
        return {
          ...item,
          ...findDetail,
        };
      });

      setGetHistoryExams(mergedData);
    }
    historyExams();
  }, [idTeacher]);

  return (
    <LayoutBodyContent>
      <div className="pt-16 flex max-[640px]:flex-col max-[640px]:gap-0 sm:flex-col sm:gap-0 lg:gap-10 md:flex-row">
        <div className="bg-[#71C9CE] bg-gradient-to-t to-[#08D9D6] px-7 pt-10 pb-7 shadow-lg md:w-[33%] lg:basis-1/4 flex flex-col items-center">
          <Image
            src="/img/profile/userProfile.png"
            alt="Profile User"
            width={300}
            height={300}
            className="rounded-full w-1/2"
          />
          <ul className="my-7 flex flex-col justify-center gap-3">
            <li>Nama {getProfileTeacher?.fullName}</li>
            <li>Email {getProfileTeacher?.email}</li>
            <li>Peran {getProfileTeacher?.role}</li>
            <li>Mapel yang Diajar</li>
            <li>
              Tgl Bergabung{" "}
              {useConvertDate(getProfileTeacher?.created_at, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </li>
            <li>Status Akun Aktif</li>
          </ul>
        </div>
        <div className="max-[640px]:mt-10 sm:mt-10 md:mt-16 md:w-2/3">
          <div className="flex justify-evenly items-center mb-8 max-[640px]:flex-wrap max-[640px]:gap-5">
            <div className="bg-[#3D74B6] text-slate-200 max-[640px]:p-2 xl:p-5 rounded-lg sm:p-3 flex flex-col items-center gap-y-1">
              <Image
                src="/img/profileTeacher/done.png"
                alt="Selesai"
                width={200}
                height={200}
                className="w-1/3"
              />
              <h1 className="font-semibold text-lg">Ujian Selesai</h1>{" "}
              <span className="font-bold text-xl">
                {getHistoryExams?.length || "0"}
              </span>
            </div>
            <div className="bg-[#3D74B6] text-slate-200 max-[640px]:p-2 xl:p-5 rounded-lg sm:p-3 flex flex-col items-center gap-y-1">
              <Image
                src="/img/profileTeacher/count.png"
                alt="Jumlah"
                width={200}
                height={200}
                className="w-1/3"
              />
              <h1 className="font-semibold text-lg">Jumlah Siswa</h1>{" "}
              <span className="font-bold text-xl">
                {new Set(totalStudent).size || "0"}
              </span>
            </div>
            <div className="bg-[#3D74B6] text-slate-200 max-[640px]:p-2 xl:p-5 rounded-lg sm:p-3 flex flex-col items-center gap-y-1">
              <Image
                src="/img/profileTeacher/average.png"
                alt="Rata-Rata"
                width={200}
                height={200}
                className="w-1/4"
              />
              <h1 className="font-semibold text-lg">Nilai Rata-Rata</h1>{" "}
              <span className="font-bold text-xl">
                {Math.floor(averageValueExam / new Set(totalStudent).size) ||
                  "0"}
              </span>
            </div>
          </div>
          <div className="px-5">
            <h1 className="mb-10 text-center text-2xl font-semibold">
              Riwayat Ujian Yang Dibuat
            </h1>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#3282B8]">
                  <TableHead>No</TableHead>
                  <TableHead>Nama Ujian</TableHead>
                  <TableHead>Jumlah Siswa</TableHead>
                  <TableHead>Nilai Rata-Rata</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getHistoryExams?.length > 0 ? (
                  getHistoryExams?.map((item: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.nama_ujian}</TableCell>
                      <TableCell>{item.student_id?.length}</TableCell>
                      <TableCell>
                        {item.tipeUjian === "pg"
                          ? Math.floor(
                              item.hasil_ujian
                                .map(Number)
                                .reduce((acc: any, cur: any) => acc + cur, 0) /
                                item.student_id.length
                            )
                          : item.hasil_ujian
                              .filter(
                                (f: any) => f !== "pending" && f !== "telat"
                              )
                              .map(Number)
                              .reduce((acc: any, cur: any) => acc + cur, 0) /
                            item.hasil_ujian.filter((f: any) => f !== "pending")
                              .length}
                      </TableCell>
                      <TableCell>{item.kelas}</TableCell>
                      <TableCell>{item.dibuat_tgl}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-lg font-semibold"
                    >
                      Belum Ada History
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
