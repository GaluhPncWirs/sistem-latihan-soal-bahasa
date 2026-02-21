"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LayoutIntroductionsSystem from "@/layout/introductionSystem";
import { useEffect, useState } from "react";
import CompFiturUnggulan from "@/components/beranda/fiturUnggulan/content";
import CompAlurUjian from "@/components/beranda/alurUjian/content";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";

export default function Introduction() {
  const getidUsers = useGetIdUsers((state) => state.role);
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
      <div className="heroSectionImg flex items-center">
        <div className="relative tracking-wide px-5 lg:px-14 w-full">
          <div className="flex flex-col gap-4 max-w-lg mb-5">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Platform Ujian Online
            </h1>
            <p className="text-lg sm:text-xl font-semibold">
              Ikuti Ujian Online Bisa Dikerjakan Dimana Saja, Mudah dan Cepat
            </p>
            <Link
              href={
                getidUsers.includes("pelajar")
                  ? "/Student/Dashboard"
                  : getidUsers.includes("pengajar")
                    ? "/Teacher/dashboard"
                    : "/Auth/Login"
              }
              className="text-center bg-blue-400 hover:bg-blue-500 rounded-md py-2 text-lg font-semibold cursor-pointer inline-block shadow-md shadow-slate-600 w-32"
            >
              Mulai
            </Link>
          </div>
          <Link href="#content" className="cursor-pointer">
            <span className="font-semibold text-lg mr-3">
              Pelajari Lebih Lanjut Dibawah ini
            </span>
            <Image
              src="/img/beranda/arrowDown.png"
              alt="arrow down"
              height={50}
              width={50}
              className="inline animate-bounce size-5"
            />
          </Link>
        </div>
      </div>

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        <div className="mx-auto w-10/12 py-14" id="content">
          <h1 className="text-4xl font-bold mb-12 text-[#0F4C75] tracking-wide">
            Fitur Unggulan
          </h1>
          <div className="grid gap-10 place-content-center place-items-center grid-cols-1 md:grid-cols-2">
            <CompFiturUnggulan
              imgSrc="/img/beranda/mudah.png"
              imgAlt="Mudah"
              titleFeature="Mudah Diakses"
              descFeature="Ujian dapat diikuti dimanapun Anda Berada"
            />

            <CompFiturUnggulan
              imgSrc="/img/beranda/hasil.png"
              imgAlt="Mudah"
              titleFeature="Hasil Langsung"
              descFeature="Nilai langsung keluar setelah selesai ujian."
            />

            <CompFiturUnggulan
              imgSrc="/img/beranda/variation.png"
              imgAlt="Mudah"
              titleFeature="Soal Beragam"
              descFeature="Mendukung soal pilihan ganda dan essay."
            />
            <CompFiturUnggulan
              imgSrc="/img/beranda/keamanan.png"
              imgAlt="keamanan"
              titleFeature="Keamanan Terjamin"
              descFeature="Data peserta dan hasil ujian terjamin aman."
            />
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

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] pt-14 sm:pt-20 lg:pt-32">
        <div className="mx-auto py-16 w-10/12">
          <h1 className="text-4xl font-bold mb-5 text-[#0F4C75] tracking-wide">
            Tampilan Sistem
          </h1>
          <div>
            <h2 className="text-xl font-semibold text-justify tracking-wide">
              Antarmuka yang bersih memudahkan peserta untuk mengerjakan soal
            </h2>
            <Carousel
              opts={{
                align: "start",
              }}
              orientation={isSizeMobile ? "vertical" : "horizontal"}
              className="mt-20 sm:mt-10"
            >
              <CarouselContent className="max-h-60 sm:max-h-56 md:max-h-72 lg:max-h-96">
                <CarouselItem className="flex items-center justify-center p-5">
                  <Image
                    src="/img/beranda/dashboard.jpeg"
                    alt="Dashboard Page"
                    width={500}
                    height={500}
                    className="shadow-lg shadow-slate-700 w-full sm:w-2/3 rounded-md"
                  />
                </CarouselItem>
                <CarouselItem className="flex items-center justify-center p-5">
                  <Image
                    src="/img/beranda/profile.jpeg"
                    alt="Profile Page"
                    width={500}
                    height={500}
                    className="shadow-lg shadow-slate-700 w-full sm:w-3/4 rounded-md"
                  />
                </CarouselItem>
                <CarouselItem className="flex items-center justify-center p-5">
                  <Image
                    src="/img/beranda/ujian.jpeg"
                    alt="Ujian Page"
                    width={500}
                    height={500}
                    className="shadow-lg shadow-slate-700 w-full sm:w-3/4 rounded-md"
                  />
                </CarouselItem>
                <CarouselItem className="flex items-center justify-center p-5">
                  <Image
                    src="/img/beranda/riwayatUjian.jpeg"
                    alt="Riwayat Ujian Page"
                    width={500}
                    height={500}
                    className="shadow-lg shadow-slate-700 w-full sm:w-3/4 rounded-md"
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

      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] pt-32 sm:pt-40 md:pt-52">
        <div className="mx-auto w-10/12 lg:w-2/3">
          <div className="flex items-center gap-x-5 mb-5">
            <Image
              src="/img/beranda/roadmap.png"
              alt="roadmap"
              className="size-12"
              width={500}
              height={500}
            />
            <h1 className="text-4xl font-bold text-[#0F4C75] tracking-wide">
              Alur Ujian
            </h1>
          </div>
          <CompAlurUjian>
            <div className="flex gap-3 items-center">
              <h1 className="font-bold text-2xl tracking-wide">
                Daftar / Login
              </h1>
              <Image
                src="/img/beranda/login.png"
                alt="login"
                className="size-9"
                width={100}
                height={100}
              />
            </div>
            <h2 className="font-semibold mt-3 text-justify text-[#393E46] text-lg sm:text-xl">
              Buat akun baru atau masuk dengan akun yang sudah ada untuk
              mengakses sistem ujian online
            </h2>
          </CompAlurUjian>
          <CompAlurUjian>
            <div className="flex gap-3 items-center">
              <h1 className="font-bold text-2xl tracking-wide">Pilih Ujian</h1>
              <Image
                src="/img/beranda/choose.png"
                alt="choose"
                className="size-9"
                width={100}
                height={100}
              />
            </div>
            <h2 className="font-semibold mt-3 text-justify text-[#393E46] text-lg sm:text-xl">
              Telusuri dan pilih ujian yang tersedia sesuai jadwal yang ingin
              Anda ikuti
            </h2>
          </CompAlurUjian>
          <CompAlurUjian>
            <div className="flex gap-3 items-center">
              <h1 className="font-bold text-2xl tracking-wide">
                Kerjakan Ujiannya
              </h1>
              <Image
                src="/img/beranda/write.png"
                alt="working"
                className="size-9"
                width={100}
                height={100}
              />
            </div>
            <h2 className="font-semibold mt-3 text-justify text-[#393E46] text-lg sm:text-xl">
              Kerjakan soal secara online melalui antarmuka yang sederhana,
              didukung dengan navigasi soal
            </h2>
          </CompAlurUjian>
          <CompAlurUjian>
            <div className="flex gap-3 items-center">
              <h1 className="font-bold text-2xl tracking-wide">Lihat Nilai</h1>
              <Image
                src="/img/beranda/nilai.png"
                alt="Nilai"
                className="size-9"
                width={100}
                height={100}
              />
            </div>
            <h2 className="font-semibold mt-3 text-justify text-[#393E46] text-lg sm:text-xl">
              Setelah selesai, langsung dapatkan hasil ujian dan nilai anda
            </h2>
          </CompAlurUjian>
        </div>
      </div>
    </LayoutIntroductionsSystem>
  );
}
