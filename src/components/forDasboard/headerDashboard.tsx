import Image from "next/image";
import { usePathname } from "next/navigation";
import { getResultExamDataStudent } from "@/app/hooks/getDataResultStudent";
import { useDataScheduleExams } from "@/app/hooks/getScheduleExams";
import HeaderDashboard from "../headerDashboard/content";

export default function HeaderDasboard(props: any) {
  const { user, fullName } = props;
  const urlPathName = usePathname();
  const dataStudentExams = getResultExamDataStudent();
  const scheduleExams = useDataScheduleExams();
  function informExams() {
    if (urlPathName === "/Student/Dashboard") {
      const filterSisaUjian = scheduleExams.filter(
        (done: any) => done.status_exam !== true
      );
      return <HeaderDashboard remainder={filterSisaUjian} />;
    } else {
      const filterNilaiSiswa = dataStudentExams
        .flatMap((fm: any) => fm.resultUjian)
        .filter((fil: any) => fil.hasil_ujian === "pending");
      return <HeaderDashboard remainder={filterNilaiSiswa} />;
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
          src="/img/profileStudent/userProfile.png"
          alt="Img Profile"
          height={500}
          width={500}
          className="rounded-full max-[640px]:w-32 sm:w-40"
        />
        <h1 className="text-3xl max-[640px]:text-2xl font-bold">
          Halo Selamat Datang{" "}
          <span className="block capitalize mt-2">{fullName}</span>
        </h1>
      </div>
    </div>
  );
}
