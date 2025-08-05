"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useGetIdStudent } from "../hooks/getIdStudent";
import LayoutBodyContent from "@/layout/bodyContent";
import Link from "next/link";

export default function Soal() {
  const [questions, setQuestions] = useState<any>([]);
  const [clickedAnswer, setClickedAnswer] = useState<{
    [questions: string]: string;
  }>({});
  const idExams = useSearchParams().get("id");
  const idStudent = useGetIdStudent();
  const [time, setTime] = useState<number>(3600);
  const [timeOut, setTimeOut] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setTimeOut(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minute = Math.floor(time / 60);
  const second = time % 60;
  const formatedTime = `${minute}:${String(second).padStart(2, "0")}`;

  useEffect(() => {
    async function handleViewQuestionsUseParam() {
      const { data, error }: any = await supabase
        .from("exams")
        .select("*")
        .eq("id", Number(idExams));
      setQuestions(data);
      if (error) {
        toast("Gagal ❌", {
          description: "data gagal ditampilkan:",
        });
      }
    }
    handleViewQuestionsUseParam();
  }, []);

  function handleSelectedAnswer(questionsId: string, answer: string) {
    setClickedAnswer((prev) => ({
      ...prev,
      [questionsId]: answer,
    }));
  }

  async function handleSendExam() {
    const { data, error }: any = await supabase
      .from("exams")
      .select("*")
      .eq("id", Number(idExams));

    if (error) {
      toast("Gagal ❌", {
        description: "data gagal ditambahkan",
      });
    } else {
      const pilihanSiswa = Object.values(clickedAnswer);
      const jawabanYangBenar = data
        .flatMap((getQuestions: any) => getQuestions.questions_exam)
        .map((item: any) => item.correctAnswer)
        .filter((jawabanBenar: any) => pilihanSiswa.includes(jawabanBenar));
      const resultExam = jawabanYangBenar.length * 10;

      const payload = {
        created_at: new Date().toISOString(),
        student_id: idStudent,
        exam_id: Number(idExams),
        answer_student: clickedAnswer,
        hasil_ujian: resultExam,
        status_exam: true,
      };

      const { data: sudahAda } = await supabase
        .from("history-exam-student")
        .select("*")
        .eq("exam_id", Number(idExams))
        .eq("student_id", idStudent)
        .single();

      if (sudahAda) {
        const { error: updateErr } = await supabase
          .from("history-exam-student")
          .update(payload)
          .eq("exam_id", Number(idExams))
          .eq("student_id", idStudent);

        if (updateErr) {
          toast("Gagal ❌", { description: "Gagal memperbarui data" });
        } else {
          toast("Berhasil ✅", { description: "Ujian Selesai" });
        }
      } else {
        const { error: insertErr } = await supabase
          .from("history-exam-student")
          .insert(payload);

        if (insertErr) {
          toast("Gagal ❌", { description: "Gagal menyimpan data" });
        } else {
          toast("Berhasil ✅", { description: "Ujian Selesai" });
        }
      }
    }
  }

  return (
    <LayoutBodyContent>
      <div className="w-10/12 mx-auto pt-24">
        <h1 className="text-3xl font-semibold mb-7 text-center mt-5">
          Ujian {questions[0]?.nama_ujian}
        </h1>
        <div className="flex flex-row-reverse gap-7 items-center justify-center">
          <div className="bg-[#71C9CE] basis-1/3 p-5 rounded-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">
                Pertanyaaan Pilihan Ganda
              </h1>
              <div className="text-2xl font-semibold bg-[#F38181] px-5 py-1.5 rounded-lg">
                {/* {formatedTime} */}00:00
              </div>
            </div>
            <div className="bg-[#A6E3E9] mt-5 flex flex-wrap gap-2 justify-center items-center p-3 rounded-md">
              {questions.length > 0
                ? questions
                    .flatMap((getQuestions: any) => getQuestions.questions_exam)
                    .map((item: any, i: number) => {
                      const isAnswer = clickedAnswer[item.id];

                      return (
                        <div
                          className={`h-10 w-10  rounded-md flex items-center justify-center font-bold text-lg ${
                            isAnswer ? "bg-green-400" : "bg-[#E3FDFD]"
                          }`}
                          key={i}
                        >
                          {i + 1}
                        </div>
                      );
                    })
                : null}
            </div>
          </div>
          <div className="basis-2/3 overflow-y-auto h-[28rem] scrollBarDesign">
            {questions.length > 0
              ? questions
                  .flatMap((getQuestions: any) => getQuestions.questions_exam)
                  .map((item: any, i: number) => (
                    <div
                      className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3"
                      key={item.id}
                    >
                      <span className="font-bold mr-1 text-lg">{i + 1}.</span>
                      <h1 className="inline-block text-lg font-semibold">
                        {item.questions}
                      </h1>
                      <ul className="flex justify-evenly items-center mt-5">
                        {["a", "b", "c", "d", "e"].map((opt) => {
                          const answerKey = `answer_${opt}`;
                          const answerText = item.answerPg[answerKey];
                          const isSelected =
                            clickedAnswer[item.id] === answerText;
                          return (
                            <Button
                              key={opt}
                              variant="outline"
                              className={`cursor-pointer w-fit px-3 ${
                                isSelected ? "line-through" : ""
                              }`}
                              onClick={() =>
                                handleSelectedAnswer(item.id, answerText)
                              }
                            >
                              {opt.toUpperCase()}. {answerText}
                            </Button>
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
          </div>
        </div>
        <div className="mt-10 flex justify-between">
          <Button
            className="cursor-pointer px-7 py-5 text-lg bg-[#A6E3E9] text-slate-800 hover:bg-[#CBF1F5]"
            onClick={handleSendExam}
          >
            Selesai
          </Button>
          <Link
            href="/Student"
            className="cursor-pointer px-7 py-1.5 rounded-lg font-semibold text-lg bg-[#A6E3E9] text-slate-800 hover:bg-[#CBF1F5]"
          >
            Kembali
          </Link>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
