"use client";
import Image from "next/image";
import Link from "next/link";
import { useGetIdStudent } from "./hooks/getIdStudent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetIdTeacher } from "./hooks/getIdTeacher";
import LayoutIntroductionsSystem from "@/layout/introductionSystem";
import { useEffect, useState } from "react";

export default function Home() {
  const isLoginStudent = useGetIdStudent();
  const isLoginTeacher = useGetIdTeacher();
  const [isSizeMobile, setIsSizeMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    function handler(e: MediaQueryListEvent | MediaQueryList) {
      setIsSizeMobile(e.matches);
    }

    handler(mediaQuery);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <LayoutIntroductionsSystem>
      <div className="relative">
        <div
          style={{ backgroundImage: "url(/img/beranda/heroSectionUjian.jpg)" }}
          className="min-h-screen bg-no-repeat bg-cover opacity-50"
        />
        <div className="absolute top-5/12 flex w-full flex-col max-[640px]:px-5 max-[640px]:top-1/3 sm:px-10 lg:px-14 max-[640px]:gap-y-24 sm:gap-y-20">
          <div>
            <h1 className="text-5xl font-bold mb-4 max-[640px]:text-4xl">
              Platform Ujian Online
            </h1>
            <p className="text-xl font-semibold ml-1 max-[640px]:text-lg">
              Ikuti Ujian Online Bisa Dikerjakan Dimana Saja, Mudah dan Cepat
            </p>
            <div className="mt-10">
              <Link
                href={
                  isLoginStudent
                    ? "/Student/Dashboard"
                    : isLoginTeacher
                    ? "/Teacher/dashboard"
                    : "/Autentikasi/Login"
                }
                className="text-center w-full bg-blue-400 rounded-md py-2 text-lg font-semibold cursor-pointer hover:bg-blue-500 px-7"
              >
                Mulai
              </Link>
            </div>
          </div>
          <Link
            href="#content"
            className="text-center text-lg cursor-pointer mt-7 max-[640px]:mt-0"
          >
            Pelajari Lebih Lanjut Dibawah ini{" "}
            <Image
              src="/img/beranda/arrowDown.png"
              alt="arrow down"
              height={20}
              width={20}
              className="inline animate-bounce ml-1"
            />
          </Link>
        </div>
      </div>

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        <div
          className="mx-auto max-[640px]:w-10/12 max-[640px]:py-16 sm:py-16 lg:py-20 sm:w-10/12 md:w-10/12 lg:w-2/3"
          id="content"
        >
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center mb-16">
              Fitur Unggulan
            </h1>
            <div className="flex justify-around items-center gap-7 w-full max-[640px]:flex-col max-[640px]:gap-y-10 sm:flex-wrap">
              <div className="max-w-3/12 max-[640px]:max-w-2/3 sm:max-w-2/5 lg:max-w-2/6">
                <div className="w-full flex justify-center mb-3">
                  <Image
                    src="/img/beranda/mudah.png"
                    alt="mudah"
                    width={100}
                    height={100}
                    className="sm:w-1/5 md:w-1/6 max-[640px]:w-1/6"
                  />
                </div>
                <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-semibold">
                  Mudah Diakses
                </h1>
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
                  Ujian dapat diikuti dimanapun Anda Berada
                </p>
              </div>
              <div className="max-w-3/12 max-[640px]:max-w-2/3 sm:max-w-2/5 lg:max-w-2/6">
                <div className="w-full flex justify-center mb-3">
                  <Image
                    src="/img/beranda/hasil.png"
                    alt="hasil"
                    width={100}
                    height={100}
                    className="sm:w-1/5 md:w-1/6 max-[640px]:w-1/6"
                  />
                </div>
                <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-semibold">
                  Hasil Langsung
                </h1>
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
                  Nilai langsung keluar setelah selesai ujian.
                </p>
              </div>
              <div className="max-w-3/12 max-[640px]:max-w-2/3 sm:max-w-2/5 lg:max-w-2/6">
                <div className="w-full flex justify-center mb-3">
                  <Image
                    src="/img/beranda/soal.png"
                    alt="soal"
                    width={100}
                    height={100}
                    className="sm:w-1/5 md:w-1/6 max-[640px]:w-1/6"
                  />
                </div>
                <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-semibold">
                  Soal Beragam
                </h1>
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
                  Mendukung pilihan ganda, isian singkat, dan essay.
                </p>
              </div>
              <div className="max-w-3/12 max-[640px]:max-w-2/3 sm:max-w-2/5 lg:max-w-2/6">
                <div className="w-full flex justify-center mb-3">
                  <Image
                    src="/img/beranda/keamanan.png"
                    alt="keamanan"
                    width={100}
                    height={100}
                    className="sm:w-1/5 md:w-1/6 max-[640px]:w-1/6"
                  />
                </div>
                <h1 className="bg-red-300 p-2 rounded-t-lg text-center font-semibold">
                  Keamanan Terjamin
                </h1>
                <p className="p-3 bg-[#CBF1F5] rounded-b-lg">
                  Data peserta dan hasil ujian terjamin aman.
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
          d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,106.7C672,85,768,75,864,90.7C960,107,1056,149,1152,149.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] max-[640px]:pt-16 sm:pt-20 lg:pt-32 sm:h-[38rem] lg:h-[48rem]">
        <div className="mx-auto max-[640px]:w-10/12 max-[640px]:py-16 sm:py-16 sm:w-10/12">
          <h1 className="text-4xl font-bold mb-7">Tampilan Sistem</h1>
          <div>
            <h1 className="text-lg font-medium text-justify max-[640px]:mb-14 sm:mb-10">
              Antarmuka yang bersih dan juga intuitif, memudahkan peserta ujian
              untuk mengerjakan soal
            </h1>
            <Carousel
              opts={{
                align: "start",
              }}
              orientation={isSizeMobile ? "vertical" : "horizontal"}
            >
              <CarouselContent className="max-[640px]:h-60 sm:h-56 md:h-72 lg:h-96">
                <CarouselItem className="flex items-center justify-center p-5">
                  <Image
                    src="/img/beranda/dashboard.jpeg"
                    alt="Dashboard Page"
                    width={500}
                    height={500}
                    className="shadow-lg shadow-slate-700 max-[640px]:w-full sm:w-2/3 rounded-md"
                  />
                </CarouselItem>
                <CarouselItem className="flex items-center justify-center p-5">
                  <Image
                    src="/img/beranda/profile.jpeg"
                    alt="Profile Page"
                    width={500}
                    height={500}
                    className="shadow-lg shadow-slate-700 max-[640px]:w-full sm:w-3/4 rounded-md"
                  />
                </CarouselItem>
                <CarouselItem className="flex items-center justify-center p-5">
                  <Image
                    src="/img/beranda/ujian.jpeg"
                    alt="Ujian Page"
                    width={500}
                    height={500}
                    className="shadow-lg shadow-slate-700 max-[640px]:w-full sm:w-3/4 rounded-md"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] max-[640px]:pt-36 sm:pt-40 md:pt-52">
        <div className="w-2/3 mx-auto max-[640px]:w-10/12 sm:w-10/12 lg:w-2/3">
          <div className="flex items-center gap-x-5 mb-5">
            <Image
              src="/img/beranda/roadmap.png"
              alt="roadmap"
              className="max-[640px]:w-1/12 sm:w-[7%] lg:w-[6%]"
              width={500}
              height={500}
            />
            <h1 className="text-4xl font-bold">Alur Ujian</h1>
          </div>
          <div className="flex gap-x-5">
            <div className="max-[640px]:basis-[7%] sm:basis-[7%] lg:basis-[5%] flex justify-center">
              <div className="w-1 h-full mt-3 bg-black rounded-t-lg rounded-b-lg flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#0F4C75] mt-7"></div>
              </div>
            </div>
            <div className="basis-5/6 mt-7">
              <div className="flex gap-3 items-center text-[#0F4C75]">
                <h1 className="font-bold text-2xl">Daftar / Login</h1>
                <Image
                  src="/img/beranda/login.png"
                  alt="login"
                  className="w-[5%] max-[640px]:w-1/12"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="font-semibold text-xl mt-3 text-[#393E46] max-[640px]:text-lg">
                Buat akun baru atau masuk dengan akun yang sudah ada untuk
                mengakses sistem ujian online
              </h2>
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="max-[640px]:basis-[7%] sm:basis-[7%] lg:basis-[5%] flex justify-center">
              <div className="w-1 h-full mt-3 bg-black rounded-t-lg rounded-b-lg flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#0F4C75] mt-7"></div>
              </div>
            </div>
            <div className="basis-5/6 mt-7">
              <div className="flex gap-3 items-center text-[#0F4C75]">
                <h1 className="font-bold text-2xl">Pilih Ujian</h1>
                <Image
                  src="/img/beranda/choose.png"
                  alt="choose"
                  className="w-[5%] max-[640px]:w-1/12"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="font-semibold text-xl mt-3 text-[#393E46] max-[640px]:text-lg">
                Telusuri dan pilih ujian yang tersedia sesuai jadwal yang ingin
                Anda ikuti
              </h2>
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="max-[640px]:basis-[7%] sm:basis-[7%] lg:basis-[5%] flex justify-center">
              <div className="w-1 h-full mt-3 bg-black rounded-t-lg rounded-b-lg flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#0F4C75] mt-7"></div>
              </div>
            </div>
            <div className="basis-5/6 mt-7">
              <div className="flex gap-3 items-center text-[#0F4C75]">
                <h1 className="font-bold text-2xl">Kerjakan Ujiannya</h1>
                <Image
                  src="/img/beranda/working.png"
                  alt="working"
                  className="w-[5%] max-[640px]:w-1/12"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="font-semibold text-xl mt-3 text-[#393E46] max-[640px]:text-lg">
                Kerjakan soal secara online melalui antarmuka yang sederhana,
                didukung dengan navigasi soal
              </h2>
            </div>
          </div>
          <div className="flex gap-x-5">
            <div className="max-[640px]:basis-[7%] sm:basis-[7%] lg:basis-[5%] flex justify-center">
              <div className="w-1 h-full mt-3 bg-black rounded-t-lg rounded-b-lg flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[#0F4C75] mt-7"></div>
              </div>
            </div>
            <div className="basis-5/6 mt-7">
              <div className="flex gap-3 items-center text-[#0F4C75]">
                <h1 className="font-bold text-2xl">Lihat Nilai</h1>
                <Image
                  src="/img/beranda/exam.png"
                  alt="exam"
                  className="w-[5%] max-[640px]:w-1/12"
                  width={100}
                  height={100}
                />
              </div>
              <h2 className="font-semibold text-xl mt-3 text-[#393E46] max-[640px]:text-lg">
                Setelah selesai, langsung dapatkan hasil ujian dan nilai anda
              </h2>
            </div>
          </div>
        </div>
      </div>
    </LayoutIntroductionsSystem>
  );
}
