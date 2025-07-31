import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";

export default function ManageStudent() {
  const [dataStudents, setDataStudents] = useState<any>([]);

  useEffect(() => {
    async function getDataStudent() {
      const { data, error } = await supabase
        .from("account-student")
        .select("fullName,classes,idStudent,email");
      setDataStudents(data);
      if (error) {
        console.log("data gagal diambil");
      }
    }
    getDataStudent();
  }, []);

  return (
    <table className="border-collapse w-10/12 mx-auto">
      <thead>
        <tr className="bg-slate-500 border-2 border-black ">
          <th className="text-slate-100 p-2 font-bold">No</th>
          <th className="text-slate-100 p-2 font-bold">Nama Siswa</th>
          <th className="text-slate-100 p-2 font-bold">Email</th>
          <th className="text-slate-100 p-2 font-bold">Kelas</th>
        </tr>
      </thead>
      <tbody>
        {dataStudents.length > 0
          ? dataStudents.map((data: any, i: number) => (
              <tr className="border-2 border-black" key={data.idStudent}>
                <td className="bg-slate-300 font-bold">{i + 1}</td>
                <td className="bg-stone-200 w-1/2">
                  <h1>{data.fullName}</h1>
                </td>
                <td className="bg-stone-100">{data.email}</td>
                <td>{data.classes}</td>
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
