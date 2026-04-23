import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export function useManageDataExams(getidTeacher: string) {
  const [dataManageExams, setDataManageExams] = useState<string[]>([]);

  useEffect(() => {
    if (!getidTeacher) return;
    async function getDataManageExams() {
      const [
        { data: datasManageExams, error: errorDatasManageExams },
        { data: isCompleteExam, error: errorIsCompleteExam },
        { data: lengthStudent, error: errorLengthStudent },
      ] = await Promise.all([
        supabase
          .from("managed_exams")
          .select("*, exams(nama_ujian)")
          .eq("id_Teacher", getidTeacher),
        supabase
          .from("history-exam-student")
          .select(
            "exam_id,student_id,kelas,hasil_ujian,status_exam,exams(idTeacher)",
          )
          .eq("exams.idTeacher", getidTeacher),
        supabase.from("account-student").select("classes,idStudent"),
      ]);

      if (errorDatasManageExams || errorIsCompleteExam || errorLengthStudent) {
        console.log("data error ditampilkan");
      } else {
        const filterNull = isCompleteExam?.filter(
          (isNull: any) => isNull.exams !== null,
        );
        const completeExams = filterNull.reduce((acc: any, cur: any) => {
          const found = acc.find(
            (item: { kelas: string }) => item.kelas === cur.kelas,
          );
          if (!found) {
            acc.push({
              kelas: cur.kelas,
              exam_id: [cur.exam_id],
              student_id: [cur.student_id],
              hasil_ujian: [cur.hasil_ujian],
            });
          } else {
            found.student_id.push(cur.student_id);
            found.exam_id.push(cur.exam_id);
            found.hasil_ujian.push(cur.hasil_ujian);
          }
          return acc;
        }, []);

        const totalStudent = lengthStudent.reduce((acc: any, cur: any) => {
          const foundClass = acc.find(
            (item: { classes: string }) => item.classes === cur.classes,
          );
          if (!foundClass) {
            acc.push({
              classes: cur.classes,
              idStudent: [cur.idStudent],
            });
          } else {
            foundClass.idStudent.push(cur.idStudent);
          }
          return acc;
        }, []);

        const mergedData = datasManageExams?.map((item: any) => {
          const findsExams = completeExams.find(
            (f: any) =>
              f.kelas === item.kelas && f.exam_id.includes(item.idExams),
          );

          const studentCompleteExams = findsExams?.student_id.filter(
            (_: any, i: number) => findsExams.exam_id[i] === item.idExams,
          );

          const findStudent = totalStudent.find(
            (f: any) => f.classes === item.kelas,
          );
          return {
            ...item,
            lengthStudent: findStudent?.idStudent ?? [],
            lengthStudentCompleteExams: studentCompleteExams,
            hasil_ujian: findsExams?.hasil_ujian ?? [],
          };
        });
        setDataManageExams(mergedData);
      }
    }
    getDataManageExams();
  }, [getidTeacher]);

  return dataManageExams;
}
