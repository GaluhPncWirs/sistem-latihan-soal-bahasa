import Image from "next/image";

export default function FloatingBarDashboardTeacher({
  handleClickItem,
  dashboardButton,
}: any) {
  return (
    <div className="mx-auto sticky top-3 z-10 w-full lg:w-11/12">
      <ul className="bg-[#476EAE] flex items-center text-slate-200 font-medium text-base p-4 sm:text-xl rounded-md justify-evenly gap-x-3 shadow-md shadow-slate-700">
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-y-1 flex-col"
          id="scheduleExams"
          onClick={(e) => handleClickItem(e.currentTarget.id)}
        >
          <Image
            src={`/img/global/${
              dashboardButton.scheduleExams
                ? "dashboard-full"
                : "dashboard-outline"
            }.png`}
            alt="Dashboard"
            width={200}
            height={200}
            className="size-7"
          />
          <span>Dashboard</span>
        </li>
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-y-1 flex-col"
          id="createQuestions"
          onClick={(e) => handleClickItem(e.currentTarget.id)}
        >
          <Image
            src={`/img/dashboardTeacher/${
              dashboardButton.createQuestions ? "create-full" : "create-outline"
            }.png`}
            alt="Create"
            width={200}
            height={200}
            className="size-7"
          />
          <span>Buat Soal</span>
        </li>
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-y-1 flex-col"
          id="viewResult"
          onClick={(e) => handleClickItem(e.currentTarget.id)}
        >
          <Image
            src={`/img/dashboardTeacher/${
              dashboardButton.viewResult
                ? "request-service-full"
                : "request-service-outline"
            }.png`}
            alt="Manage"
            width={200}
            height={200}
            className="size-8"
          />
          <span>Kelola Ujian</span>
        </li>
        <li
          className="cursor-pointer hover:text-slate-300 flex justify-center items-center gap-y-1 flex-col"
          id="manageStudent"
          onClick={(e) => handleClickItem(e.currentTarget.id)}
        >
          <Image
            src={`/img/dashboardTeacher/${
              dashboardButton.manageStudent
                ? "scorecard-full"
                : "scorecard-outline"
            }.png`}
            alt="Score"
            width={200}
            height={200}
            className="size-8"
          />
          <span>Nilai Siswa</span>
        </li>
      </ul>
    </div>
  );
}
