"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { supabase } from "@/lib/supabase/data";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultExam() {
  const [getDataStudent, setGetDataStudent] = useState<any>([]);
  const [getDataExam, setGetDataExam] = useState<any>([]);

  const tes = getDataStudent.map((tes: any) => tes.answer_student);
  console.log(tes);

  useEffect(() => {
    async function handleView() {
      const { data: dataSoal, error } = await supabase
        .from("exams")
        .select("*");
      setGetDataExam(dataSoal);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      } else {
        console.log("data berhasil ditampilkan:");
      }
    }
    handleView();
  }, []);

  useEffect(() => {
    async function getDataAnswerStudent() {
      const { data, error } = await supabase.from("result-exam").select("*");
      setGetDataStudent(data);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      } else {
        console.log("data berhasil ditampilkan:");
      }
    }
    getDataAnswerStudent();
  }, []);

  return (
    <div>
      <NavigasiBar />
      <div className="w-11/12 mx-auto p-24">
        <div className="p-10 bg-blue-400 rounded-lg">
          <h1 className="text-2xl font-semibold">Lihat Hasil Ujian</h1>
          <div className="grid grid-cols-2 gap-5">
            {getDataExam.length > 0
              ? getDataExam
                  .flatMap((getQuestions: any) => getQuestions.questions_exam)
                  .map((item: any, i: number) => (
                    <div className="mt-5" key={item.id}>
                      <span className="font-bold mr-1 text-lg">{i + 1}.</span>

                      <h1 className="inline-block text-lg">{item.questions}</h1>
                      <ul className="ml-2 flex flex-col gap-2 mt-3">
                        {["a", "b", "c", "d", "e"].map((opt) => {
                          const answerKey = `answer_${opt}`;
                          const answerText = item.answerPg[answerKey];
                          return (
                            <li
                              key={opt}
                              className={`cursor-pointer w-fit px-3`}
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
          </div>
        </div>
      </div>
    </div>
  );
}
