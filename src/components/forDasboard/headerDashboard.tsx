import Image from "next/image";
import HeaderDashboard from "../headerDashboard/content";
import { useLocationPage } from "@/store/locationPage/state";

export default function HeaderDasboard(props: any) {
  const { user, fullName, exams } = props;
  const locationPage = useLocationPage(
    (state: any) => state.curentLocationPage,
  );
  function informExams() {
    if (locationPage === "/Student/Dashboard") {
      const filterSisaUjian = exams.filter(
        (done: any) => done.status_exam !== true,
      );
      return (
        <HeaderDashboard
          remainder={filterSisaUjian}
          isLocationPage={locationPage}
        />
      );
    } else {
      const filterNilaiSiswa = exams
        .flatMap((fm: any) => fm.resultUjian)
        .filter((fil: any) => fil.hasil_ujian === "pending");
      return (
        <HeaderDashboard
          remainder={filterNilaiSiswa}
          isLocationPage={locationPage}
        />
      );
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard {user}</h1>
        {informExams()}
      </div>
      <div className="h-1 bg-slate-700 rounded-lg mt-3" />
      <div className="mt-5 flex items-center gap-x-7">
        <Image
          src="/img/global/userProfile.png"
          alt="Img Profile"
          height={500}
          width={500}
          className="rounded-full w-32 sm:w-40"
        />
        <h1 className="text-2xl font-bold sm:text-3xl">
          Halo Selamat Datang{" "}
          <span className="block capitalize mt-1.5">{fullName}</span>
        </h1>
      </div>
    </div>
  );
}
