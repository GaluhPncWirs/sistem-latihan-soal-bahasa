import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ViewQuestions() {
  const [viewQuestions, setViewQuestions] = useState<any>([]);

  useEffect(() => {
    async function handleViewQuestions() {
      const { data, error } = await supabase.from("exams").select("*");
      setViewQuestions(data);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      }
    }
    handleViewQuestions();
  }, []);

  return (
    <table className="border-collapse w-10/12 mx-auto">
      <thead>
        <tr className="bg-slate-500 border-2 border-black ">
          <th className="text-slate-100 p-2 font-bold">No</th>
          <th className="text-slate-100 p-2 font-bold">Nama Ujian</th>
          <th className="text-slate-100 p-2 font-bold">Kelola</th>
        </tr>
      </thead>
      <tbody>
        {viewQuestions.length > 0
          ? viewQuestions.map((data: any, i: number) => (
              <tr className="border-2 border-black" key={data.id}>
                <td className="bg-slate-300 font-bold text-center">{i + 1}</td>
                <td className="bg-stone-100 w-10/12">
                  <h1>{data.nama_ujian}</h1>
                </td>
                <td className="flex justify-center gap-3 items-center">
                  <Link
                    href={`/Teacher/manageExams?id=${data.id}`}
                    className="hover:text-blue-700 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          : Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td className="bg-stone-300 px-4 py-6 animate-pulse w-1/12">
                  <div className="h-4 bg-gray-500 rounded w-full mb-2"></div>
                </td>
                <td className="bg-stone-300 px-4 py-6 animate-pulse w-10/12">
                  <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                  <div className="h-4 bg-gray-500 rounded w-1/2 mb-2"></div>
                </td>
                <td className="bg-stone-300 px-4 py-6 animate-pulse">
                  <div className="h-4 bg-gray-500 rounded w-10/12 mb-2"></div>
                  <div className="h-4 bg-gray-500 rounded w-11/12 mb-2"></div>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
