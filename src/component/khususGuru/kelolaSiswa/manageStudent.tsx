import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export default function ManageStudent() {
  const [dataStudents, setDataStudents] = useState<any>([]);

  useEffect(() => {
    async function getDataStudent() {
      const { data: student, error: errorStudent } = await supabase
        .from("account-student")
        .select("fullName,classes,idStudent,email");
      const { data: historyStudent, error: errorHistoryStudent } =
        await supabase
          .from("history-exam-student")
          .select(
            "student_id,exam_id,hasil_ujian,kelas,created_at,exams(nama_ujian)"
          );

      if (errorStudent || errorHistoryStudent) {
        console.log("data gagal diambil");
      } else {
        const idSiswa = historyStudent?.reduce((acc: any, cur: any) => {
          const findId = acc.find((f: any) => f.student_id === cur.student_id);
          if (!findId) {
            acc.push({
              student_id: cur.student_id,
              created_at: [cur.created_at],
              hasil_ujian: [cur.hasil_ujian],
              exam_id: [cur.exam_id],
            });
          } else {
            findId.exam_id.push(cur.exam_id);
            findId.hasil_ujian.push(cur.hasil_ujian);
            findId.created_at.push(cur.created_at);
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
            email: historyExam?.email ?? null,
          };
        });

        setDataStudents(mergedDatas);
      }
    }
    getDataStudent();
  }, []);

  console.log(dataStudents);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#3282B8]">
          <TableHead className="text-center text-base">No</TableHead>
          <TableHead className="text-center text-base">Nama Siswa</TableHead>
          <TableHead className="text-center text-base">Ujian</TableHead>
          <TableHead className="text-center text-base">Nilai</TableHead>
          {/* <TableHead className="text-center text-base">Status Tugas</TableHead> */}
          <TableHead className="text-center text-base">Kelas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {dataStudents.length > 0 ? (
          dataStudents.map((data: any, i: number) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{data.fullName}</TableCell>
              <TableCell>{data.exam_id}</TableCell>
              <TableCell>{data.hasil_ujian}</TableCell>
              <TableCell>{data.classes}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="text-center text-lg font-bold" colSpan={4}>
              Belum Ada Tugas Yang Dibuat
            </TableCell>
          </TableRow>
        )} */}
      </TableBody>
    </Table>
  );
}
