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
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

export default function Soal() {
  const [questions, setQuestions] = useState<any>([]);
  const [clickedAnswerPg, setClickedAnswerPg] = useState<{
    [questions: string]: string;
  }>({});
  const idExams = useSearchParams().get("idExams");
  const idStudent = useSearchParams().get("idStudent");
  const dataStudent = useGetDataStudent(idStudent!);
  const [time, setTime] = useState<number>(0);
  const [answerEssayExams, setAnswerEssayExams] = useState<{
    [questions: string]: string;
  }>({});
  const [timeOutDone, setTimeOutDone] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    if (questions.exam_duration) {
      setTime(questions.exam_duration);
      const timer = setInterval(() => {
        setTime((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setTimeOutDone(true);
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
    const resultExam = Math.round(
      (jawabanYangBenar.length / questions.exams.questions_exam.length) * 100
    );

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
      toast("Berhasil ✅", { description: "Ujian Telah Selesai" });
      push("/Student/Dashboard");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (timeOutDone === true) {
        handleSendExam();
      }
    }, 5000);
  }, [timeOutDone]);

  return (
    <LayoutBodyContent>
      <div className="mx-auto pt-28 max-[640px]:w-11/12 sm:w-11/12 md:w-11/12 lg:w-10/12">
        <h1 className="text-3xl font-semibold mb-7 max-[640px]:text-center sm:text-center md:text-start">
          Ujian {questions.exams?.nama_ujian}
        </h1>
        <div className="flex max-[640px]:gap-5 sm:gap-5 md:gap-x-10 items-center justify-center max-[640px]:flex-col sm:flex-col md:flex-row-reverse">
          <div className="bg-[#71C9CE] p-5 rounded-lg max-[640px]:sticky max-[640px]:top-20 max-[640px]:w-11/12 max-[640px]:z-[5] sm:sticky sm:top-20 sm:w-10/12 sm:z-[5] md:basis-2/5 lg:basis-1/3 md:static md:top-0 md:z-0">
            <div className="flex justify-between items-center max-[640px]:justify-evenly sm:justify-evenly md:justify-between">
              <h1 className="text-xl font-semibold">
                Ujian{" "}
                {questions.tipe_ujian === "pg" ? "Pilihan Ganda" : "Essay"}
              </h1>
              {formatedTime !== "NaN:NaN" && (
                <div className=" bg-[#F38181] px-4 py-1.5 rounded-lg flex flex-col items-center">
                  <Image
                    src="/img/examsStudent/stopwatch.png"
                    alt="Timer"
                    width={200}
                    height={200}
                    className="w-1/2"
                  />
                  <span className="text-xl font-semibold">{formatedTime}</span>
                </div>
              )}
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
          <div className="basis-2/3 md:overflow-y-auto md:h-[28rem] md:scrollBarDesign max-[640px]:w-11/12 sm:w-10/12 md:basis-1/2 lg:basis-2/3">
            {questions.exams?.questions_exam.map((item: any, i: number) => (
              <div
                className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3 max-[640px]:w-full sm:w-full md:w-auto"
                key={item.id}
              >
                <h1 className="text-lg font-semibold">
                  {i + 1}. {item.questions}
                </h1>
                {questions.tipe_ujian === "pg" ? (
                  <ul className="mt-3">
                    {["a", "b", "c", "d", "e"].map((opt) => {
                      const answerKey = `answer_${opt}`;
                      const answerText = item.answerPg[answerKey];
                      const isSelected =
                        clickedAnswerPg[item.id] === answerText;
                      return (
                        <li key={opt} className="flex items-center gap-3">
                          <Input
                            type="radio"
                            name={item.id}
                            className="cursor-pointer w-5 "
                            defaultChecked={isSelected}
                            onClick={() =>
                              handleSelectedAnswer(item.id, answerText)
                            }
                          />
                          <label>
                            {opt.toLocaleUpperCase()}. {answerText}
                          </label>
                        </li>
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
                      className="border-slate-600 border-2 h-20 bg-stone-200"
                      id={item.id}
                      onCopy={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      onCut={(e) => e.preventDefault()}
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
          </div>
        </div>
        <AlertDialog open={timeOutDone} onOpenChange={setTimeOutDone}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Waktu Telah Habis</AlertDialogTitle>
              <AlertDialogDescription>
                Ujian telah mencapai batas waktu yang telah ditentukan. Jawaban
                Anda akan disimpan secara otomatis.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="cursor-pointer">
                Oke
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
