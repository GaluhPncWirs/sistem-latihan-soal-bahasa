import NavigasiBar from "@/component/navigasiBar/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <NavigasiBar />

      <div className="w-3/4 mx-auto h-screen pt-32">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-center mb-10">
            Platform Ujian Online
          </h1>
          <p className="text-lg text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            veniam neque aliquid laboriosam ipsum animi repudiandae,
            reprehenderit modi, maxime exercitationem numquam. Voluptas
            perferendis quae quasi magni nihil cum totam suscipit.
          </p>
          <div className="mt-5">
            <Link
              href="#"
              className="text-center w-full bg-blue-400 rounded-md py-2 text-lg font-semibold cursor-pointer hover:bg-blue-500 px-10"
            >
              Mulai
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t-2 border-slate-800 flex justify-around items-center h-20 pt-10">
          <Link
            href="/Student"
            className="bg-amber-300 px-10 py-3 rounded-lg hover:bg-amber-400 cursor-pointer text-lg font-semibold"
          >
            Dasboard Siswa
          </Link>
          <Link
            href="#"
            className="bg-amber-300 px-10 py-3 rounded-lg hover:bg-amber-400 cursor-pointer text-lg font-semibold"
          >
            Kerjakan Ujian
          </Link>
        </div>
      </div>
    </div>
  );
}
