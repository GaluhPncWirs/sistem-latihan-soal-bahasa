import NavigasiBar from "@/component/navigasiBar/navbar";

export default function Home() {
  return (
    <div className="bg-slate-200 h-screen">
      <NavigasiBar />

      <div className="w-3/4 mx-auto mt-10 p-5">
        <div>
          <h1 className="text-5xl font-bold text-center mb-10">
            Platform Ujian Online
          </h1>
          <p className="text-lg text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            veniam neque aliquid laboriosam ipsum animi repudiandae,
            reprehenderit modi, maxime exercitationem numquam. Voluptas
            perferendis quae quasi magni nihil cum totam suscipit.
          </p>
          <div className="mt-5 w-1/5 mx-auto">
            <button className="text-center w-full bg-blue-400 rounded-md py-2 text-lg font-semibold cursor-pointer hover:bg-blue-500">
              Mulai
            </button>
          </div>
        </div>
        <div className="mt-10 border-t-2 border-slate-800 flex justify-around items-center h-20 pt-10">
          <button className="bg-amber-300 px-10 py-3 rounded-lg hover:bg-amber-400 cursor-pointer text-lg font-semibold">
            Lihat Ujian
          </button>
          <button className="bg-amber-300 px-10 py-3 rounded-lg hover:bg-amber-400 cursor-pointer text-lg font-semibold">
            Kerjakan Ujian
          </button>
          <button className="bg-amber-300 px-10 py-3 rounded-lg hover:bg-amber-400 cursor-pointer text-lg font-semibold">
            Lihat Hasil
          </button>
        </div>
      </div>
    </div>
  );
}
