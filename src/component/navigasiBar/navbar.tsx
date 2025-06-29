import Image from "next/image";
import Link from "next/link";

export default function NavigasiBar() {
  return (
    <div className="w-full h-16 bg-amber-300 fixed">
      <div className="flex items-center h-full gap-x-3">
        <div className="basis-1/5 h-full flex items-center justify-center">
          {/* <Image src="" alt="" width={500} height={500}/> */}
          <h1>Logo</h1>
        </div>
        <ul className="basis-3/5 flex justify-around h-full items-center">
          <li className="cursor-pointer text-xl font-semibold">
            <Link href="/Exams">Soal</Link>
          </li>
          <li className="cursor-pointer text-xl font-semibold">
            <Link href="/Profile">Profil</Link>
          </li>
        </ul>
        <div className="basis-1/5 h-full flex items-center justify-center gap-5 mr-5">
          <Link
            href="/Autentikasi/Daftar"
            className="bg-blue-400 py-1.5 px-5 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold text-lg"
          >
            Daftar
          </Link>
          <Link
            href="/Autentikasi/Login"
            className="bg-blue-400 py-1.5 px-5 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold text-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
