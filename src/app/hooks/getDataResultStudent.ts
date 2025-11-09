import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/data";

export function getResultExamDataStudent(idTeacher: any) {
  const [resultExamsStudent, setResultExamsStudent] = useState<any>([]);

  useEffect(() => {
    if (!idTeacher) return;
    async function getDataStudent() {
      const [
        { data: student, error: errorStudent },
        { data: historyStudent, error: errorHistoryStudent },
      ] = await Promise.all([
        supabase
          .from("account-student")
          .select("fullName,classes,idStudent,email"),
        supabase
          .from("history-exam-student")
          .select("*,exams(id,nama_ujian,tipeUjian,idTeacher)")
          .eq("exams.idTeacher", idTeacher),
      ]);

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

        setResultExamsStudent(mergedDatas);
      }
    }
    getDataStudent();
  }, [idTeacher]);

  return resultExamsStudent;
}
