"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export default function Soal() {
  const [questions, setQuestions] = useState<any>([]);
  const [clickedAnswer, setClickedAnswer] = useState<{
    [questions: string]: string;
  }>({});

  useEffect(() => {
    async function handleViewQuestions() {
      const { data, error } = await supabase.from("for-questions").select("*");
      setQuestions(data);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      } else {
        console.log("Data berhasil ditampilkan:", data);
      }
    }
    handleViewQuestions();
  }, []);

  function handleSelectedAnswer(questionsId: string, answer: string) {
    setClickedAnswer((prev) => ({
      ...prev,
      [questionsId]: answer,
    }));
  }

  return (
    <div>
      <NavigasiBar />
      <div className="bg-blue-300 w-10/12 mx-auto my-10 rounded-xl">
        <div className="p-10">
          <h1 className="text-2xl font-semibold">Pertanyaaan Pilihan Ganda</h1>
          <div className="grid grid-cols-2 gap-5">
            {questions.length > 0
              ? questions.map((item: any, i: number) => (
                  <div className="mt-5" key={item.id}>
                    <span className="font-bold mr-1 text-lg">{i + 1}.</span>
                    <h1 className="inline-block text-lg">{item.questions}</h1>
                    <ul className="ml-2 flex flex-col gap-2 mt-3">
                      {["a", "b", "c", "d", "e"].map((opt) => {
                        const answerKey = `answer_${opt}`;
                        const answerText = item.answer[answerKey];
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
              : Array.from({ length: 7 }).map((_, i) => (
                  <div className="mt-5" key={i}>
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
