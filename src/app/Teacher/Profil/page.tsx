"use client";
import { useConvertDate } from "@/app/hooks/getConvertDate";
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
import { useEffect, useState } from "react";

export default function TeacherProfile() {
  const [getProfileTeacher, setGetProfileTeacher] = useState<any>([]);
  const [getHistoryExams, setGetHistoryExams] = useState<any>([]);
  const idTeacher = useGetIdTeacher();
  const totalStudent = getHistoryExams?.flatMap((acc: any) => acc.student_id);
  const averageValueExam = getHistoryExams
    ?.flatMap((item: any) => item.hasil_ujian)
    .filter((a: any) => a !== "pending")
    .map((toNum: any) => Number(toNum))
    .reduce((acc: any, cur: any) => acc + cur, 0);

  useEffect(() => {
    if (!idTeacher) return;
    async function dataProfileTeacher() {
      const { data, error }: any = await supabase
        .from("account_teacher")
        .select("*")
        .eq("id_teacher", idTeacher)
        .single();

      if (error) {
        console.log("data error ditampilkan");
      }
      setGetProfileTeacher(data);
    }
    dataProfileTeacher();
  }, [idTeacher]);

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
            "exam_id,hasil_ujian,student_id,kelas,exams(nama_ujian,tipeUjian)"
          );

      if (errorDataManageExams || errorDataHistoryExams) {
        console.log("data error ditampilkan");
      }

      const result = dataHistoryExams?.reduce((acc: any, cur: any) => {
        const found = acc.find(
          (item: any) =>
            item.kelas === cur.kelas && item.exam_id === cur.exam_id
        );
        if (!found) {
          acc.push({
            kelas: cur.kelas,
            // historyStudent: [
            //   {
            //     exam_id: cur.exam_id,
            // nama_ujian: cur.exams.nama_ujian,
            // hasil_ujian: cur.hasil_ujian,
            // tipeUjian: cur.exams.tipeUjian,
            // student_id: cur.student_id,
            //   }
            // ]
            exam_id: cur.exam_id,
            nama_ujian: cur.exams.nama_ujian,
            hasil_ujian: [cur.hasil_ujian],
            tipeUjian: cur.exams.tipeUjian,
            student_id: [cur.student_id],
          });
        } else {
          // found.hasil_ujian += cur.hasil_ujian;
          found.hasil_ujian.push(cur.hasil_ujian);
          // found.tipeUjian.push(cur.exams.tipeUjian);
          found.student_id.push(cur.student_id);
          // found.historyStudent.push({
          //   nama_ujian: cur.exams.nama_ujian,
          //   exam_id: cur.exam_id,
          //   hasil_ujian: cur.hasil_ujian,
          //   tipeUjian: cur.exams.tipeUjian,
          //   student_id: cur.student_id,
          // });
        }
        return acc;
      }, []);

      const mergedData = result?.map((item: any) => {
        const findDetail = dataManageExams.find(
          (f: any) => f.kelas === item.kelas && f.idExams === item.exam_id
        );
        return {
          ...item,
          dibuat_tgl: findDetail?.dibuat_tgl ?? null,
        };
      });

      setGetHistoryExams(mergedData);
    }
    historyExams();
  }, [idTeacher]);

  console.log(getHistoryExams);

  return (
    <LayoutBodyContent>
      <div className="pt-16 flex max-[640px]:flex-col max-[640px]:gap-0 sm:flex-col sm:gap-0 lg:gap-10 md:flex-row">
        <div className="bg-[#71C9CE] bg-gradient-to-t to-[#08D9D6] px-7 pt-10 pb-7 shadow-lg md:w-[33%] lg:basis-1/4">
          {/* <Image src="" alt="Profile User" width={300} height={300} /> */}
          <h1 className="text-center my-5">ini buat gambar</h1>
          <ul className="my-7 flex flex-col justify-center gap-3">
            <li>Nama {getProfileTeacher?.fullName}</li>
            <li>Email {getProfileTeacher?.email}</li>
            <li>Peran {getProfileTeacher?.role}</li>
            <li>Mapel yang Diajar </li>
            <li>
              Tgl Bergabung {useConvertDate(getProfileTeacher?.created_at)}
            </li>
            <li>Status Akun Aktif</li>
          </ul>
          <Button className="px-5 cursor-pointer">Edit Profile</Button>
        </div>
        <div className="max-[640px]:mt-10 sm:mt-10 md:mt-16 md:w-2/3">
          <div className="flex justify-evenly items-center mb-8 max-[640px]:flex-wrap max-[640px]:gap-5">
            <div className="bg-amber-300 max-[640px]:p-2 xl:p-5 rounded-lg text-center sm:p-3">
              <h1 className="font-semibold text-lg">Ujian Selesai</h1>{" "}
              <span className="font-bold">
                {getHistoryExams?.length || "0"}
              </span>
            </div>
            <div className="bg-amber-300 max-[640px]:p-2 xl:p-5 rounded-lg text-center sm:p-3">
              <h1 className="font-semibold text-lg">Jumlah Siswa</h1>{" "}
              <span className="font-bold">{totalStudent.length || "0"}</span>
            </div>
            <div className="bg-amber-300 max-[640px]:p-2 xl:p-5 rounded-lg text-center sm:p-3">
              <h1 className="font-semibold text-lg">Nilai Rata-Rata</h1>{" "}
              <span className="font-bold">
                {Math.floor(averageValueExam / totalStudent?.length) || "0"}
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
                      <TableCell>{item.student_id.length}</TableCell>
                      <TableCell>Undefined</TableCell>
                      <TableCell>{item.kelas}</TableCell>
                      <TableCell>{item.dibuat_tgl}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-lg font-semibold"
                    >
                      Belum Ada History
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Button className="mt-7 px-5 cursor-pointer max-[640px]:mx-7 sm:mx-5">
            Logout
          </Button>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
