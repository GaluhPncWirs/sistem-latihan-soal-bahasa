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
  const options: any = { day: "numeric", month: "long", year: "numeric" };
  const formatedDate = new Date(
    getProfileTeacher?.created_at
  ).toLocaleDateString("id-ID", options);

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
    async function historyExams() {
      const { data: dataManageExams, error: errorDataManageExams }: any =
        await supabase
          .from("managed_exams")
          .select("idExams,statusExam,dibuat_tgl,exams(nama_ujian)");
      const { data: dataHistoryExams, error: errorDataHistoryExams }: any =
        await supabase
          .from("history-exam-student")
          .select("exam_id,hasil_ujian,student_id");

      if (errorDataManageExams || errorDataHistoryExams) {
        console.log("data error ditampilkan");
      }

      const result = dataHistoryExams.reduce((acc: any, cur: any) => {
        const found = acc.find((item: any) => item.exam_id === cur.exam_id);
        if (!found) {
          acc.push({
            exam_id: cur.exam_id,
            hasil_ujian: cur.hasil_ujian,
            student_id: [cur.student_id],
          });
        } else {
          found.hasil_ujian += cur.hasil_ujian;
          found.student_id.push(cur.student_id);
        }
        return acc;
      }, []);

      const mergedData = dataManageExams?.map((item: any) => {
        const findIdSame = result.find((f: any) => f.exam_id === item.idExams);
        return {
          ...item,
          hasil_ujian: findIdSame.hasil_ujian,
          student_id: findIdSame.student_id,
        };
      });

      setGetHistoryExams(mergedData);
    }
    historyExams();
  }, []);

  return (
    <LayoutBodyContent>
      <div className="pt-16 flex gap-14">
        <div className="bg-[#71C9CE] bg-gradient-to-t to-[#08D9D6] px-7 pt-10 basis-1/4 pb-5 shadow-lg">
          {/* <Image src="" alt="Profile User" width={300} height={300} /> */}
          <h1 className="text-center my-5">ini buat gambar</h1>
          <ul className="my-7 flex flex-col justify-center gap-3">
            <li>Nama {getProfileTeacher?.fullName}</li>
            <li>Email {getProfileTeacher?.email}</li>
            <li>Peran {getProfileTeacher?.role}</li>
            <li>Mapel yang Diajar </li>
            <li>Tgl Bergabung {formatedDate}</li>
            <li>Status Akun Aktif</li>
          </ul>
          <Button className="px-5 cursor-pointer">Edit Profile</Button>
        </div>
        <div className="mt-16 basis-2/3">
          <div className="flex justify-evenly items-center mb-10">
            <div className="bg-amber-300 p-5 rounded-lg text-center">
              <h1 className="font-semibold text-lg">Total Ujian Dibuat</h1>{" "}
              <span className="font-bold">12</span>
            </div>
            <div className="bg-amber-300 p-5 rounded-lg text-center">
              <h1 className="font-semibold text-lg">Jumlah Siswa Dibimbing</h1>{" "}
              <span className="font-bold">54</span>
            </div>
            <div className="bg-amber-300 p-5 rounded-lg text-center">
              <h1 className="font-semibold text-lg">Nilai Rata-Rata Siswa</h1>{" "}
              <span className="font-bold">4</span>
            </div>
          </div>
          <div className="bg-[#71C9CE] rounded-lg p-7">
            <h1 className="mb-10 text-center text-2xl font-semibold">
              Riwayat Ujian Yang Dibuat
            </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama Ujian</TableHead>
                  <TableHead>Jumlah Siswa</TableHead>
                  <TableHead>Nilai Rata-Rata</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getHistoryExams.length > 0 ? (
                  getHistoryExams.map((item: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.exams?.nama_ujian}</TableCell>
                      <TableCell>{item.student_id.length}</TableCell>
                      <TableCell>
                        {item.student_id.length > 1
                          ? item.hasil_ujian / item.student_id.length
                          : item.hasil_ujian}
                      </TableCell>
                      <TableCell>
                        {new Date(item.dibuat_tgl).toLocaleDateString(
                          "id-ID",
                          options
                        )}
                      </TableCell>
                      <TableCell>
                        {item.statusExam === true ? "Selesai" : "Belum Selesai"}
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
          <Button className="mt-10 px-5 cursor-pointer">Logout</Button>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
