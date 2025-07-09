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
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ViewQuestions() {
  const [viewQuestions, setViewQuestions] = useState<any>([]);

  useEffect(() => {
    async function handleViewQuestions() {
      const { data, error } = await supabase.from("exams").select("*");
      setViewQuestions(data);
      if (error) {
        toast("Gagal ❌", {
          description: "data gagal ditampilkan:",
        });
      }
    }
    handleViewQuestions();
  }, []);

  async function handleDeleteExam(idExams: number) {
    const { error } = await supabase
      .from("exams")
      .delete()
      .eq("id", Number(idExams));

    if (error) {
      toast("Gagal ❌", {
        description: "Soal Gagal Dihapus",
      });
    } else {
      toast("Berhasil ✅", {
        description: "Soal Telah Berhasil Dihapus",
      });
    }
  }

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
                <td className="bg-slate-300 font-bold">{i + 1}</td>
                <td className="bg-stone-100 w-10/12">
                  <h1>{data.nama_ujian}</h1>
                </td>
                <td className="flex justify-center gap-3 items-center">
                  <Link
                    href={`/Teacher/manageExams?id=${data.id}`}
                    className="hover:bg-blue-500 bg-blue-400 px-3 py-1.5 rounded-md text-white"
                  >
                    Edit
                  </Link>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Hapus</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Hapus Soal</DialogTitle>
                        <DialogDescription>
                          Apakah Anda Benar - Benar Ingin Menghapus Soal{" "}
                          <span className="font-bold">{`${data.nama_ujian}`}</span>{" "}
                          ini ?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            className="cursor-pointer px-3 hover:bg-red-700"
                            onClick={() => handleDeleteExam(data.id)}
                          >
                            Hapus
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
