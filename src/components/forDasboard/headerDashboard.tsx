import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { usePathname } from "next/navigation";
import HamburgerMenuBar from "../sidebar/compSidebar";

export default function HeaderDasboard(props: any) {
  const { user, fullName, totalExams } = props;
  const urlPathName = usePathname();
  function informExams() {
    if (urlPathName === "/Student/Dashboard") {
      const isNotLate = totalExams.filter(
        (fil: any) => fil.hasil_ujian !== "telat" || !fil.status_exam
      );
      return (
        <div className="flex items-center justify-end gap-x-3">
          {isNotLate.length > 0 ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative flex justify-end">
                  <div className="h-4 w-4 bg-red-400 absolute rounded-md flex justify-center items-center">
                    <span className="text-xs font-bold">
                      {isNotLate.length}
                    </span>
                  </div>
                  <Image
                    src="/img/dashboardStudent/bell.png"
                    alt="Notification"
                    width={200}
                    height={200}
                    className="w-[60%]"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit p-3">
                <h1 className="font-semibold text-xs">
                  Ada {isNotLate.length} Ujian Yang Belum Dikerjakan
                </h1>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Image
              src="/img/dashboardStudent/bell.png"
              alt="Notification"
              width={200}
              height={200}
              className="max-[640px]:w-1/3 sm:w-1/3 md:w-[55%]"
            />
          )}
          <HamburgerMenuBar />
        </div>
      );
    } else {
      const filterNilaiSiswa = totalExams.filter(
        (fil: any) => fil.hasil_ujian === "pending"
      );
      return (
        <div className="flex items-center justify-end gap-x-3">
          {filterNilaiSiswa.length > 0 ? (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="relative flex justify-end">
                  <div className="h-4 w-4 bg-red-400 absolute rounded-md flex justify-center items-center">
                    <span className="text-xs">{filterNilaiSiswa.length}</span>
                  </div>
                  <Image
                    src="/img/dashboardStudent/bell.png"
                    alt="Notification"
                    width={200}
                    height={200}
                    className="w-[60%]"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit p-3">
                <h1 className="font-semibold text-xs">
                  Ada {filterNilaiSiswa.length} Ujian Yang Belum Dinilai
                </h1>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Image
              src="/img/dashboardStudent/bell.png"
              alt="Notification"
              width={200}
              height={200}
              className="max-[640px]:w-1/3 sm:w-1/3 md:w-[55%]"
            />
          )}
          <HamburgerMenuBar />
        </div>
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
          src="/img/profileStudent/userProfile.png"
          alt="Img Profile"
          height={500}
          width={500}
          className="w-1/5 rounded-full max-[640px]:w-1/4"
        />
        <h1 className="text-3xl max-[640px]:text-2xl font-bold">
          Halo Selamat Datang,{" "}
          <span className="block capitalize mt-2">{fullName}</span>
        </h1>
      </div>
    </div>
  );
}
