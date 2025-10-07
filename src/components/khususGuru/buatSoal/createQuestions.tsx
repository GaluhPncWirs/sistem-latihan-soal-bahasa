import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
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
import { useRandomId } from "@/app/hooks/getRandomId";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import { useManageExamsData } from "@/app/hooks/getDataManageExams";
import { Textarea } from "@/components/ui/textarea";
import { useHandleInput } from "@/app/hooks/handleInput";

export default function CreateNewQuestions() {
  const [answer, setAnswer] = useState({
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    answer_e: "",
  });
  const [question, setQuestion] = useState("");
  const [selectCorrectAnswer, setSelectCorrectAnswer] = useState("");
  const [nameExam, setNameExams] = useState("");
  const [chooseTypeExams, setChooseTypeExams] = useState("");
  const [selectedValueNameExam, setSelectedValueNameExam] = useState("");
  const [clearInput, setClearInput] = useState(false);
  const idTeacher = useGetIdTeacher();
  const dataNameExam = useManageExamsData(idTeacher);
  const [chooseInputObject, setChooseInputObject] = useState({});
  const { handleValueInput } = useHandleInput(chooseInputObject);

  useEffect(() => {
    if (chooseTypeExams === "pg") {
      if (selectedValueNameExam === "buatUjianBaru") {
        setChooseInputObject({
          nama_ujian: nameExam,
          questions: question,
          answer,
        });
      } else {
        setChooseInputObject({
          questions: question,
          answer,
        });
      }
    } else {
      if (selectedValueNameExam === "buatUjianBaru") {
        setChooseInputObject({
          nama_ujian: nameExam,
          questions: question,
        });
      } else {
        setChooseInputObject({
          questions: question,
        });
      }
    }
  }, [chooseTypeExams, selectedValueNameExam, nameExam, question, answer]);

  function isFormFilled() {
    return Object.values(chooseInputObject).every((item: any) => item !== "");
  }

  function handleAddAnswer(event: any) {
    const { id, value } = event.target;
    setAnswer((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleCreateAddQuestion() {
    if (!chooseTypeExams || !selectedValueNameExam) {
      toast("Gagal ❌", {
        description: "Pilih Terlebih Dahulu Tipe Dan Nama Ujiannya",
      });
    } else {
      const { data, error }: any = await supabase
        .from("exams")
        .select("nama_ujian")
        .eq("nama_ujian", nameExam);

      if (data?.length > 0) {
        toast("Gagal ❌", {
          description: "Soalnya Sama Seperti Yang Sebelumnya Telah Dibuat",
        });
      } else if (error) {
        toast("Gagal ❌", {
          description: "Soal Gagal Tambahkan Periksa Kembali Soalnya",
        });
      } else {
        if (chooseTypeExams === "pg") {
          if (selectedValueNameExam === "buatUjianBaru") {
            const { error }: any = await supabase.from("exams").insert([
              {
                created_at_exams: new Date().toISOString(),
                nama_ujian: nameExam,
                questions_exam: [
                  {
                    id: useRandomId(7, "EX"),
                    questions: question,
                    answerPg: answer,
                    correctAnswer: selectCorrectAnswer,
                  },
                ],
                idTeacher: idTeacher,
                tipeUjian: chooseTypeExams,
              },
            ]);

            if (error) {
              toast("Gagal ❌", {
                description: "Soal Gagal Tambahkan Periksa Kembali Soalnya",
              });
            } else {
              toast("Berhasil ✅", {
                description: "Soal Pilihan Ganda Berhasil Ditambahkan",
              });
              setClearInput(true);
            }
          } else {
            const { data, error } = await supabase
              .from("exams")
              .select("questions_exam")
              .eq("nama_ujian", selectedValueNameExam)
              .single();

            if (error) {
              toast("Gagal ❌", {
                description: "Ujian tidak ditemukan.",
              });
            } else {
              const addQuestions = [
                ...(data.questions_exam || []),
                {
                  id: useRandomId(7, "EX"),
                  questions: question,
                  answerPg: answer,
                  correctAnswer: selectCorrectAnswer,
                },
              ];
              const { error }: any = await supabase
                .from("exams")
                .update({ questions_exam: addQuestions })
                .eq("nama_ujian", selectedValueNameExam);

              if (error) {
                toast("Gagal ❌", {
                  description: "Soal Gagal Tambahkan Periksa Kembali Soalnya",
                });
              } else {
                toast("Berhasil ✅", {
                  description: "Soal Berhasil Ditambahkan",
                });
                setClearInput(true);
              }
            }
          }
        } else {
          if (selectedValueNameExam === "buatUjianBaru") {
            const { error: errorAddQuestionsExam } = await supabase
              .from("exams")
              .insert([
                {
                  created_at_exams: new Date().toISOString(),
                  nama_ujian: nameExam,
                  questions_exam: [
                    {
                      id: useRandomId(7, "EX"),
                      questions: question,
                    },
                  ],
                  idTeacher: idTeacher,
                  tipeUjian: chooseTypeExams,
                },
              ]);
            if (errorAddQuestionsExam) {
              toast("Gagal ❌", {
                description: "Soal Gagal Ditambahkan Periksa Kembali Soalnya",
              });
            } else {
              toast("Berhasil ✅", {
                description: "Soal Essay Berhasil Ditambahkan",
              });
              setClearInput(true);
            }
          } else {
            const { data: dataEssay, error: errorDataEssay } = await supabase
              .from("exams")
              .select("questions_exam")
              .eq("nama_ujian", selectedValueNameExam)
              .single();

            if (errorDataEssay) {
              toast("Gagal ❌", {
                description: "Ujian tidak ditemukan.",
              });
            } else {
              const addEssay = [
                ...(dataEssay.questions_exam || []),
                {
                  id: useRandomId(7, "EX"),
                  questions: question,
                },
              ];
              const { error: errorAddDataEssay } = await supabase
                .from("exams")
                .update({ questions_exam: addEssay })
                .eq("nama_ujian", selectedValueNameExam);

              if (errorAddDataEssay) {
                toast("Gagal ❌", {
                  description: "Soal Gagal Tambahkan Periksa Kembali Soalnya",
                });
              } else {
                toast("Berhasil ✅", {
                  description: "Soal Berhasil Ditambahkan",
                });
                setClearInput(true);
              }
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    if (clearInput) {
      if (chooseTypeExams === "pg") {
        setAnswer({
          answer_a: "",
          answer_b: "",
          answer_c: "",
          answer_d: "",
          answer_e: "",
        });
        setSelectCorrectAnswer("");
        setQuestion("");
        setNameExams("");
      } else if (chooseTypeExams === "essay") {
        setQuestion("");
        setNameExams("");
      }
    }
  }, [clearInput, chooseTypeExams]);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-2xl font-semibold mb-7">Buat Soal Ujian</h1>
      <form className="flex flex-col gap-5">
        <div className="flex justify-around">
          <div className="w-1/2">
            <h1 className="font-semibold mb-2">Pilih Tipe Ujian</h1>
            <Select onValueChange={(val) => setChooseTypeExams(val)}>
              <SelectTrigger className="w-11/12 border border-black">
                <SelectValue placeholder="Tipe Ujian (PG / Essay)" />
              </SelectTrigger>
              <SelectContent className="p-1">
                <SelectItem value="pg">Pilihan Ganda</SelectItem>
                <SelectItem value="essay">Essay</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/2">
            <h1 className="font-semibold mb-2">Nama Ujian</h1>
            <Select onValueChange={(val) => setSelectedValueNameExam(val)}>
              <SelectTrigger className="w-11/12 border border-black">
                <SelectValue placeholder="Pilih Nama Ujiannya" />
              </SelectTrigger>
              <SelectContent className="p-1">
                <SelectItem
                  value="buatUjianBaru"
                  className="border-black border bg-slate-300"
                >
                  Buat Ujian Baru
                </SelectItem>
                {chooseTypeExams === "pg"
                  ? dataNameExam.map(
                      (nameExam: any, i: number) =>
                        nameExam.tipeUjian === "pg" && (
                          <SelectItem
                            value={nameExam.nama_ujian || "Nama ujian"}
                            key={i}
                          >
                            {nameExam.nama_ujian || "Nama Ujian"}
                          </SelectItem>
                        )
                    )
                  : dataNameExam.map(
                      (nameExam: any, i: number) =>
                        nameExam.tipeUjian === "essay" && (
                          <SelectItem
                            value={nameExam.nama_ujian || "Nama ujian"}
                            key={i}
                          >
                            {nameExam.nama_ujian || "Nama Ujian"}
                          </SelectItem>
                        )
                    )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-3/4">
          {selectedValueNameExam === "buatUjianBaru" && (
            <>
              <label
                htmlFor="nama_ujian"
                className="font-semibold mb-2 inline-block"
              >
                Nama Ujian
              </label>
              <Input
                id="nama_ujian"
                className="border border-black rounded-sm p-1 px-2"
                onChange={(e: any) => {
                  handleValueInput(e);
                  setNameExams(e.currentTarget.value);
                }}
                value={nameExam}
              />
            </>
          )}
          <label
            htmlFor="questions"
            className="font-semibold mb-2 inline-block mt-3"
          >
            Pertanyaan
          </label>
          <Textarea
            id="questions"
            className="border border-black rounded-sm p-1 px-2"
            onChange={(e: any) => {
              handleValueInput(e);
              setQuestion(e.currentTarget.value);
            }}
            value={question}
          />
        </div>
        {chooseTypeExams === "pg" && (
          <div>
            <div className="mb-5">
              <h1 className="font-semibold inline-block mb-4">
                Pilihan Jawaban
              </h1>
              <div className="flex gap-x-5 gap-y-3 flex-wrap">
                <div>
                  <label
                    htmlFor="answer_a"
                    className="text-base font-semibold inline-block mb-2"
                  >
                    Opsi A
                  </label>
                  <Input
                    id="answer_a"
                    type="text"
                    className="border border-black rounded-sm p-1 px-2"
                    value={answer.answer_a}
                    onChange={(e) => {
                      handleValueInput(e);
                      handleAddAnswer(e);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="answer_b"
                    className="text-base font-semibold inline-block mb-2"
                  >
                    Opsi B
                  </label>
                  <Input
                    id="answer_b"
                    type="text"
                    className="border border-black rounded-sm p-1 px-2"
                    value={answer.answer_b}
                    onChange={(e) => {
                      handleValueInput(e);
                      handleAddAnswer(e);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="answer_c"
                    className="text-base font-semibold inline-block mb-2"
                  >
                    Opsi C
                  </label>
                  <Input
                    id="answer_c"
                    type="text"
                    className="border border-black rounded-sm p-1 px-2"
                    value={answer.answer_c}
                    onChange={(e) => {
                      handleValueInput(e);
                      handleAddAnswer(e);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="answer_d"
                    className="text-base font-semibold inline-block mb-2"
                  >
                    Opsi D
                  </label>
                  <Input
                    id="answer_d"
                    type="text"
                    className="border border-black rounded-sm p-1 px-2"
                    value={answer.answer_d}
                    onChange={(e) => {
                      handleValueInput(e);
                      handleAddAnswer(e);
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="answer_e"
                    className="text-base font-semibold inline-block mb-2"
                  >
                    Opsi E
                  </label>
                  <Input
                    id="answer_e"
                    type="text"
                    className="border border-black rounded-sm p-1 px-2"
                    value={answer.answer_e}
                    onChange={(e) => {
                      handleValueInput(e);
                      handleAddAnswer(e);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-semibold mb-3">Jawaban Yang Benar</h1>
              <Select onValueChange={(val) => setSelectCorrectAnswer(val)}>
                <SelectTrigger className="w-1/2 border border-black">
                  <SelectValue placeholder="Pilih Jawaban Yang Benar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={answer.answer_a || "Jawaban A"}>
                    {answer.answer_a || "Jawaban A"}
                  </SelectItem>
                  <SelectItem value={answer.answer_b || "Jawaban B"}>
                    {answer.answer_b || "Jawaban B"}
                  </SelectItem>
                  <SelectItem value={answer.answer_c || "Jawaban C"}>
                    {answer.answer_c || "Jawaban C"}
                  </SelectItem>
                  <SelectItem value={answer.answer_d || "Jawaban D"}>
                    {answer.answer_d || "Jawaban D"}
                  </SelectItem>
                  <SelectItem value={answer.answer_e || "Jawaban E"}>
                    {answer.answer_e || "Jawaban E"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </form>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="text-center text-lg mt-10 px-8 rounded-md py-1.5 cursor-pointer bg-[#3282B8] hover:bg-blue-500"
            disabled={!isFormFilled()}
          >
            Buat
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apakah Soal ini Sudah Benar ?</DialogTitle>
            <DialogDescription className="mt-3 text-md">
              Dengan Soal Seperti ini
            </DialogDescription>
            <DialogDescription>
              Pertanyaan = <span className="font-bold">"{question}"</span>
            </DialogDescription>
            {chooseTypeExams === "pg" && (
              <>
                <div className="flex justify-around items-center my-3">
                  <DialogDescription>
                    Jawaban A{" "}
                    <span className="font-bold">{answer.answer_a}</span>
                  </DialogDescription>
                  <DialogDescription>
                    Jawaban B{" "}
                    <span className="font-bold">{answer.answer_b}</span>
                  </DialogDescription>
                  <DialogDescription>
                    Jawaban C{" "}
                    <span className="font-bold">{answer.answer_c}</span>
                  </DialogDescription>
                  <DialogDescription>
                    Jawaban D{" "}
                    <span className="font-bold">{answer.answer_d}</span>
                  </DialogDescription>
                  <DialogDescription>
                    Jawaban E{" "}
                    <span className="font-bold">{answer.answer_e}</span>
                  </DialogDescription>
                </div>
                <DialogDescription>
                  Jawaban Yang Benar ={" "}
                  <span className="font-bold">{selectCorrectAnswer}</span>
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="default" onClick={handleCreateAddQuestion}>
                Buat
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
