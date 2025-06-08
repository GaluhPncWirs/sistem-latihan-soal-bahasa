import Image from "next/image";

export default function NavigasiBar() {
  return (
    <div className="w-full h-16 bg-amber-300">
      <div className="flex items-center h-full gap-x-3">
        <div className="basis-1/5 h-full flex items-center justify-center">
          {/* <Image src="" alt="" width={500} height={500}/> */}
          <h1>Logo</h1>
        </div>
        <ul className="basis-3/5 flex justify-around h-full items-center">
          <li className="cursor-pointer text-xl font-semibold">Soal</li>
          <li className="cursor-pointer text-xl font-semibold">Profil</li>
        </ul>
        <div className="basis-1/5 h-full flex items-center justify-center">
          <button className="bg-blue-400 py-1.5 px-10 rounded-lg hover:bg-blue-500 cursor-pointer font-semibold text-lg">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
