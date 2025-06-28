import NavigasiBar from "@/component/navigasiBar/navbar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

export default function Student() {
  return (
    <div className="bg-slate-200">
      <NavigasiBar />

      {/* dasboard untuk siswa */}
      <div className="w-3/4 mx-auto mt-5 p-5 pb-10">
        <h1 className="text-4xl font-bold text-center">Dashboard Siswa</h1>
        <h1 className="text-2xl font-bold mt-5">Halo lorem ipsum</h1>
        <div className="w-10/12 mx-auto mt-8">
          <div className="mb-7">
            <h1 className="text-xl font-semibold bg-amber-400 text-center rounded-md py-2 mb-5">
              Ujian Yang Tersedia
            </h1>
            <table className="border-collapse w-full">
              <thead>
                <tr className="bg-slate-500 border-2 border-black">
                  <th className="text-slate-100 p-2">Ujian</th>
                  <th className="text-slate-100 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-2 border-black">
                  <td className="px-3">lorem ipsum dolor</td>
                  <td className="px-3">Complete</td>
                </tr>
                <tr className="border-2 border-black">
                  <td className="px-3">lorem ipsum</td>
                  <td className="px-3">
                    <button className="hover:underline cursor-pointer hover:text-blue-700">
                      Uncomplete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h1 className="text-xl font-semibold bg-amber-400 text-center rounded-md py-2 mb-5">
              Hasil Nilai Ujian
            </h1>
            <table className="border-collapse w-full">
              <thead>
                <tr className="bg-slate-500 border-2 border-black">
                  <th className="text-slate-100 p-2">Nama Ujian</th>
                  <th className="text-slate-100 p-2">Nilai Ujian</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-2 border-black">
                  <td className="px-3">
                    <HoverCard openDelay={200} closeDelay={200}>
                      <HoverCardTrigger asChild>
                        <Link
                          href="/Student/ResultExam"
                          className="hover:underline hover:text-blue-700"
                        >
                          lorem ipsum dolor
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-fit p-2">
                        <h1 className="font-semibold text-xs">
                          Lihat Hasil Ujian
                        </h1>
                      </HoverCardContent>
                    </HoverCard>
                  </td>
                  <td className="px-3">94</td>
                </tr>
                <tr className="border-2 border-black">
                  <td className="px-3">lorem ipsum</td>
                  <td className="px-3">80</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
