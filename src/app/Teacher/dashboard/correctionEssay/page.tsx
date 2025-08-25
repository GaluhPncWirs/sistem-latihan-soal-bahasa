"use client";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import { Textarea } from "@/components/ui/textarea";
import LayoutBodyContent from "@/layout/bodyContent";
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CorrectionEssay() {
  const [viewQuestionsExams, setViewQuestionsExams] = useState<any>([]);
  const searchParamsId = useSearchParams().get("idExam");
  const searchParamsIdStudent = useSearchParams().get("idStudent");

  useEffect(() => {
    async function getExamEssay() {
      const { data, error } = await supabase
        .from("history-exam-student")
        .select(
          "student_id,exam_id,answer_student,exams(questions_exam,nama_ujian)"
        )
        .eq("exam_id", Number(searchParamsId))
        .eq("student_id", searchParamsIdStudent)
        .single();

      if (error) {
        console.log("data error ditampilkan");
      } else {
        setViewQuestionsExams(data);
      }
    }
    getExamEssay();
  }, []);

  return (
    <LayoutBodyContent>
      <div className="mx-auto pt-36 max-[640px]:w-11/12 sm:w-11/12 md:w-10/12">
        {viewQuestionsExams.exams?.questions_exam?.map(
          (item: any, i: number) => (
            <div
              className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3 max-[640px]:w-full sm:w-full md:w-auto"
              key={i}
            >
              <span className="font-bold mr-1 text-lg">{i + 1}.</span>
              <h1 className="inline-block text-lg font-semibold">
                {item.questions}
              </h1>
              <div className="mt-3">
                <label
                  className="mb-1 font-semibold ml-1.5 inline-block"
                  htmlFor={item.id}
                >
                  Jawaban Siswa :
                </label>
                <Textarea
                  placeholder="Jawab Pertannyaan Kamu Disini"
                  className="border-slate-600 border-2"
                  id={item.id}
                  disabled
                  defaultValue={
                    viewQuestionsExams.answer_student?.[item.id] || ""
                  }
                />
              </div>
            </div>
          )
        )}
        <div className="mt-5 py-1.5">
          <Link
            href="/Teacher/dashboard"
            className="bg-blue-400 py-1.5 px-7 rounded-md text-lg font-semibold hover:bg-blue-500"
          >
            Kembali
          </Link>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
