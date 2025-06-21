"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export default function Soal() {
  const [questions, setQuestions] = useState<any>([]);

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

  return (
    <div>
      <NavigasiBar />
      <div className="bg-stone-300 w-10/12 mx-auto mt-10">
        <div className="p-5">
          <h1 className="text-2xl font-semibold">Pertanyaaan Pilihan Ganda</h1>
          <div className="grid grid-cols-2">
            {questions.map((item: any, i: number) => (
              <div className="mt-5" key={item.id}>
                <span className="font-bold mr-1">{i + 1}.</span>
                <h1 className="inline-block">{item.questions}</h1>
                <ul className=" ml-2 flex flex-col gap-1 mt-2">
                  <Button variant="link" className="cursor-pointer w-fit">
                    A. {item.answer.answer_a}
                  </Button>
                  <Button variant="link" className="cursor-pointer w-fit">
                    B. {item.answer.answer_b}
                  </Button>
                  <Button variant="link" className="cursor-pointer w-fit">
                    C. {item.answer.answer_c}
                  </Button>
                  <Button variant="link" className="cursor-pointer w-fit">
                    D. {item.answer.answer_d}
                  </Button>
                  <Button variant="link" className="cursor-pointer w-fit">
                    E. {item.answer.answer_e}
                  </Button>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
