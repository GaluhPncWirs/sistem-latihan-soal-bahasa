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

  return (
    <table className="border-collapse w-full">
      <thead>
        <tr className="bg-slate-500 border-2 border-black">
          <th className="text-slate-100 p-2">Pertanyaan</th>
          <th className="text-slate-100 p-2">Kelola</th>
        </tr>
      </thead>
      <tbody>
        {viewQuestions.length > 0
          ? viewQuestions.map((data: any) => (
              <tr className="border-2 border-black" key={data.id}>
                <td className="px-3 bg-stone-100 w-11/12">
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
                <td className="flex justify-center gap-3 items-center">
                  {/* <ul className="flex gap-3 flex-col justify-center items-center">
                    <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                      <Link href="">Edit</Link>
                    </li>
                    <li className="text-blue-500 font-semibold hover:text-blue-600 hover:underline">
                      <Link href="">Hapus</Link>
                    </li>
                  </ul> */}
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Soal</DialogTitle>
                          <DialogDescription>
                            Input Dibawah ini Untuk Mengedit Soal Pilihan Ganda
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-2">
                          <div>
                            <label htmlFor="editPertannyaan">
                              Edit Pertanyaan
                            </label>
                            <Input id="editPertannyaan" className="mt-2" />
                          </div>

                          <div className="mt-3">
                            <h1 className="mb-5">Edit Jawaban</h1>
                            <div className="flex flex-wrap justify-center gap-5">
                              <div>
                                <label htmlFor="">Jawaban A</label>
                                <Input />
                              </div>
                              <div>
                                <label htmlFor="">Jawaban B</label>
                                <Input />
                              </div>
                              <div>
                                <label htmlFor="">Jawaban C</label>
                                <Input />
                              </div>
                              <div>
                                <label htmlFor="">Jawaban D</label>
                                <Input />
                              </div>
                              <div>
                                <label htmlFor="">Jawaban E</label>
                                <Input />
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>

                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Hapus</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Hapus Soal</DialogTitle>
                          <DialogDescription>
                            Apakah Anda Benar - Benar Ingin Menghapus Soal ini ?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Hapus</Button>
                        </DialogFooter>
                      </DialogContent>
                    </form>
                  </Dialog>
                </td>
              </tr>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <tr key={i}>
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
