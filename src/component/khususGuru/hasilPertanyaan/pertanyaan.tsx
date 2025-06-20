import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViewQuestions() {
  const [viewQuestions, setViewQuestions] = useState<any>([]);

  useEffect(() => {
    async function handleViewQuestions() {
      const { data, error } = await supabase.from("for-questions").select("*");
      setViewQuestions(data);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      } else {
        console.log("Data berhasil ditampilkan:", data);
      }
    }
    handleViewQuestions();
  }, []);

  console.log(viewQuestions);

  return (
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-slate-500 border-2 border-black">
          <th className="text-slate-100 p-2">Pertanyaan</th>
          <th className="text-slate-100 p-2">Kelola</th>
        </tr>
      </thead>
      <tbody>
        {viewQuestions.length < 0 ? (
          <h1>Loading....</h1>
        ) : (
          viewQuestions.map((data: any) => (
            <tr className="border-2 border-black" key={data.id}>
              <td className="px-3 bg-stone-100">
                <h1>{data.questions}</h1>
                <ul className="flex justify-around flex-wrap items-center my-2">
                  <li
                    className={`${
                      data.correctAnswer === data.answer.answer_a
                        ? `bg-blue-400 px-3 py-1 rounded-lg`
                        : `bg-stone-100 px-0 py-0 rounded-none`
                    }`}
                  >
                    A. {data.answer.answer_a}
                  </li>
                  <li
                    className={`${
                      data.correctAnswer === data.answer.answer_b
                        ? `bg-blue-400 px-3 py-1 rounded-lg`
                        : `bg-stone-100 px-0 py-0 rounded-none`
                    }`}
                  >
                    B. {data.answer.answer_b}
                  </li>
                  <li
                    className={`${
                      data.correctAnswer === data.answer.answer_c
                        ? `bg-blue-400 px-3 py-1 rounded-lg`
                        : `bg-stone-100 px-0 py-0 rounded-none`
                    }`}
                  >
                    C. {data.answer.answer_c}
                  </li>
                  <li
                    className={`${
                      data.correctAnswer === data.answer.answer_d
                        ? `bg-blue-400 px-3 py-1 rounded-lg`
                        : `bg-stone-100 px-0 py-0 rounded-none`
                    }`}
                  >
                    D. {data.answer.answer_d}
                  </li>
                  <li
                    className={`${
                      data.correctAnswer === data.answer.answer_e
                        ? `bg-blue-400 px-3 py-1 rounded-lg`
                        : `bg-stone-100 px-0 py-0 rounded-none`
                    }`}
                  >
                    E. {data.answer.answer_e}
                  </li>
                </ul>
              </td>
              <td className="bg-stone-300">
                <ul className="flex gap-3 flex-col justify-center items-center">
                  <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                    <Link href="">Edit</Link>
                  </li>
                  <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                    <Link href="">Hapus</Link>
                  </li>
                </ul>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
