import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
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
import { SoalUjian } from "@/types/halamanUjian";
import SkeletonExam from "./skeleton";
import { useGetIdStudent } from "@/app/hooks/getIdStudent";

export default function ExamsComponent() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const idExams = searchParam.get("idExams");
  const getIdStudent = useGetIdStudent();
  const [questionsExam, setQuestionsExam] = useState<SoalUjian | null>(null);
  const [dataStudent, setDataStudent] = useState<any>(null);
  const [clickedAnswerPg, setClickedAnswerPg] = useState<{
    [questions: string]: string;
  }>({});
  const [isClosedContent, setIsClosedContent] = useState<boolean>(false);
  const [dataUjianRandom, setDataUjianRandom] = useState<any>([]);
  const [isSizeMobile, setIsSizeMobile] = useState<boolean>(false);
  const [time, setTime] = useState<number | null>(null);
  const [answerEssayExams, setAnswerEssayExams] = useState<{
    [questions: string]: string;
  }>({});
  const [markQuestions, setMarkQuestions] = useState<any>({});
  const [timeOutDone, setTimeOutDone] = useState<boolean>(false);
  const [showInformationExam, setShowInformationExam] = useState<boolean>(true);
  const clickedOutsideCheked = useRef<HTMLInputElement | null>(null);
  const handleClickedOutsideContent = useRef<HTMLDivElement | null>(null);
  const clickedMarkQuestions = useRef<HTMLButtonElement | null>(null);
  const clickedAnswerQuestions = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!idExams || !getIdStudent) return;

    async function getDataExams() {
      try {
        const response = await fetch(
          `/api/getQuestions?idExams=${idExams}&idStudent=${getIdStudent}`
        )
          .then((val: any) => val.json())
          .then((data: any) => {
            setQuestionsExam(data.dataExams);
            setDataStudent(data.dataStudent);
          });

        return response;
      } catch (err) {
        return err;
      }
    }
    getDataExams();
  }, [idExams, getIdStudent]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    function handler(e: MediaQueryListEvent | MediaQueryList) {
      setIsSizeMobile(e.matches);
    }

    handler(mediaQuery);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (questionsExam?.tipe_ujian === "pg") {
      const savedMark = localStorage.getItem("markQuestions");
      const savedAnswerPg = localStorage.getItem("exam-answer-pg");
      if (savedAnswerPg && savedMark) {
        setClickedAnswerPg(JSON.parse(savedAnswerPg));
        setMarkQuestions(JSON.parse(savedMark));
      }
    }

    if (questionsExam?.tipe_ujian === "essay") {
      const savedMark = localStorage.getItem("markQuestions");
      const savedAnswerEssay = localStorage.getItem("exam-answer-essay");
      if (savedAnswerEssay && savedMark) {
        setAnswerEssayExams(JSON.parse(savedAnswerEssay));
        setMarkQuestions(JSON.parse(savedMark));
      }
    }
  }, [questionsExam?.tipe_ujian]);

  useEffect(() => {
    if (questionsExam?.tipe_ujian === "pg") {
      localStorage.setItem("markQuestions", JSON.stringify(markQuestions));
      localStorage.setItem("exam-answer-pg", JSON.stringify(clickedAnswerPg));
    }

    if (questionsExam?.tipe_ujian === "essay") {
      localStorage.setItem("markQuestions", JSON.stringify(markQuestions));
      localStorage.setItem(
        "exam-answer-essay",
        JSON.stringify(answerEssayExams)
      );
    }
  }, [
    questionsExam?.tipe_ujian,
    clickedAnswerPg,
    markQuestions,
    answerEssayExams,
  ]);

  useEffect(() => {
    if (questionsExam?.exams?.questions_exam) {
      const savedQuestions = localStorage.getItem("random-number-exam");
      if (savedQuestions) {
        setDataUjianRandom(JSON.parse(savedQuestions));
      } else {
        const questions = questionsExam.exams?.questions_exam ?? [];
        const dataExams = [...questions].sort(() => 0.5 - Math.random());
        setDataUjianRandom(dataExams);
        localStorage.setItem("random-number-exam", JSON.stringify(dataExams));
      }
    }
  }, [questionsExam]);

  useEffect(() => {
    function initializedTime() {
      const savedTimer = localStorage.getItem("timer");
      if (savedTimer) {
        const initialTime = JSON.parse(savedTimer);
        return initialTime > 0 ? initialTime : questionsExam?.exam_duration;
      }
      return questionsExam?.exam_duration;
    }

    setTime(initializedTime());
  }, [questionsExam?.exam_duration]);

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

  function handleSelectedAnswer(questionsId: string, answer: string) {
    setClickedAnswerPg((prev) => ({
      ...prev,
      [questionsId]: answer,
    }));
  }

  function handleAnswerEmpty() {
    const idSoalYangSudah = Object.keys(clickedAnswerPg);
    const dataUjian = dataUjianRandom.filter(
      (data: any) => !idSoalYangSudah.includes(data.id)
    );
    return dataUjian.length === 0;
  }

  async function handleSendExam() {
    const pilihanSiswa = Object.values(clickedAnswerPg);
    const jawabanYangBenar: any = questionsExam?.exams?.questions_exam
      .flatMap((item: any) => item.correctAnswer)
      .filter((jawabanBenar: any) => pilihanSiswa.includes(jawabanBenar));
    const resultExam = Math.round(
      (jawabanYangBenar.length /
        (questionsExam?.exams?.questions_exam?.length ?? 0)) *
        100
    );

    const payload = {
      created_at: new Date().toISOString(),
      student_id: getIdStudent,
      exam_id: Number(idExams),
      answer_student:
        questionsExam?.tipe_ujian === "pg" ? clickedAnswerPg : answerEssayExams,
      hasil_ujian: questionsExam?.tipe_ujian === "pg" ? resultExam : "pending",
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
      localStorage.removeItem("timer");
      localStorage.removeItem("exam-answer-pg");
      localStorage.removeItem("exam-answer-essay");
      localStorage.removeItem("markQuestions");
      localStorage.removeItem("random-number-exam");
      router.push("/Student/Dashboard");
    } else {
      toast("❌ Gagal", { description: "Gagal menyimpan data" });
    }
  }

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
      toast("❌ Tidak Bisa Kembali", {
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
    <div className="bg-[#A6E3E9] py-10">
      {Object.values(questionsExam ?? {}).length > 0 ? (
        <div className="bg-slate-50 w-11/12 mx-auto rounded-md py-8 px-10">
          <h1 className="text-3xl font-semibold mb-3">
            Ujian Pelajaran Sejarah
          </h1>
          <div className="h-1 bg-slate-700 rounded-lg mt-3" />
          <div className="flex justify-between items-center flex-col md:items-baseline md:flex-row-reverse md:gap-5">
            <div
              className={`h-fit shadow-lg shadow-slate-800 bg-[#71C9CE] fixed md:sticky p-6 rounded-md ${
                isSizeMobile
                  ? `transition-all duration-300 max-[640px]:w-11/12 sm:w-10/12 top-0 ${
                      showInformationExam
                        ? `translate-y-0`
                        : `-translate-y-full shadow-none`
                    }`
                  : `md:basis-sm md:top-36`
              }`}
              ref={handleClickedOutsideContent}
            >
              <h1 className="text-2xl font-semibold">Navigasi Soal</h1>
              <div className="flex items-center max-[640px]:justify-around sm:justify-around mt-3">
                <h2 className="text-lg font-medium">
                  {questionsExam?.tipe_ujian === "pg"
                    ? "Pilihan Ganda"
                    : "Essay"}
                </h2>
                {formatedTime !== "NaN:NaN" && (
                  <div
                    className={`px-5 py-2 rounded-md gap-x-2 flex items-center justify-evenly ${
                      minute === 0 && second <= 20
                        ? `bg-red-500 animate-pulse`
                        : "bg-green-400 shadow-md shadow-slate-700"
                    }`}
                  >
                    <Image
                      src="/img/examsStudent/stopwatch.png"
                      alt="Timer"
                      width={200}
                      height={200}
                      className="size-7"
                    />
                    <span className="text-xl font-semibold">
                      {formatedTime}
                    </span>
                  </div>
                )}
              </div>
              <div className="bg-[#A6E3E9] mt-5 flex flex-wrap gap-2 justify-center p-4 rounded-md">
                {dataUjianRandom.map((item: any, i: number) => {
                  const isAnswerPg = clickedAnswerPg[item.id];
                  const isAnswerEssay = answerEssayExams[item.id];
                  const isMarking = markQuestions[item.id];
                  return (
                    <div
                      className={`size-10 rounded-md flex items-center justify-center font-bold text-lg relative ${
                        isAnswerPg || isAnswerEssay
                          ? "bg-green-400"
                          : "bg-[#E3FDFD]"
                      }`}
                      key={i}
                    >
                      {isMarking === true &&
                        ((questionsExam?.tipe_ujian === "pg" && !isAnswerPg) ||
                          (questionsExam?.tipe_ujian === "essay" &&
                            !isAnswerEssay)) && (
                          <Image
                            src="/img/examsStudent/flag.png"
                            alt="Mark"
                            width={200}
                            height={200}
                            className="size-2.5 absolute top-[5px] left-1.5"
                          />
                        )}
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="md:basis-1/2">
              {dataUjianRandom.map((item: any, i: number) => (
                <div className="mb-5" key={item.id}>
                  <h1 className="text-lg font-semibold" id="pertannyaan">
                    {i + 1}. {item.questions}
                  </h1>
                  {questionsExam?.tipe_ujian === "pg" ? (
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
                    </div>
                  )}
                  <Button
                    className="cursor-pointer text-base mt-3 bg-blue-500"
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
              ))}
            </div>
          </div>
          <AlertDialog open={timeOutDone} onOpenChange={setTimeOutDone}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Waktu Telah Habis</AlertDialogTitle>
                <AlertDialogDescription>
                  Ujian telah mencapai batas waktu yang telah ditentukan.
                  Jawaban Anda akan disimpan secara otomatis.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="cursor-pointer"
                  onClick={handleSendExam}
                >
                  Oke
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="mt-5">
            <Dialog>
              <DialogTrigger asChild>
                <button className="cursor-pointer px-6 py-2 rounded-md font-semibold text-lg border-2 border-slate-800 hover:opacity-60">
                  Selesai
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  {handleAnswerEmpty() === false ? (
                    <>
                      <DialogTitle className="mb-2">
                        Jawaban Kamu Belum Selesai
                      </DialogTitle>
                      <DialogDescription>
                        Terindikasi Bahwa Jawaban Belum Terisi Semua Apakah
                        Yakin Ingin Mengakhiri Sesi Ujian Ini ?
                      </DialogDescription>
                    </>
                  ) : (
                    <>
                      <DialogTitle className="mb-2">
                        Konfirmasi Ujian
                      </DialogTitle>
                      <DialogDescription>
                        Apakah Anda Yakin Ingin Menyelesaikan Ujian ini?
                      </DialogDescription>
                    </>
                  )}
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Kembali</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handleSendExam}>Akhiri Sekarang</Button>
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
      ) : (
        <SkeletonExam />
      )}
    </div>
  );
}
