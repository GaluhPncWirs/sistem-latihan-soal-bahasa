import { useEffect, useState } from "react";
import { useGetIdStudent } from "./getIdStudent";
import { supabase } from "@/lib/supabase/data";
import { toast } from "sonner";

export function useDataScheduleExams(dataStudent: any) {
  const [scheduleExams, setScheduleExams] = useState<any>([]);
  const getIdStudent = useGetIdStudent();

  useEffect(() => {
    if (!dataStudent?.classes || !getIdStudent) return;
    async function getDataExamResult() {
      const { data: examsData, error: examsError } = await supabase
        .from("managed_exams")
        .select("*,account_teacher(fullName),exams(nama_ujian,questions_exam)")
        .eq("kelas", dataStudent?.classes);

      const { data: historyDataExams, error: historyDataError }: any =
        await supabase
          .from("history-exam-student")
          .select("exam_id,status_exam,created_at,hasil_ujian")
          .eq("student_id", getIdStudent);

      if (examsError || historyDataError) {
        toast("data tidak bisa ditampilkan, error");
        return;
      }

      const mergedDataScheduleExams = examsData.map((item: any) => {
        const finds = historyDataExams.find(
          (f: any) => f.exam_id === item.idExams
        );
        return {
          ...item,
          status_exam: finds?.status_exam ?? null,
          created_at_historyExams: finds?.created_at ?? null,
          hasil_ujian: finds?.hasil_ujian ?? null,
        };
      });

      setScheduleExams(mergedDataScheduleExams);
    }
    getDataExamResult();
  }, [dataStudent?.classes, getIdStudent]);

  return scheduleExams;
}
