import LayoutBodyContent from "@/layout/bodyContent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import Link from "next/link";
import SkeletonResultExams from "./skeleton";

export default function ResultExamComponent() {
  const [getDataStudentAnswer, setGetDataStudentAnswer] = useState<any | null>(
    null,
  );
  const paramIdExam = useSearchParams().get("id");

  useEffect(() => {
    if (!paramIdExam) return;
    async function getDataAnswer() {
      try {
        const req = await fetch(`/api/resultExam?id=${paramIdExam}`);
        const response = await req.json();
        setGetDataStudentAnswer(response.dataResultExams);
      } catch (err) {
        console.error("Gagal Mengambil Data Ujian");
      }
    }
    getDataAnswer();
  }, [paramIdExam]);

  function correctAnswer(questionsId: string, pg: string) {
    if (!getDataStudentAnswer) return null;
    const answerStudentObj = getDataStudentAnswer?.answer_student;
    const studentAnswer = answerStudentObj[questionsId];
    return studentAnswer === pg && "bg-blue-400 rounded-sm py-1 font-semibold";
  }

  return (
    <LayoutBodyContent>
      {getDataStudentAnswer ? (
        <div>
          <h1 className="text-3xl font-semibold">Hasil Ujian</h1>
          <div className="h-1 bg-slate-700 rounded-lg my-3" />
          <h2 className="text-xl font-semibold">
            Nama Ujian : {getDataStudentAnswer.exams?.nama_ujian}
          </h2>
          <div className="mt-5 mb-10">
            {getDataStudentAnswer.exams?.tipeUjian === "pg" ? (
              <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
                {getDataStudentAnswer.exams?.questions_exam.map(
                  (item: any, i: number) => (
                    <div className="p-5" key={item.id}>
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
                                answerText,
                              )}`}
                            >
                              {opt.toUpperCase()}. {answerText}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
                {getDataStudentAnswer.exams?.questions_exam.map(
                  (item: any, i: number) => (
                    <div className="p-5" key={i}>
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
                  ),
                )}
              </div>
            )}
          </div>
          <Link
            href="/Student/Dashboard"
            className="cursor-pointer px-6 py-2 rounded-md font-semibold text-lg border-2 border-slate-800 hover:opacity-60"
          >
            Kembali
          </Link>
        </div>
      ) : (
        <SkeletonResultExams />
      )}
    </LayoutBodyContent>
  );
}
