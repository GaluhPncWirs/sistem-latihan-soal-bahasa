import LayoutModalBox from "@/layout/modalBoxs";

export default function ModalBoxAddQuestionsSuccess({ setModal }: any) {
  return (
    <LayoutModalBox>
      {/* <img src="" alt="" /> */}
      <h1 className="text-xl font-semibold text-center">
        Menambah Pertanyaan Telah Berhasil
      </h1>
      <div className="w-11/12 mx-auto flex justify-center items-center">
        <button
          className="bg-blue-200 hover:bg-blue-300 px-10 rounded-lg py-1.5 cursor-pointer"
          onClick={() =>
            setModal({
              success: false,
              failed: false,
            })
          }
        >
          Oke
        </button>
      </div>
    </LayoutModalBox>
  );
}
