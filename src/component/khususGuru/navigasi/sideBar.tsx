import Image from "next/image";

export default function SideBarDashboardTeacher({ handleClickItem }: any) {
  return (
    <div className="w-full sticky top-20 mt-8 z-10 md:hidden">
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
          <span>Dashboard</span>
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
          <span>Buat Soal</span>
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
          <span>Kelola Ujian</span>
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
          <span>Nilai Siswa</span>
        </li>
      </ul>
    </div>
  );
}

{
  /* <div className="bg-[#476EAE] w-1/5 sticky top-16 h-screen rounded-br-lg mt-16 sm:hidden max-[640px]:hidden">
          <ul className="flex flex-col items-center h-3/4 gap-y-14 justify-center text-slate-200 font-medium text-xl">
            <li
              className="cursor-pointer hover:text-slate-300 flex items-center gap-x-3"
              onClick={() => window.location.reload()}
            >
              <Image
                src="/img/dashboardTeacher/dashboard.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/6 opacity-60"
              />
              <span>Dashboard</span>
            </li>
            <li
              className="cursor-pointer hover:text-slate-300 flex items-center gap-x-3"
              id="createQusetions"
              onClick={(e) => handleClickItem(e.currentTarget.id)}
            >
              <Image
                src="/img/dashboardTeacher/create.png"
                alt="Create"
                width={200}
                height={200}
                className="w-1/6"
              />
              <span>Buat Soal</span>
            </li>
            <li
              className="cursor-pointer hover:text-slate-300 flex items-center gap-x-3"
              id="viewResult"
              onClick={(e) => handleClickItem(e.currentTarget.id)}
            >
              <Image
                src="/img/dashboardTeacher/request-service.png"
                alt="Manage"
                width={200}
                height={200}
                className="w-1/6"
              />
              <span>Kelola Ujian</span>
            </li>
            <li
              className="cursor-pointer hover:text-slate-300 flex items-center gap-x-3"
              id="manageStudent"
              onClick={(e) => handleClickItem(e.currentTarget.id)}
            >
              <Image
                src="/img/dashboardTeacher/report-card.png"
                alt="Score"
                width={200}
                height={200}
                className="w-1/6"
              />
              <span>Nilai Siswa</span>
            </li>
          </ul>
        </div> */
}
