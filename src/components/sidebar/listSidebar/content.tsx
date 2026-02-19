import { useHandleLogout } from "@/app/hooks/getHandleLogout";
import { useIdStudentStore } from "@/store/idStudent/state";
import { useLocationPage } from "@/store/locationPage/state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

export default function ListSidebar() {
  const getIdStudent = useIdStudentStore((state: any) => state.idStudent);
  const isLocationPage = useLocationPage(
    (state: any) => state.curentLocationPage,
  );
  const logout = useHandleLogout();
  return (
    <>
      <div className="bg-slate-200 rounded-md w-52 mx-auto flex items-center shadow-lg shadow-slate-700 md:w-10/12 p-2">
        <Image src="/img/global/logo.png" alt="Logo" width={400} height={400} />
      </div>
      <div className="flex flex-col justify-evenly h-96">
        <Link
          href={getIdStudent ? "/Student/Dashboard" : "/Teacher/dashboard"}
          className="cursor-pointer flex items-center gap-x-3"
        >
          <Image
            src={`/img/global/${
              isLocationPage === "/Student/Dashboard" ||
              isLocationPage === "/Teacher/dashboard"
                ? "dashboard-full"
                : "dashboard-outline"
            }.png`}
            alt="Dashboard"
            width={200}
            height={200}
            className="size-8"
          />
          <span className="text-slate-200">Dashboard</span>
        </Link>
        <Link
          href={getIdStudent ? "/Student/Profile" : "/Teacher/Profil"}
          className="cursor-pointer flex items-center gap-x-3"
        >
          <Image
            src={`/img/global/${
              isLocationPage === "/Student/Profile" ||
              isLocationPage === "/Teacher/Profil"
                ? "user-full"
                : "user-outline"
            }.png`}
            alt="Profile"
            width={200}
            height={200}
            className="size-9"
          />
          <span className="text-slate-200">Profil</span>
        </Link>
        <Link href="/" className="cursor-pointer flex items-center gap-x-3">
          <Image
            src="/img/global/home.png"
            alt="Home"
            width={200}
            height={200}
            className="size-9"
          />
          <span className="text-slate-200">Beranda</span>
        </Link>
        <div className="cursor-pointer flex items-center gap-x-3">
          <Image
            src="/img/global/logout.png"
            alt="Logout"
            width={200}
            height={200}
            className="size-9"
          />
          <Dialog>
            <DialogTrigger asChild>
              <span className="text-slate-200">Logout</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Keluar Sistem</DialogTitle>
                <DialogDescription className="mt-2">
                  Apakah Anda Yakin Ingin Logout Dari Sistem ini ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Batal</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={logout}>Oke</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
