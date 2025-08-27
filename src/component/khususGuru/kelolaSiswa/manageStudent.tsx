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

export default function ManageStudent() {
  const [dataStudents, setDataStudents] = useState<any>([]);
  const idTeacher = useGetIdTeacher();

  useEffect(() => {
    if (!idTeacher) return;
    async function getDataStudent() {
      const { data: student, error: errorStudent } = await supabase
        .from("account-student")
        .select("fullName,classes,idStudent,email");
      const { data: historyStudent, error: errorHistoryStudent } =
        await supabase
          .from("history-exam-student")
          .select(
            "student_id,exam_id,hasil_ujian,kelas,created_at,status_exam,exams(id,nama_ujian,tipeUjian,idTeacher)"
          )
          .eq("exams.idTeacher", idTeacher);

      // const { data: dataManageExams, error: errorDataManageExams }: any =
      //   await supabase.from("managed_exams").select("*");
      // // .eq("id_Teacher", idTeacher);

      if (errorStudent || errorHistoryStudent) {
        console.log("data gagal diambil");
      } else {
        const dataIsNotNull = historyStudent?.filter(
          (a: any) => a.exams !== null
        );

        const idSiswa = dataIsNotNull.reduce((acc: any, cur: any) => {
          const findId = acc.find((f: any) => f.student_id === cur.student_id);
          if (!findId) {
            acc.push({
              student_id: cur.student_id,
              resultUjian: [
                {
                  namaUjian:
                    cur.exam_id === cur.exams.id ? cur.exams.nama_ujian : null,
                  idUjian: cur.exam_id,
                  tipe_ujian: cur.exams.tipeUjian,
                  hasil_ujian: cur.hasil_ujian,
                  status_exam: cur.status_exam,
                },
              ],
              created_at: [cur.created_at],
            });
          } else {
            findId.resultUjian.push({
              namaUjian:
                cur.exam_id === cur.exams.id ? cur.exams.nama_ujian : null,
              idUjian: cur.exam_id,
              tipe_ujian: cur.exams.tipeUjian,
              hasil_ujian: cur.hasil_ujian,
              status_exam: cur.status_exam,
            });
            findId.created_at.push(cur.created_at);
            findId.arrIdExams.push(cur.exam_id);
          }
          return acc;
        }, []);

        const mergedDatas = idSiswa.map((item: any) => {
          const historyExam = student.find(
            (f: any) => f.idStudent === item.student_id
          );
          return {
            ...item,
            fullName: historyExam?.fullName ?? null,
            classes: historyExam?.classes ?? null,
          };
        });

        setDataStudents(mergedDatas);
      }
    }

    getDataStudent();
  }, [idTeacher]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#3282B8]">
          <TableHead className="text-center text-base">No</TableHead>
          <TableHead className="text-center text-base">Nama Siswa</TableHead>
          <TableHead className="text-center text-base">Ujian</TableHead>
          <TableHead className="text-center text-base">Nilai</TableHead>
          <TableHead className="text-center text-base">Status Tugas</TableHead>
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
            <TableCell className="text-center text-lg font-bold" colSpan={6}>
              Belum Ada Siswa
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
