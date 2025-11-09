import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import HamburgerMenuBar from "../sidebar/compSidebar";

export default function HeaderDashboard({ remainder, isLocationPage }: any) {
  return (
    <div className="flex items-center justify-end gap-x-3">
      {remainder.length > 0 ? (
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative flex justify-end">
              <div className="size-4 bg-red-400 absolute rounded-md flex justify-center items-center">
                <span className="text-xs font-bold">{remainder.length}</span>
              </div>
              <Image
                src="/img/global/bell.png"
                alt="Notification"
                width={200}
                height={200}
                className="size-8"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-3">
            <h1 className="font-semibold text-xs">
              Ada {remainder.length} Ujian Yang Belum{" "}
              {isLocationPage === "/Student/Dashboard"
                ? "Dikerjakan"
                : "Dinilai"}
            </h1>
          </PopoverContent>
        </Popover>
      ) : (
        <Image
          src="/img/global/bell.png"
          alt="Notification"
          width={200}
          height={200}
          className="size-8"
        />
      )}
      <HamburgerMenuBar />
    </div>
  );
}
