import Image from "next/image";

export default function FloatingBarDashboardTeacher({ handleClickItem }: any) {
  return (
    <div className="mx-auto sticky top-8 z-10 max-[640px]:w-full sm:w-full md:w-11/12">
      <ul className="bg-[#476EAE] flex items-center text-slate-200 font-medium max-[640px]:text-lg sm:text-xl rounded-md max-[640px]:p-4 justify-evenly gap-x-3 sm:p-5">
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-x-3 max-[640px]:flex-col sm:flex-col"
          onClick={() => window.location.reload()}
        >
          <Image
            src="/img/dashboardTeacher/dashboard.png"
            alt="Dashboard"
            width={200}
            height={200}
            className="opacity-60 w-1/4"
          />
          <span className="max-[640px]:text-base">Dashboard</span>
        </li>
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-x-3 max-[640px]:flex-col sm:flex-col"
          id="createQusetions"
          onClick={(e) => handleClickItem(e.currentTarget.id)}
        >
          <Image
            src="/img/dashboardTeacher/create.png"
            alt="Create"
            width={200}
            height={200}
            className="w-[30%]"
          />
          <span className="max-[640px]:text-base">Buat Soal</span>
        </li>
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-x-3 max-[640px]:flex-col sm:flex-col"
          id="viewResult"
          onClick={(e) => handleClickItem(e.currentTarget.id)}
        >
          <Image
            src="/img/dashboardTeacher/request-service.png"
            alt="Manage"
            width={200}
            height={200}
            className="w-1/4"
          />
          <span className="max-[640px]:text-base">Kelola Ujian</span>
        </li>
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-x-3 max-[640px]:flex-col sm:flex-col"
          id="manageStudent"
          onClick={(e) => handleClickItem(e.currentTarget.id)}
        >
          <Image
            src="/img/dashboardTeacher/report-card.png"
            alt="Score"
            width={200}
            height={200}
            className="w-1/4"
          />
          <span className="max-[640px]:text-base">Nilai Siswa</span>
        </li>
      </ul>
    </div>
  );
}
