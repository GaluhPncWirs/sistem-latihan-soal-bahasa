"use client";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
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
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select("*, exams(nama_ujian)");

      if (error) {
        console.log("data error ditampilkan");
      }

      // const tes = data.map((a: any) => a.student_id);

      // console.log(new Set(tes));

      setGetHistoryExams(data);
    }
    historyExams();
  }, []);

  // const tes = getHistoryExams.map((t: any) => t.exams.nama_ujian);
  const tes = getHistoryExams.map((t: any) => t.hasil_ujian);

  console.log(tes);

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
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {historyStudent.length > 0 ? (
                  historyStudent.map((item: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.exams?.nama_ujian}</TableCell>
                      <TableCell>{useConvertDate(item.created_at)}</TableCell>
                      <TableCell>{item.hasil_ujian}</TableCell>
                      <TableCell>
                        {item.status_exam === true
                          ? "Selesai"
                          : "Belum Selesai"}
                      </TableCell>
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
                )} */}
              </TableBody>
            </Table>
          </div>
          <Button className="mt-10 px-5 cursor-pointer">Logout</Button>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
