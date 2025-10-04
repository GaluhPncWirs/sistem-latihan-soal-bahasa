"use client";
import { Textarea } from "@/components/ui/textarea";
import LayoutBodyContent from "@/layout/bodyContent";
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultExam() {
  const [getDataStudentAnswer, setGetDataStudentAnswer] = useState<any>({});
  const paramIdExam = useSearchParams().get("id");
  const paramIdStudent = useSearchParams().get("idStudent");

  function correctAnswer(questionsId: any, pg: any) {
    if (!getDataStudentAnswer) return null;
    const answerStudentObj = getDataStudentAnswer?.answer_student;
    const studentAnswer = answerStudentObj[questionsId];
    return studentAnswer === pg ? "bg-amber-400 rounded-sm" : "";
  }

  useEffect(() => {
    if (!paramIdExam) return;
    async function getDataAnswer() {
      const { data, error } = await supabase
        .from("history-exam-student")
        .select("*, exams(nama_ujian,tipeUjian,questions_exam)")
        .eq("exam_id", Number(paramIdExam))
        .eq("student_id", paramIdStudent)
        .single();

      if (error) {
        console.log("gagal memuat data");
      }
      setGetDataStudentAnswer(data);
    }

    getDataAnswer();
  }, [paramIdExam]);

  return (
    <LayoutBodyContent>
      <div>
        <h1 className="text-4xl font-semibold mb-7 max-[640px]:text-center">
          Hasil Ujian
        </h1>
        <h1 className="text-2xl font-semibold mb-5">
          Nama Ujian : {getDataStudentAnswer.exams?.nama_ujian}
        </h1>

        <div>
          {Object.keys(getDataStudentAnswer).length > 0 ? (
            getDataStudentAnswer.exams?.tipeUjian === "pg" ? (
              <div className="grid lg:grid-cols-2 gap-3 max-[640px]:grid-cols-1 sm:grid-cols-1">
                {getDataStudentAnswer.exams?.questions_exam.map(
                  (item: any, i: number) => (
                    <div className="bg-[#08D9D6] rounded-lg p-7" key={item.id}>
                      <h1 className="font-semibold text-lg">
                        {i + 1}. {item.questions}
                      </h1>
                      <ul className="flex mt-3 flex-col justify-center gap-y-2">
                        {["a", "b", "c", "d", "e"].map((opt) => {
                          const answerKey = `answer_${opt}`;
                          const answerText = item.answerPg[answerKey];
                          return (
                            <li
                              key={opt}
                              className={`w-fit px-3 ${correctAnswer(
                                item.id,
                                answerText
                              )}`}
                            >
                              {opt.toUpperCase()}. {answerText}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-3 max-[640px]:grid-cols-1 sm:grid-cols-1">
                {getDataStudentAnswer.exams?.questions_exam.map(
                  (item: any, i: number) => (
                    <div className="bg-[#08D9D6] rounded-lg p-7" key={i}>
                      <h1 className="text-lg font-semibold">
                        <span className="mr-0.5">{i + 1}.</span>{" "}
                        {item.questions}
                      </h1>
                      <div className="mt-3">
                        <label className="mb-2 font-semibold ml-1.5 inline-block">
                          Jawaban :
                        </label>
                        <Textarea
                          className="border-slate-600 border-2 font-bold h-28"
                          disabled
                          defaultValue={
                            getDataStudentAnswer.answer_student?.[item.id] || ""
                          }
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            )
          ) : (
            Array.from({ length: 7 }).map((_: any, i: number) => (
              <div
                className="bg-slate-400 w-full p-5 h-52 rounded-md mb-5 animate-pulse"
                key={i}
              >
                <div className="w-10/12 bg-slate-300 h-5 rounded-sm mb-5"></div>
                <div className="w-1/6 bg-slate-300 h-5 rounded-sm mb-3"></div>
                <div className="w-full bg-slate-300 h-24 rounded-md"></div>
              </div>
            ))
          )}
        </div>

        <Link
          href="/Student/Dashboard"
          className="mt-5 block px-8 w-fit py-2 rounded-lg font-semibold bg-slate-800 text-slate-200 hover:text-slate-300"
        >
          Kembali
        </Link>
      </div>
    </LayoutBodyContent>
  );
}
