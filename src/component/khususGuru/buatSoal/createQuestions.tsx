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
  const [selectedValueNameExam, setSelectedValueNameExam] = useState("");
  const [clearInput, setClearInput] = useState(false);
  const [dataNameExam, setDataNameExam] = useState([]);

  function handleAddAnswer(event: any) {
    const { id, value } = event.target;
    setAnswer((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  // function isNamaUjian() {
  //   const existingNames = dataNameExam.map((nameExam: any) =>
  //     nameExam.nama_ujian.toLowerCase().trim()
  //   );
  //   return existingNames.includes(selectedValueNameExam.toLowerCase().trim());
  // }

  // console.log(isNamaUjian());

  useEffect(() => {
    async function getNameExam() {
      const { data, error }: any = await supabase
        .from("exams")
        .select("nama_ujian");

      if (error) {
        toast("Gagal ❌", {
          description: "gagal mndapatkan nama soal",
        });
      }
      setDataNameExam(data);
    }
    getNameExam();
  }, []);

  function randomIdExam(len = 3) {
    const alphabetLowerCase = "abcdefghijklmnopqrstuvwxyz";
    const alphabetUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";

    const allCharacter = alphabetLowerCase + alphabetUpperCase + num;
    let result = `EX-`;
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacter.length);
      result += allCharacter[randomIndex];
    }
    return result;
  }

  async function handleCreateAddQuestion() {
    const { data, error }: any = await supabase
      .from("exams")
      .select("*")
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
      setClearInput(true);
      if (selectedValueNameExam === "buatUjianBaru") {
        const { error }: any = await supabase.from("exams").insert([
          {
            created_at: new Date().toISOString(),
            nama_ujian: nameExam,
            status_pengerjaan: null,
            hasil_ujian: null,
            questions_exam: [
              {
                id: randomIdExam(),
                questions: question,
                answerPg: answer,
                correctAnswer: selectCorrectAnswer,
              },
            ],
          },
        ]);

        if (error) {
          toast("Gagal ❌", {
            description: "Soal Gagal Tambahkan Periksa Kembali Soalnya",
          });
        } else {
          toast("Berhasil ✅", {
            description: "Soal Berhasil Ditambahkan",
          });
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
              id: randomIdExam(),
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
          }
        }
      }
    }
  }

  useEffect(() => {
    if (clearInput) {
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
    }
  }, [clearInput]);

  return (
    <div>
      <div className="bg-[#3674B5] p-5 rounded-lg w-10/12 mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-7 text-slate-100">
          Buat Soal Ujian
        </h1>
        <form className="flex flex-col gap-5">
          <div className="bg-slate-100 p-5 rounded-lg">
            <Select onValueChange={(val) => setSelectedValueNameExam(val)}>
              <SelectTrigger className="w-2/3">
                <SelectValue placeholder="Pilih Nama Ujiannya" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="buatUjianBaru"
                  className="border-black border bg-slate-300"
                >
                  Buat Ujian Baru
                </SelectItem>
                {dataNameExam.map((nameExam: any, i: number) => (
                  <SelectItem
                    value={nameExam.nama_ujian || "nama ujian"}
                    key={i}
                  >
                    {nameExam.nama_ujian || "Nama Ujian"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex bg-slate-100 p-5 rounded-lg flex-col justify-center items-center gap-3">
            {selectedValueNameExam === "buatUjianBaru" && (
              <>
                <label
                  htmlFor="nama_ujian"
                  className="text-lg font-semibold mb-2 w-10/12"
                >
                  Nama Ujian
                </label>
                <Input
                  id="nama_ujian"
                  className="border border-black rounded-sm p-1 px-2 w-10/12"
                  onChange={(e: any) => setNameExams(e.currentTarget.value)}
                />
              </>
            )}
            <label
              htmlFor="questions"
              className="text-lg font-semibold mb-2 w-10/12"
            >
              Pertanyaan
            </label>
            <Input
              id="questions"
              className="border border-black rounded-sm p-1 px-2 w-10/12"
              onChange={(e: any) => setQuestion(e.currentTarget.value)}
            />
          </div>
          <div className="bg-slate-100 p-5 rounded-lg">
            <h1 className="text-lg font-semibold">Isi Jawaban</h1>
            <div className="flex gap-5 mt-3 items-center justify-center flex-wrap">
              <div className="text-center">
                <label
                  htmlFor="answer_a"
                  className="text-base font-semibold mr-3"
                >
                  Jawaban A
                </label>
                <Input
                  id="answer_a"
                  type="text"
                  className="border border-black rounded-sm p-1 px-2"
                  value={answer.answer_a}
                  onChange={handleAddAnswer}
                />
              </div>
              <div className="text-center ">
                <label
                  htmlFor="answer_b"
                  className="text-base font-semibold mr-3"
                >
                  Jawaban B
                </label>
                <Input
                  id="answer_b"
                  type="text"
                  className="border border-black rounded-sm p-1 px-2"
                  value={answer.answer_b}
                  onChange={handleAddAnswer}
                />
              </div>
              <div className="text-center ">
                <label
                  htmlFor="answer_c"
                  className="text-base font-semibold mr-3"
                >
                  Jawaban C
                </label>
                <Input
                  id="answer_c"
                  type="text"
                  className="border border-black rounded-sm p-1 px-2"
                  value={answer.answer_c}
                  onChange={handleAddAnswer}
                />
              </div>
              <div className="text-center ">
                <label
                  htmlFor="answer_d"
                  className="text-base font-semibold mr-3"
                >
                  Jawaban D
                </label>
                <Input
                  id="answer_d"
                  type="text"
                  className="border border-black rounded-sm p-1 px-2"
                  value={answer.answer_d}
                  onChange={handleAddAnswer}
                />
              </div>
              <div className="text-center ">
                <label
                  htmlFor="answer_e"
                  className="text-base font-semibold mr-3"
                >
                  Jawaban E
                </label>
                <Input
                  id="answer_e"
                  type="text"
                  className="border border-black rounded-sm p-1 px-2"
                  value={answer.answer_e}
                  onChange={handleAddAnswer}
                />
              </div>
            </div>
          </div>
          <div className="bg-slate-100 p-5 rounded-lg">
            <h1 className="text-lg font-semibold mb-3">Jawaban Yang Benar</h1>
            <Select onValueChange={(val) => setSelectCorrectAnswer(val)}>
              <SelectTrigger className="w-2/3">
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
        </form>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="text-center mt-5 px-8 text-black rounded-md py-1.5 font-semibold cursor-pointer bg-blue-400 hover:bg-blue-500">
              Buat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apakah Soal ini Sudah Benar ?</DialogTitle>
              <DialogDescription className="mt-3">
                Dengan Soal Seperti ini
              </DialogDescription>
              <DialogDescription>
                Pertanyaan <span className="font-bold">{question}</span>
              </DialogDescription>
              <DialogDescription>
                Jawaban A <span className="font-bold">{answer.answer_a}</span>
              </DialogDescription>
              <DialogDescription>
                Jawaban B <span className="font-bold">{answer.answer_b}</span>
              </DialogDescription>
              <DialogDescription>
                Jawaban C <span className="font-bold">{answer.answer_c}</span>
              </DialogDescription>
              <DialogDescription>
                Jawaban D <span className="font-bold">{answer.answer_d}</span>
              </DialogDescription>
              <DialogDescription>
                Jawaban E <span className="font-bold">{answer.answer_e}</span>
              </DialogDescription>
              <DialogDescription>
                Jawaban Yang Benar{" "}
                <span className="font-bold">{selectCorrectAnswer}</span>
              </DialogDescription>
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
    </div>
  );
}
