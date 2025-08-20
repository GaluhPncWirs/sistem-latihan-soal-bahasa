import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="h-screen flex justify-center items-center flex-col">
        <Image
          src="/img/not-found/not_found.png"
          alt="notfound"
          width={500}
          height={500}
          className="w-1/2"
          priority
        />
        <h1 className="font-semibold text-2xl text-[#6C63FF]">
          Halaman Tidak Ditemukan
        </h1>
        <Link
          href="/"
          className="text-lg font-bold bg-[#6C63FF] text-white px-5 py-1 rounded-xl mt-5 hover:text-purple-200"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
