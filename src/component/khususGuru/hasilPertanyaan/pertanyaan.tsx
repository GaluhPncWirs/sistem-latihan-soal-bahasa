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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useRef, useState } from "react";

export default function ViewQuestions() {
  const [viewQuestions, setViewQuestions] = useState<any>([]);
  const [newAnswer, setNewAnswer] = useState({
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    answer_e: "",
  });
  const newQuestion = useRef<any>(null);
  const [selectCorrectNewAnswer, setSelectCorrectNewAnswer] = useState("");
  // const [modal, setModal] = useState({
  //   success: false,
  //   failed: false,
  // });

  useEffect(() => {
    async function handleViewQuestions() {
      const { data, error } = await supabase.from("for-questions").select("*");
      setViewQuestions(data);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      }
    }
    handleViewQuestions();
  }, []);

  async function handleDeleteQuestions(idQuestion: number) {
    const { data, error } = await supabase
      .from("for-questions")
      .delete()
      .eq("id", idQuestion);
    if (error) {
      console.log("data gagal dihapus:", error.message);
    } else {
      console.log("data berhasil dihapus:", data);
    }
  }

  async function handleUpdateQuestions(idQuestion: number) {
    const updateData = {
      questions: newQuestion.current.value || "",
      answer: newAnswer,
      correctAnswer: selectCorrectNewAnswer,
    };

    const { data, error } = await supabase
      .from("for-questions")
      .update(updateData)
      .eq("id", idQuestion);
    if (error) {
      console.log("data gagal diedit:", error.message);
    } else {
      console.log("data berhasil diedit:", data);
    }
  }

  function handleUpdateAnswer(event: any) {
    const { id, value } = event.target;
    setNewAnswer((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

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
                            <Input
                              id="editPertannyaan"
                              className="mt-2"
                              ref={newQuestion}
                            />
                          </div>

                          <div className="mt-3">
                            <h1 className="mb-2">Edit Jawaban</h1>
                            <div className="flex flex-wrap justify-center gap-5">
                              <div>
                                <label htmlFor="answer_a">Jawaban A</label>
                                <Input
                                  id="answer_a"
                                  onChange={handleUpdateAnswer}
                                  value={newAnswer.answer_a}
                                />
                              </div>
                              <div>
                                <label htmlFor="answer_b">Jawaban B</label>
                                <Input
                                  id="answer_b"
                                  onChange={handleUpdateAnswer}
                                  value={newAnswer.answer_b}
                                />
                              </div>
                              <div>
                                <label htmlFor="answer_c">Jawaban C</label>
                                <Input
                                  id="answer_c"
                                  onChange={handleUpdateAnswer}
                                  value={newAnswer.answer_c}
                                />
                              </div>
                              <div>
                                <label htmlFor="answer_d">Jawaban D</label>
                                <Input
                                  id="answer_d"
                                  onChange={handleUpdateAnswer}
                                  value={newAnswer.answer_d}
                                />
                              </div>
                              <div>
                                <label htmlFor="answer_e">Jawaban E</label>
                                <Input
                                  id="answer_e"
                                  onChange={handleUpdateAnswer}
                                  value={newAnswer.answer_e}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-2">
                            <h1 className="mb-3">Pilih Jawaban</h1>
                            <Select
                              onValueChange={(val) =>
                                setSelectCorrectNewAnswer(val)
                              }
                            >
                              <SelectTrigger className="w-2/3">
                                <SelectValue placeholder="Pilih Jawaban Yang Benar" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={newAnswer.answer_a || "tes"}>
                                  {newAnswer.answer_a || "tes"}
                                </SelectItem>
                                <SelectItem
                                  value={newAnswer.answer_b || "tes2"}
                                >
                                  {newAnswer.answer_b || "tes2"}
                                </SelectItem>
                                <SelectItem
                                  value={newAnswer.answer_c || "tes3"}
                                >
                                  {newAnswer.answer_c || "tes3"}
                                </SelectItem>
                                <SelectItem
                                  value={newAnswer.answer_d || "tes4"}
                                >
                                  {newAnswer.answer_d || "tes4"}
                                </SelectItem>
                                <SelectItem
                                  value={newAnswer.answer_e || "tes5"}
                                >
                                  {newAnswer.answer_e || "tes5"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              onClick={() => handleUpdateQuestions(data.id)}
                            >
                              Save Changes
                            </Button>
                          </DialogClose>
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
                          <DialogClose asChild>
                            <Button
                              onClick={() => handleDeleteQuestions(data.id)}
                            >
                              Hapus
                            </Button>
                          </DialogClose>
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
