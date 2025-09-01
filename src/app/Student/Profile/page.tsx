"use client";
import Image from "next/image";
import Link from "next/link";
import { useGetDataStudent } from "../../hooks/getDataStudent";
import { useGetIdStudent } from "../../hooks/getIdStudent";
import LayoutBodyContent from "@/layout/bodyContent";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/data";
import { useConvertDate } from "../../hooks/getConvertDate";

export default function Profil() {
  const id = useGetIdStudent();
  const dataStudent = useGetDataStudent(id);
  const [historyStudent, setHistoryStudent] = useState([]);

  useEffect(() => {
    if (!id) return;
    async function getHistoryStudent() {
      const { data, error }: any = await supabase
        .from("history-exam-student")
        .select("*, exams (nama_ujian)")
        .eq("student_id", id);
      if (error) {
        console.log("gagal di tampilkan");
      }
      setHistoryStudent(data);
    }

    getHistoryStudent();
  }, [id]);

  return (
    <LayoutBodyContent>
      <div className="pt-16 flex max-[640px]:flex-col max-[640px]:gap-0 sm:flex-col sm:gap-0 md:gap-6 lg:gap-14 md:flex-row">
        <div className="bg-[#71C9CE] bg-gradient-to-t to-[#08D9D6] px-7 pt-10 pb-7 shadow-lg md:basis-[28%] lg:basis-1/4 flex flex-col items-center">
          <Image
            src="/img/profile/userProfile.png"
            alt="Profile User"
            width={300}
            height={300}
            className="rounded-full w-1/2"
          />
          <ul className="my-7 flex flex-col justify-center gap-3">
            <li>Nama {dataStudent?.fullName}</li>
            <li>Kelas {dataStudent?.classes}</li>
            <li>Email {dataStudent?.email}</li>
            <li>Peran {dataStudent?.role}</li>
            <li>
              Tgl Bergabung{" "}
              {useConvertDate(dataStudent?.created_at, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </li>
            <li>Status Akun Aktif</li>
          </ul>
        </div>
        <div className="max-[640px]:mt-0 sm:mt-0 md:mt-16 md:basis-2/3">
          <div className="bg-[#71C9CE] rounded-lg p-7">
            <h1 className="mb-10 text-center text-2xl font-semibold">
              Riwayat Ujian
            </h1>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#3282B8]">
                  <TableHead>No</TableHead>
                  <TableHead>Nama Ujian</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyStudent.length > 0 ? (
                  historyStudent.map((item: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.exams?.nama_ujian}</TableCell>
                      <TableCell>
                        {useConvertDate(item.created_at, {
                          minute: "numeric",
                          hour: "numeric",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
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
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
