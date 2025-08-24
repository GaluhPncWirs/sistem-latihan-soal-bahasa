"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useGetIdStudent } from "../../hooks/getIdStudent";
import LayoutBodyContent from "@/layout/bodyContent";
import Link from "next/link";
import { useGetDataStudent } from "@/app/hooks/getDataStudent";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function Soal() {
  const [questions, setQuestions] = useState<any>([]);
  const [clickedAnswerPg, setClickedAnswerPg] = useState<{
    [questions: string]: string;
  }>({});
  const idExams = useSearchParams().get("id");
  const idStudent = useGetIdStudent();
  const dataStudent = useGetDataStudent(idStudent);
  const [time, setTime] = useState<number>(questions.exam_duration);
  const [answerEssayExams, setAnswerEssayExams] = useState<{
    [questions: string]: string;
  }>({});
  const [timeOut, setTimeOut] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    if (questions.exam_duration) {
      setTime(questions.exam_duration);
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
    }
  }, [questions.exam_duration]);

  const minute = Math.floor(time / 60);
  const second = time % 60;
  const formatedTime = `${minute}:${String(second).padStart(2, "0")}`;

  useEffect(() => {
    if (!dataStudent?.classes) return;
    async function handleViewQuestions() {
      const { data, error }: any = await supabase
        .from("managed_exams")
        .select("*,exams(questions_exam,nama_ujian)")
        .eq("idExams", Number(idExams))
        .eq("kelas", dataStudent?.classes)
        .single();

      if (error) {
        toast("Gagal ❌", {
          description: "data gagal ditampilkan",
        });
      }
      setQuestions(data);
    }
    handleViewQuestions();
  }, [dataStudent?.classes]);

  function handleSelectedAnswer(questionsId: string, answer: string) {
    setClickedAnswerPg((prev) => ({
      ...prev,
      [questionsId]: answer,
    }));
  }

  async function handleSendExam() {
    const pilihanSiswa = Object.values(clickedAnswerPg);
    const jawabanYangBenar = questions.exams?.questions_exam
      .flatMap((item: any) => item.correctAnswer)
      .filter((jawabanBenar: any) => pilihanSiswa.includes(jawabanBenar));
    const resultExam = jawabanYangBenar.length * 10;

    const payload = {
      created_at: new Date().toISOString(),
      student_id: idStudent,
      exam_id: Number(idExams),
      answer_student:
        questions.tipe_ujian === "pg" ? clickedAnswerPg : answerEssayExams,
      hasil_ujian: questions.tipe_ujian === "pg" ? resultExam : "pending",
      status_exam: true,
      kelas: dataStudent?.classes,
    };

    const { error: insertErr } = await supabase
      .from("history-exam-student")
      .insert(payload);

    if (insertErr) {
      toast("Gagal ❌", { description: "Gagal menyimpan data" });
    } else {
      toast("Berhasil ✅", { description: "Ujian Selesai" });
      setTimeout(() => {
        push("/Student/Dashboard");
      }, 3000);
    }

    // const { data: sudahAda } = await supabase
    //   .from("history-exam-student")
    //   .select("*")
    //   .eq("exam_id", Number(idExams))
    //   .eq("student_id", idStudent)
    //   .single();

    // if (sudahAda) {
    //   const { error: updateErr } = await supabase
    //     .from("history-exam-student")
    //     .update(payload)
    //     .eq("exam_id", Number(idExams))
    //     .eq("student_id", idStudent);

    //   if (updateErr) {
    //     toast("Gagal ❌", { description: "Gagal memperbarui data" });
    //   } else {
    //     toast("Berhasil ✅", { description: "Ujian Selesai" });
    //   }
    // } else {
    //    const { error: insertErr } = await supabase
    //   .from("history-exam-student")
    //   .insert(payload);

    // if (insertErr) {
    //   toast("Gagal ❌", { description: "Gagal menyimpan data" });
    // } else {
    //   toast("Berhasil ✅", { description: "Ujian Selesai" });
    // }
    // }
  }

  return (
    <LayoutBodyContent>
      <div className="mx-auto pt-24 max-[640px]:w-11/12 sm:w-11/12 md:w-10/12">
        <h1 className="text-3xl font-semibold mb-7 mt-5">
          Ujian {questions.exams?.nama_ujian}
        </h1>
        <div className="flex flex-row-reverse gap-5 items-center justify-center max-[640px]:flex-col sm:flex-col md:flex-row-reverse">
          <div className="bg-[#71C9CE] basis-1/3 p-5 rounded-lg max-[640px]:fixed max-[640px]:top-20 max-[640px]:w-11/12 max-[640px]:z-10 sm:fixed sm:top-20 sm:w-10/12 sm:z-10 md:basis-1/3 md:static md:top-0 md:z-0">
            <div className="flex justify-between items-center max-[640px]:justify-evenly sm:justify-evenly md:justify-between">
              <h1 className="text-xl font-semibold">
                {questions.tipe_ujian === "pg"
                  ? "Pertanyaaan Pilihan Ganda"
                  : "Pertanyaaan Essay"}
              </h1>
              <div className="text-2xl font-semibold bg-[#F38181] px-4 py-1.5 rounded-lg">
                {formatedTime}
              </div>
            </div>
            <div className="bg-[#A6E3E9] mt-5 flex flex-wrap gap-2 justify-center items-center p-3 rounded-md">
              {questions.exams?.questions_exam.map((item: any, i: number) => {
                const isAnswerPg = clickedAnswerPg[item.id];
                const isAnswerEssay = answerEssayExams[item.id];
                return (
                  <div
                    className={`h-10 w-10  rounded-md flex items-center justify-center font-bold text-lg ${
                      isAnswerPg || isAnswerEssay
                        ? "bg-green-400"
                        : "bg-[#E3FDFD]"
                    }`}
                    key={i}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="basis-2/3 lg:overflow-y-auto h-[28rem] lg:scrollBarDesign max-[640px]:mt-32 max-[640px]:w-11/12 sm:mt-32 sm:w-10/12 md:mt-0 md:basis-2/3">
            {questions.exams?.questions_exam.map((item: any, i: number) => (
              <div
                className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3 max-[640px]:w-full sm:w-full md:w-auto"
                key={item.id}
              >
                <span className="font-bold mr-1 text-lg">{i + 1}.</span>
                <h1 className="inline-block text-lg font-semibold">
                  {item.questions}
                </h1>
                {questions.tipe_ujian === "pg" ? (
                  <ul className="flex justify-evenly items-center mt-5 max-[640px]:flex-wrap max-[640px]:gap-1.5 sm:flex-wrap sm:gap-2">
                    {["a", "b", "c", "d", "e"].map((opt) => {
                      const answerKey = `answer_${opt}`;
                      const answerText = item.answerPg[answerKey];
                      const isSelected =
                        clickedAnswerPg[item.id] === answerText;
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
                ) : (
                  <div className="mt-3">
                    <label
                      className="mb-1 font-semibold ml-1.5 inline-block"
                      htmlFor={item.id}
                    >
                      Jawab :
                    </label>
                    <Textarea
                      placeholder="Jawab Pertannyaan Kamu Disini"
                      className="border-slate-600 border-2"
                      id={item.id}
                      onChange={(e) =>
                        setAnswerEssayExams((prev: any) => ({
                          ...prev,
                          [item.id]: e.target?.value,
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            ))}
            {/* {questions.length > 0
              ? questions.exams.questions_exam.map((item: any, i: number) => (
                  <div
                    className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3 max-[640px]:w-full sm:w-full md:w-auto"
                    key={item.id}
                  >
                    <span className="font-bold mr-1 text-lg">{i + 1}.</span>
                    <h1 className="inline-block text-lg font-semibold">
                      {item.questions}
                    </h1>
                    <ul className="flex justify-evenly items-center mt-5 max-[640px]:flex-wrap max-[640px]:gap-1.5 sm:flex-wrap sm:gap-2">
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
                ))} */}
          </div>
        </div>
        <div className="mt-10 flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer px-7 py-1.5 rounded-lg font-semibold text-lg bg-[#A6E3E9] text-slate-800 hover:bg-[#CBF1F5]">
                Selesai
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Ujian</DialogTitle>
                <DialogDescription>
                  Apakah Anda Yakin Ingin Menyelesaikan Ujian ini?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="cursor-pointer" onClick={handleSendExam}>
                    Oke
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Link
            href="/Student/Dashboard"
            className="cursor-pointer px-7 py-1.5 rounded-lg font-semibold text-lg bg-[#A6E3E9] text-slate-800 hover:bg-[#CBF1F5]"
          >
            Kembali
          </Link>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
