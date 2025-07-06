"use client";
import NavigasiBar from "@/component/navigasiBar/navbar";
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
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase/data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ViewQuestions() {
  const [viewQuestions, setViewQuestions] = useState<any>([]);
  const [newAnswer, setNewAnswer] = useState({
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    answer_e: "",
  });
  const [selectCorrectNewAnswer, setSelectCorrectNewAnswer] = useState("");
  const [updateQuestion, setUpdateQuestion] = useState("");
  const searchParams = useSearchParams();
  const idExams = searchParams.get("id");

  useEffect(() => {
    async function handleViewQuestions() {
      const { data, error } = await supabase
        .from("exams")
        .select("questions_exam")
        .eq("id", Number(idExams));
      setViewQuestions(data);
      if (error) {
        console.log("data gagal ditampilkan:", error.message);
      }
    }
    handleViewQuestions();
  }, []);

  async function handleUpdateQuestions(idQuestion: string) {
    const { data: examData, error: fetchError }: any = await supabase
      .from("exams")
      .select("questions_exam");

    // const inQuestionData = examData.flatMap((data: any) => data.questions_exam);
    const inQuestionData = examData.find((exam: any) =>
      exam.questions_exam?.some((q: any) => q.id === idQuestion)
    );

    if (fetchError) {
      toast("Gagal Ambil Data", { description: "Ujian tidak ditemukan" });
    } else {
      const updateData = inQuestionData.questions_exam.map((q: any) =>
        q.id === idQuestion
          ? {
              ...q,
              questions: updateQuestion,
              answerPg: newAnswer,
              correctAnswer: selectCorrectNewAnswer,
            }
          : q
      );
      const { error } = await supabase
        .from("exams")
        .update({ questions_exam: updateData })
        .eq("id", idQuestion);

      if (error) {
        toast("Gagal ❌", {
          description: "Soal gagal diedit. Coba periksa kembali.",
        });
      } else {
        toast("Berhasil ✅", {
          description: "Soal berhasil diperbarui.",
        });
      }
    }
  }

  async function handleDeleteQuestions(idQuestion: number) {
    const { error } = await supabase
      .from("exams")
      .delete()
      .eq("id", idQuestion);
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

  function handleUpdateAnswer(event: any) {
    const { id, value } = event.target;
    setNewAnswer((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function getDataBeforeUpdate(questions: string, answers: object) {
    setUpdateQuestion(questions);
    setNewAnswer((prev) => ({
      ...prev,
      ...answers,
    }));
  }

  return (
    <div>
      <NavigasiBar />
      <Toaster richColors />
      <div className="w-11/12 mx-auto pt-28">
        <h1 className="text-3xl font-bold mb-7">Edit Soal</h1>
        <table className="border-collapse">
          <thead>
            <tr className="bg-slate-500 border-2 border-black ">
              <th className="text-slate-100 p-2 font-bold">No</th>
              <th className="text-slate-100 p-2 font-bold">Soal Ujian</th>
              <th className="text-slate-100 p-2 font-bold">Kelola</th>
            </tr>
          </thead>
          <tbody>
            {viewQuestions
              .flatMap((questions: any) => questions.questions_exam)
              .map((data: any, i: number) => (
                <tr className="border-2 border-black" key={data.id}>
                  <td className="px-3 bg-slate-300">{i + 1}</td>
                  <td className="px-3 bg-stone-100 w-11/12">
                    <h1>{data.questions}</h1>
                    <ul className="flex justify-around flex-wrap items-center my-2">
                      <li
                        className={`${
                          data.correctAnswer === data.answerPg.answer_a
                            ? `bg-blue-400 px-3 py-1 rounded-lg`
                            : `bg-stone-100 px-0 py-0 rounded-none`
                        }`}
                      >
                        A. {data.answerPg.answer_a}
                      </li>
                      <li
                        className={`${
                          data.correctAnswer === data.answerPg.answer_b
                            ? `bg-blue-400 px-3 py-1 rounded-lg`
                            : `bg-stone-100 px-0 py-0 rounded-none`
                        }`}
                      >
                        B. {data.answerPg.answer_b}
                      </li>
                      <li
                        className={`${
                          data.correctAnswer === data.answerPg.answer_c
                            ? `bg-blue-400 px-3 py-1 rounded-lg`
                            : `bg-stone-100 px-0 py-0 rounded-none`
                        }`}
                      >
                        C. {data.answerPg.answer_c}
                      </li>
                      <li
                        className={`${
                          data.correctAnswer === data.answerPg.answer_d
                            ? `bg-blue-400 px-3 py-1 rounded-lg`
                            : `bg-stone-100 px-0 py-0 rounded-none`
                        }`}
                      >
                        D. {data.answerPg.answer_d}
                      </li>
                      <li
                        className={`${
                          data.correctAnswer === data.answerPg.answer_e
                            ? `bg-blue-400 px-3 py-1 rounded-lg`
                            : `bg-stone-100 px-0 py-0 rounded-none`
                        }`}
                      >
                        E. {data.answerPg.answer_e}
                      </li>
                    </ul>
                  </td>
                  <td className="flex justify-center gap-3 items-center">
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() =>
                              getDataBeforeUpdate(data.questions, data.answerPg)
                            }
                          >
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Soal</DialogTitle>
                            <DialogDescription>
                              Input Dibawah ini Untuk Mengedit Soal Pilihan
                              Ganda
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-2">
                            <div>
                              <label htmlFor="questions">Edit Pertanyaan</label>
                              <Input
                                id="questions"
                                className="mt-2"
                                onChange={(e: any) =>
                                  setUpdateQuestion(e.currentTarget.value)
                                }
                                defaultValue={updateQuestion}
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
                                    defaultValue={newAnswer.answer_a}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="answer_b">Jawaban B</label>
                                  <Input
                                    id="answer_b"
                                    onChange={handleUpdateAnswer}
                                    defaultValue={newAnswer.answer_b}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="answer_c">Jawaban C</label>
                                  <Input
                                    id="answer_c"
                                    onChange={handleUpdateAnswer}
                                    defaultValue={newAnswer.answer_c}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="answer_d">Jawaban D</label>
                                  <Input
                                    id="answer_d"
                                    onChange={handleUpdateAnswer}
                                    defaultValue={newAnswer.answer_d}
                                  />
                                </div>
                                <div>
                                  <label htmlFor="answer_e">Jawaban E</label>
                                  <Input
                                    id="answer_e"
                                    onChange={handleUpdateAnswer}
                                    defaultValue={newAnswer.answer_e}
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
                                defaultValue={data.correctAnswer}
                              >
                                <SelectTrigger className="w-2/3">
                                  <SelectValue placeholder="Pilih Jawaban Yang Benar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value={
                                      newAnswer.answer_a ||
                                      data.answerPg.answer_a
                                    }
                                  >
                                    {newAnswer.answer_a ||
                                      data.answerPg.answer_a}
                                  </SelectItem>
                                  <SelectItem
                                    value={
                                      newAnswer.answer_b ||
                                      data.answerPg.answer_b
                                    }
                                  >
                                    {newAnswer.answer_b ||
                                      data.answerPg.answer_b}
                                  </SelectItem>
                                  <SelectItem
                                    value={
                                      newAnswer.answer_c ||
                                      data.answerPg.answer_c
                                    }
                                  >
                                    {newAnswer.answer_c ||
                                      data.answerPg.answer_c}
                                  </SelectItem>
                                  <SelectItem
                                    value={
                                      newAnswer.answer_d ||
                                      data.answerPg.answer_d
                                    }
                                  >
                                    {newAnswer.answer_d ||
                                      data.answerPg.answer_d}
                                  </SelectItem>
                                  <SelectItem
                                    value={
                                      newAnswer.answer_e ||
                                      data.answerPg.answer_e
                                    }
                                  >
                                    {newAnswer.answer_e ||
                                      data.answerPg.answer_e}
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
                              {`Apakah Anda Benar - Benar Ingin Menghapus Soal ini ?`}
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
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
