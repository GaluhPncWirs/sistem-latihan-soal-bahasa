import { supabase } from "@/lib/supabase/data";
import { useRef, useState } from "react";
import ModalBoxAddQuestionsSuccess from "./modalBoxs/addSuccess";
import ModalBoxAddQuestionsFailed from "./modalBoxs/addFailed";

export default function CreateNewQuestions() {
  const [answer, setAnswer] = useState({
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    answer_e: "",
  });
  const question = useRef<any>(null);
  const selectCorrectAnswer = useRef<any>(null);
  const [modal, setModal] = useState({
    success: false,
    failed: false,
  });

  function handleAddAnswer(event: any) {
    const { id, value } = event.target;
    setAnswer((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleCreateAddQuestion() {
    const questionValue = question.current.value || "";
    const correctAnswer = selectCorrectAnswer.current.value || "";
    const { data, error } = await supabase.from("for-questions").insert([
      {
        questions: questionValue,
        answer: answer,
        correctAnswer: correctAnswer,
      },
    ]);

    if (error) {
      console.log("Gagal menambahkan data: ", error.message);
      setModal({
        success: false,
        failed: true,
      });
    } else {
      setModal({
        success: true,
        failed: false,
      });
      console.log("Data berhasil ditambahkan:", data);
    }
  }

  return (
    <div>
      <div className="bg-[#3674B5] p-5 rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-7 text-slate-100">
          Buat Soal Ujian
        </h1>
        <form className="flex flex-col gap-5">
          <div className="flex items-center w-full bg-blue-400 p-5 rounded-lg">
            <label htmlFor="questions" className="text-lg font-semibold mr-5 ">
              Pertanyaan
            </label>
            <input
              id="questions"
              className="border border-black rounded-sm p-1 px-2 w-3/5"
              ref={question}
            ></input>
          </div>
          <div className="bg-blue-300 p-5 rounded-lg">
            <h1 className="text-lg font-semibold">Isi Jawaban</h1>
            <div className="flex gap-5 mt-3 items-center justify-center flex-wrap">
              <div className="text-center">
                <label
                  htmlFor="answer_a"
                  className="text-base font-semibold mr-3"
                >
                  Jawaban A
                </label>
                <input
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
                <input
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
                <input
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
                <input
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
                <input
                  id="answer_e"
                  type="text"
                  className="border border-black rounded-sm p-1 px-2"
                  value={answer.answer_e}
                  onChange={handleAddAnswer}
                />
              </div>
            </div>
          </div>
          <div className="bg-blue-400 p-5 rounded-lg">
            <h1 className="text-lg font-semibold mb-3">Jawaban Yang Benar</h1>
            <select
              id="correctAnswer"
              className="cursor-pointer bg-blue-300 rounded-md p-2 text-sm w-1/2"
              ref={selectCorrectAnswer}
            >
              <option value="" disabled hidden>
                Pilih
              </option>
              <option value={answer.answer_a}>{answer.answer_a}</option>
              <option value={answer.answer_b}>{answer.answer_b}</option>
              <option value={answer.answer_c}>{answer.answer_c}</option>
              <option value={answer.answer_d}>{answer.answer_d}</option>
              <option value={answer.answer_e}>{answer.answer_e}</option>
            </select>
          </div>
        </form>
        <button
          className="text-center mt-5 bg-blue-200 px-10 rounded-md py-1.5 font-semibold cursor-pointer"
          onClick={handleCreateAddQuestion}
        >
          Buat
        </button>
      </div>
      {modal.failed === true ? (
        <ModalBoxAddQuestionsFailed setModal={setModal} />
      ) : modal.success === true ? (
        <ModalBoxAddQuestionsSuccess setModal={setModal} />
      ) : null}
    </div>
  );
}
