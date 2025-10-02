import LayoutIntroductionsSystem from "@/layout/introductionSystem";
import Image from "next/image";

export default function CaraPakaiSistemUjian() {
  return (
    <LayoutIntroductionsSystem>
      <div className="pt-24 bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        <div className="mt-3 mx-auto max-[640px]:w-11/12 sm:w-3/4 md:w-11/12 lg:w-3/4">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Cara Menggunakan Sistem Ujian Online
          </h1>
          <p className="my-5 text-lg font-semibold">
            Ikuti Langkah-langkah Berikut ini Untuk Memulai Ujian
          </p>
          <div className="grid gap-4 max-[640px]:grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
            <div className="bg-white p-5 flex rounded-lg gap-x-3">
              <h1 className="w-8 h-7 bg-amber-300 rounded-full flex justify-center items-center font-bold">
                1
              </h1>
              <Image
                src="/img/howToUse/login_tutor.png"
                alt="Login"
                width={500}
                height={500}
                className="w-1/5"
              />
              <div>
                <h1 className="text-xl font-semibold mb-1">
                  Login Ke Akun Anda
                </h1>
                <p>Masukkan Email dan Password Anda Dihalaman Login.</p>
              </div>
            </div>
            <div className="bg-white p-5 flex rounded-lg gap-x-3">
              <h1 className="w-8 h-7 bg-amber-300 rounded-full flex justify-center items-center font-bold">
                2
              </h1>
              <Image
                src="/img/howToUse/chooseExam_tutor.png"
                alt="Pilih Ujian"
                width={500}
                height={500}
                className="w-1/5"
              />
              <div>
                <h1 className="text-xl font-semibold mb-1">
                  Pilih Ujian Yang Tersedia
                </h1>
                <p>Buka Dashboard Lalu Pilih Ujian Yang Ingin Ikut.</p>
              </div>
            </div>
            <div className="bg-white p-5 flex rounded-lg gap-x-3">
              <h1 className="w-8 h-7 bg-amber-300 rounded-full flex justify-center items-center font-bold">
                3
              </h1>
              <Image
                src="/img/howToUse/readInstructions_tutor.png"
                alt="Instruksi"
                width={500}
                height={500}
                className="w-1/5"
              />
              <div>
                <h1 className="text-xl font-semibold mb-1">
                  Baca Instruksi Ujian
                </h1>
                <p>Pastikan Memahami Aturan Dan Durasi Ujian.</p>
              </div>
            </div>
            <div className="bg-white p-5 flex rounded-lg gap-x-3">
              <h1 className="w-8 h-7 bg-amber-300 rounded-full flex justify-center items-center font-bold">
                4
              </h1>
              <Image
                src="/img/howToUse/do_itExams_tutor.png"
                alt="Kerjakan"
                width={500}
                height={500}
                className="w-1/5"
              />
              <div>
                <h1 className="text-xl font-semibold mb-1">Kerjakan Soal</h1>
                <p>Jawab Soal-Soal Sesuai Dengan Waktu Yang Tersedia.</p>
              </div>
            </div>
            <div className="bg-white p-5 flex rounded-lg gap-x-3">
              <h1 className="w-8 h-7 bg-amber-300 rounded-full flex justify-center items-center font-bold">
                5
              </h1>
              <Image
                src="/img/howToUse/submitExam_tutor.png"
                alt="Selesai"
                width={500}
                height={500}
                className="w-1/5"
              />
              <div>
                <h1 className="text-xl font-semibold mb-1">
                  Kumpulkan Jawaban
                </h1>
                <p>Klik tombol "Submit" Dan Pastikan Telah Selesai Semua.</p>
              </div>
            </div>
          </div>
          <div className="mt-5 bg-white rounded-md p-5">
            <h1 className="text-2xl font-semibold max-[640px]:text-xl">
              ✅ Tips :
            </h1>
            <ul className="mt-4 ml-3 flex flex-col gap-y-2 text-lg max-[640px]:text-base">
              <li className="flex items-center gap-x-3">
                <Image
                  src="/img/howToUse/signal.png"
                  alt="Sinyal"
                  width={200}
                  height={200}
                  className="max-[640px]:w-[6%] sm:w-[5%] md:w-[3%]"
                />
                <span>Pastikan Jaringan Stabil</span>
              </li>
              <li className="flex items-center gap-x-3">
                <Image
                  src="/img/howToUse/automatic.png"
                  alt="Otomatis"
                  width={200}
                  height={200}
                  className="max-[640px]:w-[6%] sm:w-[5%] md:w-[3%]"
                />
                <span>
                  Jawaban Disimpan Secara Otomatis Jika Waktu Telah Habis
                </span>
              </li>
              <li className="flex items-center gap-x-3">
                <Image
                  src="/img/howToUse/warning.png"
                  alt="Peringatan"
                  width={200}
                  height={200}
                  className="max-[640px]:w-[6%] sm:w-[5%] md:w-[3%]"
                />
                <span>Jangan Tutup Tab/Browser Sebelum Ujian Selesai</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutIntroductionsSystem>
  );
}
