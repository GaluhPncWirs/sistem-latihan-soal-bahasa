export default function CreateNewQuestions() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-center mb-5">Buat Soal</h1>
        <form action="" className="flex flex-col gap-3">
          <div>
            <label htmlFor="" className="text-lg font-semibold">
              Isi Pertanyaan
            </label>
            <input type="text" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Isi Jawaban</h1>
            <div className="flex bg-amber-200">
              <div>
                <label htmlFor="" className="text-base font-semibold">
                  Jawaban A :{" "}
                </label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="" className="text-base font-semibold">
                  Jawaban B :{" "}
                </label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="" className="text-base font-semibold">
                  Jawaban C :{" "}
                </label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="" className="text-base font-semibold">
                  Jawaban D :{" "}
                </label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="" className="text-base font-semibold">
                  Jawaban E :{" "}
                </label>
                <input type="text" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Jawaban Yang Benar ?</h1>
            <select name="" id="">
              <option value="">tes 1</option>
              <option value="">tes 2</option>
              <option value="">tes 3</option>
              <option value="">tes 4</option>
              <option value="">tes 5</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
