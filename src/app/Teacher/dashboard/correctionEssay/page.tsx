"use client";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import { useHandleInput } from "@/app/hooks/handleInput";
import { Button } from "@/components/ui/button";
import {
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
import { Dialog } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CorrectionEssay() {
  const [viewQuestionsExams, setViewQuestionsExams] = useState<any>([]);
  const [giveAssesmentExams, setGiveAssesmentExams] = useState<any>({});
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

  // async function giveAssesment(idExamQuestions: any, idStudent: any) {
  //   const toNumberValue = Object.values(giveAssesmentExams).map(Number);
  //   const totalMaxNilai = toNumberValue.reduce((sum: any) => sum + 100, 0);
  //   const resultAssesment = toNumberValue.reduce(
  //     (sum: any, q: any) => sum + q,
  //     0
  //   );

  //   const { error: errorAssesment } = await supabase
  //     .from("history-exam-student")
  //     .update({
  //       hasil_ujian: Math.round((resultAssesment / totalMaxNilai) * 100),
  //     })
  //     .eq("exam_id", idExamQuestions)
  //     .eq("student_id", idStudent);

  //   if (errorAssesment) {
  //     toast("Gagal ❌", {
  //       description: "Gagal menilai soal",
  //     });
  //   } else {
  //     toast("Berhasil ✅", {
  //       description: "Soal berhasil dinilai",
  //     });
  //   }
  // }

  function handleChooseAssesment(e: any) {
    setGiveAssesmentExams((prev: any) => {
      // const valuesId = Object.keys(giveAssesmentExams)
      // console.log(valuesId);
      // if(giveAssesmentExams.nameOption)
      return {
        ...prev,
        // nameOption: e.target.name,
        [e.target.id]: e.target.value,
      };
    });
  }

  console.log(giveAssesmentExams);

  return (
    <LayoutBodyContent>
      <div className="mx-auto pt-28 max-[640px]:w-11/12 sm:w-11/12 md:w-10/12">
        <h1 className="text-3xl font-bold">Koreksi Soal Essay</h1>
        {/* <div>
          {viewQuestionsExams.exams?.questions_exam?.map(
            (item: any, i: number) => (
              <div
                className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3 max-[640px]:w-full sm:w-full md:w-auto flex justify-around items-center"
                key={i}
              >
                <div className="basis-2/3">
                  <h1 className="text-lg font-semibold">
                    <span className="font-bold mr-0.5 text-lg ">{i + 1}.</span>{" "}
                    {item.questions}
                  </h1>
                  <div className="mt-3">
                    <label className="mb-1 font-semibold ml-1.5 inline-block">
                      Jawaban Siswa :
                    </label>
                    <Textarea
                      className="border-slate-600 border-2 font-bold"
                      disabled
                      defaultValue={
                        viewQuestionsExams.answer_student?.[item.id] || ""
                      }
                    />
                  </div>
                </div>
                <div className="basis-1/4">
                  <label className="text-lg font-semibold" htmlFor={item.id}>
                    Beri Penilaian
                  </label>
                  <Input
                    type="number"
                    className="border-slate-600 border-2 mt-3"
                    id={item.id}
                    onChange={(e) => {
                      setGiveAssesmentExams((prev: any) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            )
          )}
          <div className="flex justify-between mt-7">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-400 h-full px-5 rounded-md text-lg font-semibold hover:bg-blue-500 text-black cursor-pointer">
                  Beri Penilaian
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Konfirmasi Penilaian Siswa</DialogTitle>
                  <DialogDescription>
                    Apakah Penilaian ini Sudah Benar ?
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
              className="bg-blue-400 py-2 px-7 rounded-md text-lg font-semibold hover:bg-blue-500"
            >
              Kembali
            </Link>
          </div>
        </div> */}

        <div>
          {viewQuestionsExams.exams?.questions_exam?.map(
            (item: any, i: number) => (
              <div
                className="mt-4 bg-[#08D9D6] rounded-lg p-7 mr-3 max-[640px]:w-full sm:w-full md:w-auto flex gap-5 items-center"
                key={i}
              >
                <div className="basis-2/3">
                  <h1 className="text-lg font-semibold">
                    <span className="font-bold mr-0.5 text-lg ">{i + 1}.</span>{" "}
                    {item.questions}
                  </h1>
                  <div className="mt-3">
                    <label className="mb-1 font-semibold ml-1.5 inline-block">
                      Jawaban Siswa :
                    </label>
                    <Textarea
                      className="border-slate-600 border-2 font-bold"
                      disabled
                      defaultValue={
                        viewQuestionsExams.answer_student?.[item.id] || ""
                      }
                    />
                  </div>
                </div>

                <div className="basis-1/3">
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
                        id="sangatBenar"
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
                        id="benar"
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
                        id="setengahBenar"
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
                        id="salah"
                        onClick={(e) => handleChooseAssesment(e)}
                      />
                    </div>
                  </div>

                  {/* <Input
                    type="number"
                    className="border-slate-600 border-2 mt-3"
                    id={item.id}
                    onChange={(e) => {
                      setGiveAssesmentExams((prev: any) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }));
                    }}
                  /> */}
                  <div className="text-sm text-red-500 font-semibold">
                    <h1>*Keterangan</h1>
                    <ul className="flex justify-evenly items-center">
                      <li>Sangat Benar</li>
                      <li>Benar</li>
                      <li>Setengah Benar</li>
                      <li>Salah</li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          )}
          {/* <div className="flex justify-between mt-7">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-400 h-full px-5 rounded-md text-lg font-semibold hover:bg-blue-500 text-black cursor-pointer">
                  Beri Penilaian
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Konfirmasi Penilaian Siswa</DialogTitle>
                  <DialogDescription>
                    Apakah Penilaian ini Sudah Benar ?
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
              className="bg-blue-400 py-2 px-7 rounded-md text-lg font-semibold hover:bg-blue-500"
            >
              Kembali
            </Link>
          </div> */}
        </div>
      </div>
    </LayoutBodyContent>
  );
}
