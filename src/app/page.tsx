import NavigasiBar from "@/component/navigasiBar/navbar";

export default function Home() {
  return (
    <div className="bg-slate-200">
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
              <tr className="bg-slate-300 border">
                <th>Ujian</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="px-3">lorem ipsum dolor</td>
                <td className="px-3">Complete</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-5">
            <h1 className="text-lg font-semibold">
              Pertanyaan <span className="text-red-600">ke-1</span>
            </h1>
            <div>
              <h1>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Officiis totam, blanditiis
              </h1>
              <ul>
                <li>
                  <span>A.</span> lorem ipsum
                </li>
                <li>
                  <span>B.</span> lorem ipsum
                </li>
                <li>
                  <span>C.</span> lorem ipsum
                </li>
                <li>
                  <span>D.</span> lorem ipsum
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
