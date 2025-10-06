"use client";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import { useHandleInput } from "@/app/hooks/handleInput";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LayoutBodyContent from "@/layout/bodyContent";
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CorrectionEssay() {
  const [viewQuestionsExams, setViewQuestionsExams] = useState<any>({});
  const [giveAssesmentExams, setGiveAssesmentExams] = useState<any>({});
  const [finalResultAssesment, setFinalResultAssesment] = useState<number>(0);
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

  // untuk perhitungan hasil penilaian ujian

  function handleChooseAssesment(e: any) {
    setGiveAssesmentExams((prev: any) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function giveAssesment(idExamQuestions: any, idStudent: any) {
    const toNumberValue = Object.values(giveAssesmentExams).map(Number);
    const totalMaxNilai = toNumberValue.reduce((sum: any) => sum + 100, 0);
    const resultAssesment = toNumberValue.reduce(
      (sum: any, q: any) => sum + q,
      0
    );
    setFinalResultAssesment(
      Math.round((resultAssesment / totalMaxNilai) * 100)
    );

    const { error: errorAssesment } = await supabase
      .from("history-exam-student")
      .update({
        hasil_ujian: Math.round((resultAssesment / totalMaxNilai) * 100),
      })
      .eq("exam_id", idExamQuestions)
      .eq("student_id", idStudent);

    if (errorAssesment) {
      toast("Gagal ❌", {
        description: "Gagal menilai soal",
      });
    } else {
      toast("Berhasil ✅", {
        description: "Soal berhasil dinilai",
      });
    }
  }

  return (
    <LayoutBodyContent>
      {Object.values(viewQuestionsExams).length > 0 ? (
        <>
          <h1 className="text-3xl font-semibold">Koreksi Soal Essay</h1>
          <div className="h-1 bg-slate-700 rounded-lg my-3" />
          <h2 className="text-xl font-semibold mb-7">
            Nama Ujian : {viewQuestionsExams.exams?.nama_ujian}
          </h2>
          <div>
            {viewQuestionsExams.exams?.questions_exam?.map(
              (item: any, i: number) => (
                <div
                  className="mt-5 rounded-lg p-5 mr-3 max-[640px]:w-full sm:w-full md:w-auto flex max-[640px]:gap-5 sm:gap-5 md:gap-10 items-center max-[640px]:flex-col sm:flex-col md:flex-row"
                  key={i}
                >
                  <div className="max-[640px]:w-full sm:w-11/12 md:basis-1/2 lg:basis-2/3">
                    <h1 className="text-xl font-semibold">
                      <span className="mr-0.5">{i + 1}.</span> {item.questions}
                    </h1>
                    <div className="mt-3">
                      <label className="mb-2 font-semibold ml-1.5 inline-block">
                        Jawaban Siswa :
                      </label>
                      <Textarea
                        className="border-black border-2 font-bold h-24"
                        disabled
                        defaultValue={
                          viewQuestionsExams.answer_student?.[item.id] || ""
                        }
                      />
                    </div>
                  </div>

                  <div className="max-[640px]:w-full sm:w-11/12 md:basis-1/2 lg:basis-2/5">
                    <h1 className="text-lg font-semibold">Beri Penilaian</h1>
                    <div className="flex justify-evenly items-center my-3 gap-2 bg-slate-200 rounded-md p-1.5">
                      <div className="flex flex-col items-center">
                        <label className="font-medium" htmlFor={item.id}>
                          SL
                        </label>
                        <Input
                          type="radio"
                          name={item.id}
                          className="cursor-pointer w-5"
                          value="100"
                          onClick={(e) => handleChooseAssesment(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="font-medium" htmlFor={item.id}>
                          B
                        </label>
                        <Input
                          type="radio"
                          name={item.id}
                          className="cursor-pointer w-5"
                          value="75"
                          onClick={(e) => handleChooseAssesment(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="font-medium" htmlFor={item.id}>
                          SB
                        </label>
                        <Input
                          type="radio"
                          name={item.id}
                          className="cursor-pointer w-5"
                          value="50"
                          onClick={(e) => handleChooseAssesment(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label className="font-medium" htmlFor={item.id}>
                          S
                        </label>
                        <Input
                          type="radio"
                          name={item.id}
                          className="cursor-pointer w-5"
                          value="0"
                          onClick={(e) => handleChooseAssesment(e)}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-rose-600 font-semibold">
                      <h1>*Keterangan</h1>
                      <ul className="flex justify-evenly items-center mt-2">
                        <li>
                          Sangat Benar{" "}
                          <span className="text-base block text-center">
                            100
                          </span>
                        </li>
                        <li>
                          Benar{" "}
                          <span className="text-base block text-center">
                            75
                          </span>
                        </li>
                        <li>
                          Setengah Benar{" "}
                          <span className="text-base block text-center">
                            50
                          </span>
                        </li>
                        <li>
                          Salah{" "}
                          <span className="text-base block text-center">0</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            )}
            <div className="flex justify-between mt-7">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-full px-5 rounded-md text-lg cursor-pointer bg-[#3282B8] hover:bg-blue-500">
                    Beri Nilai
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-3">
                      Konfirmasi Penilaian Siswa
                    </DialogTitle>
                    <DialogDescription>
                      Apakah Penilaian ini Sudah Benar ? Dengan Hasil Dari Nilai
                      Ujian Keseluruhan {finalResultAssesment}/100
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() =>
                          giveAssesment(
                            viewQuestionsExams.exam_id,
                            searchParamsIdStudent
                          )
                        }
                      >
                        Ya Tentu
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link
                href="/Teacher/dashboard"
                className="py-2 px-5 rounded-md text-lg font-semibold border border-black"
              >
                Kembali
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/3 h-10 bg-slate-500 animate-pulse rounded-md"></div>
          <div className="h-1 bg-slate-500 animate-pulse rounded-md my-3" />
          <div className="w-1/2 h-7 bg-slate-500 animate-pulse rounded-md mb-7"></div>
          <div>
            {Array.from({ length: 5 }).map((_: any, i: any) => (
              <div
                className="mt-5 bg-slate-500 animate-pulse rounded-lg p-5 mr-3 max-[640px]:w-full sm:w-full md:w-auto flex max-[640px]:gap-5 sm:gap-5 md:gap-10 items-center max-[640px]:flex-col sm:flex-col md:flex-row"
                key={i}
              >
                <div className="max-[640px]:w-full sm:w-11/12 md:basis-1/2 lg:basis-2/3">
                  <div className="h-16 bg-slate-400 animate-pulse rounded-md"></div>
                  <div className="mt-4">
                    <div className="mb-2 w-1/6 bg-slate-400 animate-pulse rounded-md h-6"></div>
                    <div className="h-20 bg-slate-400 animate-pulse rounded-md"></div>
                  </div>
                </div>

                <div className="max-[640px]:w-full sm:w-11/12 md:basis-1/2 lg:basis-2/5">
                  <div className="w-1/3 h-5 bg-slate-400 animate-pulse rounded-md"></div>
                  <div className="flex justify-evenly items-center my-3 gap-2 bg-slate-400 animate-pulse rounded-md p-1.5">
                    <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
                    <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
                    <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
                    <div className="h-7 w-1/6 bg-slate-500 animate-pulse rounded-md"></div>
                  </div>
                  <div>
                    <h1 className="w-1/4 h-5 bg-slate-400 animate-pulse rounded-md"></h1>
                    <ul className="flex justify-evenly items-center mt-3">
                      <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                      <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                      <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                      <li className="bg-slate-400 animate-pulse rounded-md w-1/5 h-7"></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-7">
              <div className="w-1/6 h-8 bg-slate-500 animate-pulse rounded-md"></div>
              <div className="w-1/6 h-8 bg-slate-500 animate-pulse rounded-md"></div>
            </div>
          </div>
        </>
      )}
    </LayoutBodyContent>
  );
}
