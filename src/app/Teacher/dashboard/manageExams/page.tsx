"use client";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LayoutBodyContent from "@/layout/bodyContent";
import { supabase } from "@/lib/supabase/data";
import Link from "next/link";
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
  const searchParams = useSearchParams().get("id");
  const idTeacher = useGetIdTeacher();

  useEffect(() => {
    if (!idTeacher) return;
    async function handleViewQuestions() {
      const { data, error } = await supabase
        .from("exams")
        .select("*")
        .eq("id", Number(searchParams))
        .eq("idTeacher", idTeacher)
        .single();

      if (error) {
        toast("Gagal ❌", {
          description: "Soal gagal ditampilkan.",
        });
      }
      setViewQuestions(data);
    }
    handleViewQuestions();
  }, [idTeacher]);

  async function handleUpdateQuestions(idQuestion: string) {
    const { data: examData, error: fetchError }: any = await supabase
      .from("exams")
      .select("id,questions_exam,tipeUjian")
      .eq("id", Number(searchParams))
      .single();

    if (fetchError) {
      toast("Gagal Ambil Data", { description: "Ujian tidak ditemukan" });
    } else {
      const updateDataExams: any = (examData?.questions_exam || []).map(
        (q: any) => {
          if (q.id === idQuestion && examData.tipeUjian === "pg") {
            return {
              ...q,
              questions: updateQuestion,
              answerPg: newAnswer,
              correctAnswer: selectCorrectNewAnswer,
            };
          } else if (q.id === idQuestion && examData.tipeUjian === "essay") {
            return {
              ...q,
              questions: updateQuestion,
            };
          } else {
            return q;
          }
        }
      );
      const { error } = await supabase
        .from("exams")
        .update({ questions_exam: updateDataExams })
        .eq("id", Number(searchParams));

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
    const { data, error }: any = await supabase
      .from("exams")
      .select("id, questions_exam")
      .eq("id", Number(searchParams))
      .single();

    const updatedQuestions = data.questions_exam.filter(
      (q: any) => q.id !== idQuestion
    );

    if (error) {
      toast("Gagal ❌", {
        description: "Soal Gagal Dihapus",
      });
    } else {
      const { error: errorDeleteData }: any = await supabase
        .from("exams")
        .update({ questions_exam: updatedQuestions })
        .eq("id", Number(searchParams));

      if (errorDeleteData) {
        toast("Gagal ❌", {
          description: "Soal Gagal Dihapus",
        });
      } else {
        toast("Berhasil ✅", {
          description: "Soal Telah Berhasil Dihapus",
        });
      }
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
    <LayoutBodyContent>
      <div className="w-11/12 mx-auto pt-24">
        <h1 className="text-4xl font-bold mb-5 text-center">Edit Soal</h1>
        <h2 className="text-2xl font-bold mb-10">
          Nama Ujian : {viewQuestions.nama_ujian || ""}
        </h2>
        <Table>
          <TableHeader className="bg-[#3282B8]">
            <TableRow>
              <TableHead className="text-base">No</TableHead>
              <TableHead className="text-center text-base">
                Soal Ujian
              </TableHead>
              <TableHead className="text-center text-base">Kelola</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {viewQuestions.tipeUjian === "pg"
              ? viewQuestions.questions_exam?.map((data: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <h1 className="mb-2 font-semibold">{data.questions}</h1>
                      <ul className="flex justify-around flex-wrap items-center my-2 max-[640px]:gap-3 sm:gap-3 md:gap-1">
                        <li
                          className={`${
                            data.correctAnswer === data.answerPg.answer_a
                              ? `bg-blue-400 px-3 py-1 rounded-lg`
                              : `px-0 py-0 rounded-none`
                          }`}
                        >
                          A. {data.answerPg.answer_a}
                        </li>
                        <li
                          className={`${
                            data.correctAnswer === data.answerPg.answer_b
                              ? `bg-blue-400 px-3 py-1 rounded-lg`
                              : `px-0 py-0 rounded-none`
                          }`}
                        >
                          B. {data.answerPg.answer_b}
                        </li>
                        <li
                          className={`${
                            data.correctAnswer === data.answerPg.answer_c
                              ? `bg-blue-400 px-3 py-1 rounded-lg`
                              : `px-0 py-0 rounded-none`
                          }`}
                        >
                          C. {data.answerPg.answer_c}
                        </li>
                        <li
                          className={`${
                            data.correctAnswer === data.answerPg.answer_d
                              ? `bg-blue-400 px-3 py-1 rounded-lg`
                              : `px-0 py-0 rounded-none`
                          }`}
                        >
                          D. {data.answerPg.answer_d}
                        </li>
                        <li
                          className={`${
                            data.correctAnswer === data.answerPg.answer_e
                              ? `bg-blue-400 px-3 py-1 rounded-lg`
                              : `px-0 py-0 rounded-none`
                          }`}
                        >
                          E. {data.answerPg.answer_e}
                        </li>
                      </ul>
                    </TableCell>
                    <TableCell className="flex justify-center gap-3 items-center">
                      <Dialog>
                        <form>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() =>
                                getDataBeforeUpdate(
                                  data.questions,
                                  data.answerPg
                                )
                              }
                              className="cursor-pointer hover:bg-blue-500 bg-blue-400"
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
                            <div className="grid gap-2 max-[640px]:gap-1">
                              <div>
                                <label htmlFor="questions">
                                  Edit Pertanyaan
                                </label>
                                <Input
                                  id="questions"
                                  className="mt-2"
                                  onChange={(e: any) =>
                                    setUpdateQuestion(e.currentTarget.value)
                                  }
                                  defaultValue={updateQuestion}
                                />
                              </div>

                              <div className="mt-2">
                                <h1 className="mb-2">Edit Jawaban</h1>
                                <div className="grid grid-cols-2 gap-3 max-[640px]:gap-5 max-[640px]:grid-cols-3">
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
                                <h1 className="mb-2">Pilih Jawaban</h1>
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
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="cursor-pointer"
                          >
                            Hapus
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Hapus Soal</DialogTitle>
                            <DialogDescription>
                              {`Apakah Anda Benar - Benar Ingin Menghapus Soal "${data.questions}" ini ?`}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                onClick={() => handleDeleteQuestions(data.id)}
                                variant="destructive"
                              >
                                Hapus
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : viewQuestions.questions_exam?.map((data: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <h1 className="mb-2 font-semibold">{data.questions}</h1>
                    </TableCell>
                    <TableCell className="flex justify-center gap-3 items-center">
                      <Dialog>
                        <form>
                          <DialogTrigger asChild>
                            <Button className="cursor-pointer hover:bg-blue-500 bg-blue-400">
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Soal</DialogTitle>
                              <DialogDescription>
                                Input Dibawah ini Untuk Mengedit Soal Essay
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-2 max-[640px]:gap-1">
                              <div>
                                <label htmlFor="questions">
                                  Edit Pertanyaan
                                </label>
                                <Input
                                  id="questions"
                                  className="mt-2"
                                  onChange={(e: any) =>
                                    setUpdateQuestion(e.currentTarget.value)
                                  }
                                  defaultValue={data.questions}
                                />
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
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="cursor-pointer"
                          >
                            Hapus
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Hapus Soal</DialogTitle>
                            <DialogDescription>
                              {`Apakah Anda Benar - Benar Ingin Menghapus Soal "${data.questions}" ini ?`}
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                onClick={() => handleDeleteQuestions(data.id)}
                                variant="destructive"
                              >
                                Hapus
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        <div className="mt-8 pb-7">
          <Link
            href="/Teacher/dashboard"
            className="text-md bg-amber-300 px-5 py-2 rounded-lg hover:bg-amber-400 font-semibold"
          >
            Kembali
          </Link>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
