import NavigasiBar from "@/component/navigasiBar/navbar";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <NavigasiBar />
      <div className="relative">
        <div
          style={{ backgroundImage: "url(/img/beranda/heroSectionUjian.jpg)" }}
          className="min-h-screen bg-no-repeat bg-cover opacity-50"
        ></div>
        <div className="absolute top-5/12 flex w-full px-16 flex-col gap-20">
          <div>
            <h1 className="text-5xl font-bold mb-5">Platform Ujian Online</h1>
            <p className="text-xl font-semibold ml-1">
              Ikuti Ujian Online Bisa Dikerjakan Dimana Saja, Mudah dan Cepat
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="text-center w-full bg-blue-400 rounded-md py-2 text-lg font-semibold cursor-pointer hover:bg-blue-500 px-7"
              >
                Mulai Ujian
              </Link>
            </div>
          </div>
          <Link
            href="#content"
            className="text-center text-lg group cursor-pointer"
          >
            Pelajari Lebih Lanjut Dibawah ini{" "}
            <Image
              src="/img/beranda/arrowDown.png"
              alt="arrow down"
              height={20}
              width={20}
              className="inline group-hover:animate-bounce"
            />
          </Link>
        </div>
      </div>

      <div className="w-3/4 mx-auto py-20" id="content">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-center mb-16">
            Fitur Unggulan
          </h1>
          <div className="flex justify-around items-center gap-3 w-full">
            <div className="max-w-3/12">
              <div className="w-full flex justify-center mb-3">
                <Image
                  src="/img/beranda/mudah.png"
                  alt="mudah"
                  width={100}
                  height={100}
                  className="w-1/6"
                />
              </div>
              <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-medium">
                Mudah Diakses
              </h1>
              <p className="p-3 bg-red-200 rounded-b-lg">
                Ujian dapat diikuti dimanapun Anda Berada
              </p>
            </div>
            <div className="max-w-3/12">
              <div className="w-full flex justify-center mb-3">
                <Image
                  src="/img/beranda/hasil.png"
                  alt="hasil"
                  width={100}
                  height={100}
                  className="w-1/6"
                />
              </div>
              <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-medium">
                Hasil Langsung
              </h1>
              <p className="p-3 bg-red-200 rounded-b-lg">
                Nilai langsung keluar setelah selesai ujian.
              </p>
            </div>
            <div className="max-w-3/12">
              <div className="w-full flex justify-center mb-3">
                <Image
                  src="/img/beranda/soal.png"
                  alt="soal"
                  width={100}
                  height={100}
                  className="w-1/6"
                />
              </div>
              <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-medium">
                Soal Beragam
              </h1>
              <p className="p-3 bg-red-200 rounded-b-lg">
                Mendukung pilihan ganda, isian singkat, dan essay.
              </p>
            </div>
            <div className="max-w-3/12">
              <div className="w-full flex justify-center mb-3">
                <Image
                  src="/img/beranda/keamanan.png"
                  alt="keamanan"
                  width={100}
                  height={100}
                  className="w-1/5"
                />
              </div>
              <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-medium">
                Keamanan Terjamin
              </h1>
              <p className="p-3 bg-red-200 rounded-b-lg">
                Data peserta dan hasil ujian aman.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-3/4 mx-auto h-screen pt-32" id="content">
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
      </div> */}
    </div>
  );
}
