"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
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
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Soal() {
  const [questions, setQuestions] = useState<any>([]);
  const [clickedAnswerPg, setClickedAnswerPg] = useState<{
    [questions: string]: string;
  }>({});
  const idExams = useSearchParams().get("idExams");
  const idStudent = useSearchParams().get("idStudent");
  const dataStudent = useGetDataStudent(idStudent!);
  const [time, setTime] = useState<number | null>(null);
  const [answerEssayExams, setAnswerEssayExams] = useState<{
    [questions: string]: string;
  }>({});
  const [markQuestions, setMarkQuestions] = useState<any>({});
  const [timeOutDone, setTimeOutDone] = useState<boolean>(false);
  const [showInformationExam, setShowInformationExam] = useState<boolean>(true);
  const router = useRouter();
  const clickedOutsideCheked = useRef<HTMLInputElement | null>(null);
  const handleClickedOutsideContent = useRef<HTMLDivElement | null>(null);
  const clickedMarkQuestions = useRef<HTMLButtonElement | null>(null);
  const clickedAnswerQuestions = useRef<HTMLInputElement | null>(null);
  const [isClosedContent, setIsClosedContent] = useState<boolean>(false);
  const [dataUjianRandom, setDataUjianRandom] = useState<any>([]);

  useEffect(() => {
    if (questions?.tipe_ujian === "pg") {
      const savedMark = localStorage.getItem("markQuestions");
      const savedAnswerPg = localStorage.getItem("exam-answer-pg");
      if (savedAnswerPg && savedMark) {
        setClickedAnswerPg(JSON.parse(savedAnswerPg));
        setMarkQuestions(JSON.parse(savedMark));
      }
    }

    if (questions?.tipe_ujian === "essay") {
      const savedMark = localStorage.getItem("markQuestions");
      const savedAnswerEssay = localStorage.getItem("exam-answer-essay");
      if (savedAnswerEssay && savedMark) {
        setAnswerEssayExams(JSON.parse(savedAnswerEssay));
        setMarkQuestions(JSON.parse(savedMark));
      }
    }
  }, [questions?.tipe_ujian]);

  useEffect(() => {
    if (questions?.tipe_ujian === "pg") {
      localStorage.setItem("markQuestions", JSON.stringify(markQuestions));
      localStorage.setItem("exam-answer-pg", JSON.stringify(clickedAnswerPg));
    }

    if (questions?.tipe_ujian === "essay") {
      localStorage.setItem("markQuestions", JSON.stringify(markQuestions));
      localStorage.setItem(
        "exam-answer-essay",
        JSON.stringify(answerEssayExams)
      );
    }
  }, [questions?.tipe_ujian, clickedAnswerPg, markQuestions, answerEssayExams]);

  useEffect(() => {
    if (questions?.exams?.questions_exam) {
      const savedQuestions = localStorage.getItem("random-number-exam");
      if (savedQuestions) {
        setDataUjianRandom(JSON.parse(savedQuestions));
      } else {
        const questionsExam = questions.exams?.questions_exam ?? [];
        const dataExams = [...questionsExam].sort(() => 0.5 - Math.random());
        setDataUjianRandom(dataExams);
        localStorage.setItem("random-number-exam", JSON.stringify(dataExams));
      }
    }
  }, [questions]);

  useEffect(() => {
    function initializedTime() {
      const savedTimer = localStorage.getItem("timer");
      if (savedTimer) {
        const initialTime = JSON.parse(savedTimer);
        return initialTime > 0 ? initialTime : questions.exam_duration;
      }
      return questions.exam_duration;
    }

    setTime(initializedTime());
  }, [questions.exam_duration]);

  useEffect(() => {
    if (time === undefined || time === null) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev! <= 0) {
          clearInterval(timer);
          setTimeOutDone(true);
          return 0;
        }
        const newTime = prev! - 1;
        localStorage.setItem("timer", JSON.stringify(time));
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const minute = Math.floor(time! / 60);
  const second = time! % 60;
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

    const response = await fetch("/api/examDone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await response.json();

    if (res.success) {
      toast("Berhasil ✅", { description: "Ujian Telah Selesai" });
      localStorage.removeItem("exam-answer");
      localStorage.removeItem("timer");
      localStorage.removeItem("exam-answer-pg");
      localStorage.removeItem("markQuestions");
      router.push("/Student/Dashboard");
    } else {
      toast("Gagal ❌", { description: "Gagal menyimpan data" });
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (timeOutDone === true) {
  //       handleSendExam();
  //     }
  //   }, 5000);
  // }, [timeOutDone]);

  // useEffect(() => {
  //   const handleSelectStart = (e: Event) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   const handleContextMenu = (e: Event) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   const handleDragStart = (e: Event) => {
  //     e.preventDefault();
  //     return false;
  //   };

  //   document.addEventListener("selectstart", handleSelectStart);
  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("dragstart", handleDragStart);

  //   document.body.classList.add("no-select");

  //   return () => {
  //     document.removeEventListener("selectstart", handleSelectStart);
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("dragstart", handleDragStart);
  //     document.body.classList.remove("no-select");
  //   };
  // }, []);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      toast("Tidak Bisa Kembali ❌", {
        description: "Tombol dinonaktifkan selama ujian!",
      });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    function handleOutsideContent(e: any) {
      if (
        clickedOutsideCheked.current &&
        !clickedOutsideCheked.current.contains(e.target) &&
        handleClickedOutsideContent.current &&
        !handleClickedOutsideContent.current.contains(e.target) &&
        clickedMarkQuestions.current &&
        !clickedMarkQuestions.current.contains(e.target) &&
        clickedAnswerQuestions.current &&
        !clickedAnswerQuestions.current.contains(e.target)
      ) {
        setIsClosedContent(true);
      }
    }

    window.addEventListener("click", handleOutsideContent);
    return () => {
      window.removeEventListener("click", handleOutsideContent);
    };
  }, []);

  useEffect(() => {
    if (isClosedContent) {
      setShowInformationExam(false);
      setIsClosedContent(false);
    }
  }, [isClosedContent]);

  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] py-10">
      <div>
        <h1 className="text-3xl font-semibold w-11/12 mx-auto mb-3">
          Ujian {questions.exams?.nama_ujian}
        </h1>
        <div className="w-11/12 h-1 bg-slate-700 rounded-lg my-3 mx-auto" />
      </div>
      <div className="flex items-center justify-center md:gap-x-3 max-[640px]:flex-col sm:flex-col md:flex-row-reverse">
        <div className="max-[640px]:w-11/12 sm:w-10/12 md:basis-2/5 lg:basis-[30%] flex justify-center">
          <div
            className={`bg-[#71C9CE] p-3 rounded-b-lg transition-all duration-300 shadow-lg shadow-slate-800 fixed max-[640px]:w-full sm:w-full h-fit top-0 md:hidden ${
              showInformationExam ? `translate-y-0` : `-translate-y-full`
            }`}
            ref={handleClickedOutsideContent}
          >
            <div className="flex items-center max-[640px]:justify-around sm:justify-around">
              <h1 className="text-xl font-semibold">
                Ujian{" "}
                {questions.tipe_ujian === "pg" ? "Pilihan Ganda" : "Essay"}
              </h1>
              {formatedTime !== "NaN:NaN" && (
                <div
                  className={`py-1.5 rounded-lg gap-x-2 flex items-center px-2 justify-center ${
                    minute === 0 && second <= 20
                      ? `bg-red-500 animate-pulse`
                      : "bg-green-500"
                  }`}
                >
                  <Image
                    src="/img/examsStudent/stopwatch.png"
                    alt="Timer"
                    width={200}
                    height={200}
                    className="w-1/4"
                  />
                  <span className="text-xl font-semibold">{formatedTime}</span>
                </div>
              )}
            </div>
            <div className="bg-[#A6E3E9] mt-3 flex flex-wrap gap-2 justify-center items-center p-3 rounded-md">
              {dataUjianRandom.map((item: any, i: number) => {
                const isAnswerPg = clickedAnswerPg[item.id];
                const isAnswerEssay = answerEssayExams[item.id];
                const isMarking = markQuestions[item.id];
                return (
                  <div
                    className={`h-8 w-8 rounded-md flex items-center justify-center font-bold text-base relative ${
                      isAnswerPg || isAnswerEssay
                        ? "bg-green-400"
                        : "bg-[#E3FDFD]"
                    }`}
                    key={i}
                  >
                    {isMarking === true &&
                      ((questions?.tipe_ujian === "pg" && !isAnswerPg) ||
                        (questions?.tipe_ujian === "essay" &&
                          !isAnswerEssay)) && (
                        <Image
                          src="/img/examsStudent/flag.png"
                          alt="Mark"
                          width={200}
                          height={200}
                          className="w-1/4 absolute top-1 left-1.5"
                        />
                      )}
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#71C9CE] p-5 rounded-lg fixed top-1/4 md:w-2/5 shadow-lg shadow-slate-800 lg:w-[30%] h-fit max-[640px]:hidden sm:hidden md:block">
            <div className="flex items-center md:justify-between">
              <h1 className="text-xl font-semibold">
                Ujian{" "}
                {questions.tipe_ujian === "pg" ? "Pilihan Ganda" : "Essay"}
              </h1>
              {formatedTime !== "NaN:NaN" && (
                <div
                  className={`py-1.5 rounded-lg gap-x-2 flex items-center justify-center ${
                    minute === 0 && second <= 20
                      ? `bg-red-500 animate-pulse`
                      : "bg-green-500"
                  }`}
                >
                  <Image
                    src="/img/examsStudent/stopwatch.png"
                    alt="Timer"
                    width={200}
                    height={200}
                    className="w-1/4"
                  />
                  <span className="text-xl font-semibold">{formatedTime}</span>
                </div>
              )}
            </div>
            <div className="bg-[#A6E3E9] mt-5 flex flex-wrap gap-2.5 justify-center items-center py-5 px-3 rounded-md">
              {dataUjianRandom.map((item: any, i: number) => {
                const isAnswerPg = clickedAnswerPg[item.id];
                const isAnswerEssay = answerEssayExams[item.id];
                const isMarking = markQuestions[item.id];
                return (
                  <div
                    className={`h-10 w-10 rounded-md flex items-center justify-center font-bold text-lg relative ${
                      isAnswerPg || isAnswerEssay
                        ? "bg-green-400"
                        : "bg-[#E3FDFD]"
                    }`}
                    key={i}
                  >
                    {isMarking === true &&
                      ((questions?.tipe_ujian === "pg" && !isAnswerPg) ||
                        (questions?.tipe_ujian === "essay" &&
                          !isAnswerEssay)) && (
                        <Image
                          src="/img/examsStudent/flag.png"
                          alt="Mark"
                          width={200}
                          height={200}
                          className="w-1/4 absolute top-1.5 left-1.5"
                        />
                      )}
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-[640px]:w-11/12 sm:w-10/12 md:basis-1/2 lg:basis-[60%]">
          {dataUjianRandom.map((item: any, i: number) => (
            <div
              className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3 max-[640px]:w-full sm:w-full md:w-auto"
              key={item.id}
            >
              <h1 className="text-lg font-semibold" id="pertannyaan">
                {i + 1}. {item.questions}
              </h1>
              {questions.tipe_ujian === "pg" ? (
                <ul className="mt-3">
                  {["a", "b", "c", "d", "e"].map((opt) => {
                    const answerKey = `answer_${opt}`;
                    const answerText = item.answerPg[answerKey];
                    const isSelected = clickedAnswerPg[item.id] === answerText;
                    return (
                      <li key={opt} className="flex items-center gap-3">
                        <Input
                          type="radio"
                          name={item.id}
                          className="cursor-pointer w-5"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSelectedAnswer(item.id, answerText);
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectedAnswer(item.id, answerText);
                          }}
                          ref={clickedAnswerQuestions}
                        />
                        <label>
                          {opt.toLocaleUpperCase()}. {answerText}
                        </label>
                      </li>
                    );
                  })}
                  <Button
                    className="cursor-pointer text-base mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMarkQuestions((prev: any) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }));
                    }}
                    ref={clickedMarkQuestions}
                  >
                    Tandai
                  </Button>
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
                    defaultValue={answerEssayExams[item.id]}
                  />
                  <Button
                    className="cursor-pointer text-base mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMarkQuestions((prev: any) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }));
                    }}
                    ref={clickedMarkQuestions}
                  >
                    Tandai
                  </Button>
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
      <div className="mt-7 max-[640px]:mx-5 sm:mx-7 md:mx-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer px-6 py-1.5 rounded-lg font-semibold text-lg bg-[#A6E3E9] text-slate-800 hover:bg-[#CBF1F5]">
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
      </div>
      <div className="bg-red-400 h-12 w-12 rounded-full flex justify-center items-center fixed bottom-7 right-7 md:hidden">
        <div className="flex flex-col items-center justify-center gap-1 informExam">
          <Input
            type="checkbox"
            className="size-7 cursor-pointer absolute opacity-0 z-20"
            onChange={(e) => {
              setShowInformationExam(e.target.checked);
              setIsClosedContent(false);
            }}
            checked={showInformationExam}
            ref={clickedOutsideCheked}
          />
          <span className="w-6 h-1 bg-black rounded-lg rotate-45 translate-y-1 transition-all duration-300 ease-in-out"></span>
          <span className="w-6 h-1 bg-black rounded-lg -rotate-45 -translate-y-1 transition-all duration-300 ease-in-out"></span>
        </div>
      </div>
    </div>
  );
}
