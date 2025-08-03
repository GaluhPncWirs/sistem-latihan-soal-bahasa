"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
import LayoutBodyContent from "@/layout/bodyContent";
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultExam() {
  const [getDataStudent, setGetDataStudent] = useState<any>([]);
  const [getDataExam, setGetDataExam] = useState<any>([]);
  const paramId = useSearchParams().get("id");

  function correctAnswer(questionsId: any, pg: any) {
    if (!getDataStudent || getDataStudent.length === 0) return null;
    const answerStudentObj = getDataStudent[0].answer_student;
    const studentAnswer = answerStudentObj[questionsId];
    return studentAnswer === pg ? "bg-amber-400 rounded-sm" : "";
  }

  useEffect(() => {
    async function handleView() {
      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .eq("id", Number(paramId));
      setGetDataExam(data);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      }
    }
    handleView();
  }, []);

  useEffect(() => {
    async function getDataAnswerStudent() {
      const { data, error } = await supabase
        .from("history-exam-student")
        .select("*")
        .eq("exam_id", Number(paramId));
      setGetDataStudent(data);

      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      }
    }
    getDataAnswerStudent();
  }, []);

  return (
    <LayoutBodyContent>
      <div className="w-10/12 mx-auto pt-24">
        <div className="mt-7">
          <h1 className="text-3xl font-semibold text-center mb-5">
            Hasil Ujian
          </h1>
          <h1 className="text-2xl font-semibold mb-7">
            Nama Ujian {getDataExam[0]?.nama_ujian}
          </h1>
          {getDataExam?.length > 0
            ? getDataExam
                .flatMap((getQuestions: any) => getQuestions.questions_exam)
                .map((item: any, i: number) => (
                  <div
                    className="mt-5 bg-[#08D9D6] rounded-lg p-7"
                    key={item.id}
                  >
                    <span className="font-bold mr-1 text-lg">{i + 1}.</span>
                    <h1 className="inline-block text-lg">{item.questions}</h1>
                    <ul className="flex justify-evenly items-center mt-5">
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
                ))
            : Array.from({ length: 5 }).map((_, i) => (
                <div className="mt-5 animate-pulse" key={i}>
                  <div className="bg-slate-400 w-full h-8 rounded-md"></div>
                  <div className="flex flex-col gap-5 mt-5">
                    <div className="bg-slate-400 w-11/12 h-5 rounded-md"></div>
                    <div className="bg-slate-400 w-4/5 h-5 rounded-md"></div>
                    <div className="bg-slate-400 w-full h-5 rounded-md"></div>
                    <div className="bg-slate-400 w-1/2 h-5 rounded-md"></div>
                    <div className="bg-slate-400 w-3/5 h-5 rounded-md"></div>
                  </div>
                </div>
              ))}
          <Link
            href="/Student"
            className="mt-5 block px-8 bg-amber-300 w-fit py-2 rounded-lg font-semibold hover:bg-amber-400"
          >
            Kembali
          </Link>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
