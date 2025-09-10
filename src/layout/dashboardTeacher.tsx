import LayoutBodyContent from "./bodyContent";

export default function LayoutDashboardTeacher({ children }: any) {
  return (
    <LayoutBodyContent>
      <div className="bg-[#476EAE] w-1/5 fixed top-16 h-[36rem]">
        <ul className="flex flex-col items-center justify-evenly h-full text-slate-200 font-medium text-xl">
          <li>Dashboard</li>
          <li>Buat Soal</li>
          <li>Kelola Ujian</li>
          <li>Nilai Siswa</li>
        </ul>
      </div>
      <div>{children}</div>
    </LayoutBodyContent>
  );
}
