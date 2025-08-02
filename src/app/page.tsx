"use client";
import LayoutBodyContent from "@/layout/bodyContent";
import Image from "next/image";
import Link from "next/link";
import { useGetIdStudent } from "./hooks/getIdStudent";

export default function Home() {
  const isLogin = useGetIdStudent();
  return (
    <LayoutBodyContent>
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
                href={isLogin ? "/Student" : "/Autentikasi/Login"}
                className="text-center w-full bg-blue-300 rounded-md py-2 text-lg font-semibold cursor-pointer hover:bg-blue-400 px-7"
              >
                Mulai Ujian
              </Link>
            </div>
          </div>
          <Link
            href="#content"
            className="text-center text-lg cursor-pointer mt-5"
          >
            Pelajari Lebih Lanjut Dibawah ini{" "}
            <Image
              src="/img/beranda/arrowDown.png"
              alt="arrow down"
              height={20}
              width={20}
              className="inline animate-bounce"
            />
          </Link>
        </div>
      </div>

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
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
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
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
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
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
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
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
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
                  Data peserta dan hasil ujian aman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute"
      >
        <path
          fill="#71C9CE"
          fillOpacity="1"
          d="M0,192L30,170.7C60,149,120,107,180,101.3C240,96,300,128,360,144C420,160,480,160,540,138.7C600,117,660,75,720,96C780,117,840,203,900,229.3C960,256,1020,224,1080,176C1140,128,1200,64,1260,42.7C1320,21,1380,43,1410,53.3L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] pt-56">
        <h1 className="text-4xl font-bold text-center pb-5">Alur Ujian </h1>
        <div className="w-2/3 mx-auto py-10">
          <div className="flex mx-10 max-[640px]:ml-5 max-[640px]:mx-0 max-[640px]:pr-5 max-[640px]:mt-24">
            <div className="basis-1/6 flex flex-col items-center">
              <Image
                src="/img/beranda/roadmap.png"
                alt="roadmap"
                className="max-[640px]:w-1/3 sm:w-1/4 md:w-1/3 lg:w-1/4"
                width={100}
                height={100}
              />
              <div className="w-1 h-full mt-5 bg-[#393E46] rounded-t-lg rounded-b-lg flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#F38181] mt-10"></div>
                <div className="w-3 h-3 rounded-full bg-[#F38181] mt-32"></div>
                <div className="w-3 h-3 rounded-full bg-[#F38181] mt-32"></div>
                <div className="w-3 h-3 rounded-full bg-[#F38181] mt-32"></div>
              </div>
            </div>

            <div className="basis-5/6">
              <div className="mt-20">
                <div className="flex gap-3 items-center text-[#0F4C75]">
                  <h1 className="font-bold text-2xl ">Daftar / Login</h1>
                  <Image
                    src="/img/beranda/login.png"
                    alt="login"
                    className="w-[5%]"
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className="font-semibold text-xl mt-3 text-[#393E46]">
                  Buat akun baru atau masuk dengan akun yang sudah ada untuk
                  mengakses sistem ujian online
                </h2>
              </div>

              <div className="mt-10">
                <div className="flex gap-3 items-center text-[#0F4C75]">
                  <h1 className="font-bold text-2xl">Pilih Ujian</h1>
                  <Image
                    src="/img/beranda/choose.png"
                    alt="choose"
                    className="w-[5%]"
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className="font-semibold text-xl mt-3 text-[#393E46]">
                  Telusuri dan pilih ujian yang tersedia sesuai jadwal yang
                  ingin Anda ikuti
                </h2>
              </div>

              <div className="mt-10">
                <div className="flex gap-3 items-center text-[#0F4C75]">
                  <h1 className="font-bold text-2xl">Kejakan Ujiannya</h1>
                  <Image
                    src="/img/beranda/working.png"
                    alt="working"
                    className="w-[5%]"
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className="font-semibold text-xl mt-3 text-[#393E46]">
                  Kerjakan soal secara online melalui antarmuka yang sederhana,
                  didukung fitur timer dan navigasi soal
                </h2>
              </div>

              <div className="mt-10">
                <div className="flex gap-3 items-center text-[#0F4C75]">
                  <h1 className="font-bold text-2xl">Lihat Nilai</h1>
                  <Image
                    src="/img/beranda/exam.png"
                    alt="exam"
                    className="w-[5%]"
                    width={100}
                    height={100}
                  />
                </div>
                <h2 className="font-semibold text-xl mt-3 text-[#393E46]">
                  Setelah selesai, langsung dapatkan hasil ujian dan nilai Anda
                  secara real time
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutBodyContent>
  );
}
