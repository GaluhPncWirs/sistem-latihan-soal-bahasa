"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useGetIdStudent } from "../hooks/getIdStudent";
import LayoutBodyContent from "@/layout/bodyContent";

export default function Soal() {
  const [questions, setQuestions] = useState<any>([]);
  const [clickedAnswer, setClickedAnswer] = useState<{
    [questions: string]: string;
  }>({});
  const idExams = useSearchParams().get("id");
  const idStudent = useGetIdStudent();

  useEffect(() => {
    if (idExams) {
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
    } else {
      async function handleViewQuestions() {
        const { data, error }: any = await supabase.from("exams").select("*");
        setQuestions(data);
        if (error) {
          toast("Gagal ❌", {
            description: "data gagal ditampilkan:",
          });
        }
      }
      handleViewQuestions();
    }
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
      .eq("id", idExams);

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
      };

      const { error: err }: any = await supabase
        .from("exams")
        .update({
          status_pengerjaan_siswa: [
            {
              student_id: idStudent,
              status_exam: true,
              hasil_ujian: resultExam,
            },
          ],
        })
        .eq("id", idExams);

      if (err) {
        toast("Gagal ❌", {
          description: "data gagal diupdate",
        });
      } else {
        const { error: err } = await supabase
          .from("history-exam-student")
          .insert([payload]);

        if (err) {
          toast("Gagal ❌", {
            description: "data gagal ditambahkan",
          });
        } else {
          toast("Berhasil ✅", {
            description: "Ujian Selesai",
          });
        }
      }
    }
  }

  return (
    <LayoutBodyContent>
      <div className="w-10/12 mx-auto pt-24">
        <div className="mt-7">
          <h1 className="text-3xl font-semibold">Pertanyaaan Pilihan Ganda</h1>
          {questions.length > 0
            ? questions
                .flatMap((getQuestions: any) => getQuestions.questions_exam)
                .map((item: any, i: number) => (
                  <div
                    className="mt-5 bg-[#08D9D6] rounded-lg p-7"
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
          <div className="mt-10">
            <Button
              className="cursor-pointer px-7 py-5 text-lg bg-[#A6E3E9] text-slate-800 hover:bg-[#CBF1F5]"
              onClick={handleSendExam}
            >
              Selesai
            </Button>
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
