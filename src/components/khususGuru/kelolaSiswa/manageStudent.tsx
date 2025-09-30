import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ManageStudent({ dataStudents }: any) {
  return (
    <div>
      <h1 className="mb-7 text-2xl font-semibold">Hasil Ujian Siswa</h1>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#3282B8]">
            <TableHead className="text-center text-base">No</TableHead>
            <TableHead className="text-center text-base">Nama Siswa</TableHead>
            <TableHead className="text-center text-base">Ujian</TableHead>
            <TableHead className="text-center text-base">Nilai</TableHead>
            <TableHead className="text-center text-base">
              Status Tugas
            </TableHead>
            <TableHead className="text-center text-base">Kelas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataStudents.length > 0 ? (
            dataStudents.map((data: any, i: number) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{data.fullName}</TableCell>
                <TableCell>
                  {data.resultUjian.map((item: any, i: number) => (
                    <ul key={i}>
                      <li className="border-y mb-1.5 border-slate-600">
                        <span className="font-semibold mr-1 ">{i + 1}.</span>
                        {item.namaUjian}
                      </li>
                    </ul>
                  ))}
                </TableCell>
                <TableCell>
                  {data.resultUjian.map((nilaiUjian: any, i: number) => (
                    <ul key={i}>
                      {nilaiUjian.tipe_ujian === "essay" ? (
                        <li className="border-y mb-1.5 border-slate-600">
                          {nilaiUjian.hasil_ujian === "pending" ? (
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Link
                                  href={`/Teacher/dashboard/correctionEssay?idExam=${nilaiUjian.idUjian}&idStudent=${data.student_id}`}
                                  className="hover:underline hover:text-blue-700"
                                >
                                  {nilaiUjian.hasil_ujian}
                                </Link>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-fit p-2">
                                <h1 className="font-semibold text-sm">
                                  Beri Nilai Essay Siswa
                                </h1>
                              </HoverCardContent>
                            </HoverCard>
                          ) : (
                            nilaiUjian.hasil_ujian
                          )}
                        </li>
                      ) : (
                        <li className="border-y mb-1.5 border-slate-600">
                          {nilaiUjian.hasil_ujian}
                        </li>
                      )}
                    </ul>
                  ))}
                </TableCell>
                <TableCell>
                  {data.resultUjian.map((statusUjian: any, i: number) => (
                    <ul key={i}>
                      <li className="border-y mb-1.5 border-slate-600">
                        {statusUjian.status_exam === true
                          ? "Selesai"
                          : "Belum Selesai"}
                      </li>
                    </ul>
                  ))}
                </TableCell>
                <TableCell>{data.classes}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-lg font-semibold"
              >
                Belum Ada Siswa
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
