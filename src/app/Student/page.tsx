import NavigasiBar from "@/component/navigasiBar/navbar";

export default function Student() {
  return (
    <div className="bg-slate-200 h-screen">
      <NavigasiBar />

      {/* dasboard untuk siswa */}
      <div className="w-3/4 mx-auto mt-10 p-5">
        <h1 className="text-2xl font-bold">Dashboard Siswa</h1>
        <div className="w-10/12 mx-auto mt-8">
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
      </div>
    </div>
  );
}
