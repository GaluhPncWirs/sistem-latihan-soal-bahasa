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
      <div className="pt-24 w-3/4 mx-auto">
        <h1 className="text-4xl font-bold mb-8 mt-7">Profil Guru</h1>
        <div className="flex justify-center items-center gap-7 mb-5">
          <Image
            src="/img/profile/userProfile.png"
            alt="Profile User"
            width={300}
            height={300}
            className="rounded-full w-1/5"
          />
          <div className="basis-1/2">
            <h1 className="text-5xl capitalize mb-2 font-semibold">
              {getProfileTeacher?.fullName}
            </h1>
            <p className="font-medium">Matematika - Bahasa Indonesia</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-lg p-5">
            Edit Profil
          </Button>
        </div>
        <div className="mb-5">
          <div className="flex items-center mb-5 gap-3">
            <Image
              src="/img/profileTeacher/account.png"
              alt="Informasi Akun"
              width={200}
              height={200}
              className="w-[4%]"
            />
            <h1 className="text-2xl font-semibold">Informasi Akun</h1>
          </div>
          <Table>
            <TableBody>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">Email</TableCell>
                <TableCell className="text-base font-medium">
                  {getProfileTeacher?.email || ""}
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">
                  Tanggal Bergabung
                </TableCell>
                <TableCell className="text-base font-medium">
                  {useConvertDate(getProfileTeacher?.created_at, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }) || ""}
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">
                  No Telepon
                </TableCell>
                <TableCell className="text-base font-medium">
                  0898-2346-1232
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">Peran</TableCell>
                <TableCell className="text-base font-medium">
                  {getProfileTeacher?.role}
                </TableCell>
              </TableRow>
              <TableRow className="border-black">
                <TableCell className="text-base font-medium">
                  Status Akun
                </TableCell>
                <TableCell className="text-base font-medium">Aktif</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Image
              src="/img/profileTeacher/history.png"
              alt="History"
              width={200}
              height={200}
              className="w-[4%]"
            />
            <h1 className="text-2xl font-semibold">
              Riwayat Ujian Yang Dibuat
            </h1>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-[#3282B8]">
                <TableHead className="text-center text-base font-semibold">
                  No
                </TableHead>
                <TableHead className="text-center text-base font-semibold">
                  Nama Ujian
                </TableHead>
                <TableHead className="text-center text-base font-semibold">
                  Jumlah Siswa
                </TableHead>
                <TableHead className="text-center text-base font-semibold">
                  Nilai Rata-Rata
                </TableHead>
                <TableHead className="text-center text-base font-semibold">
                  Kelas
                </TableHead>
                <TableHead className="text-center text-base font-semibold">
                  Tanggal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getHistoryExams?.length > 0 ? (
                getHistoryExams?.map((item: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="text-center font-semibold">
                      {i + 1}
                    </TableCell>
                    <TableCell>{item.nama_ujian}</TableCell>
                    <TableCell className="text-center">
                      {item.student_id?.length}
                    </TableCell>
                    <TableCell className="text-center">
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
                    <TableCell className="text-center">{item.kelas}</TableCell>
                    <TableCell className="text-center">
                      {item.dibuat_tgl}
                    </TableCell>
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
    </LayoutBodyContent>
  );
}
