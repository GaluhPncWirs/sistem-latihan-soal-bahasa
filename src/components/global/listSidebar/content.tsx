import { useHandleLogout } from "@/app/hooks/getHandleLogout";
import { useLocationPage } from "@/store/useLocationPage/state";
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
import { useGetIdUsers } from "@/store/useGetIdUsers/state";

export default function ListSidebar() {
  const getIdUsers = useGetIdUsers((state) => state.role);
  const isLocationPage = useLocationPage((state) => state.curentLocationPage);
  return (
    <>
      <div className="hidden md:flex bg-slate-200 rounded-md w-52 mx-auto items-center shadow-lg shadow-slate-700 md:w-10/12 p-2">
        <Image src="/img/global/logo.png" alt="Logo" width={400} height={400} />
      </div>
      <div className="grid grid-cols-2 gap-7 place-content-center place-items-center mt-7 md:place-items-baseline md:mt-0 md:grid-cols-1 md:h-96">
        <Link
          href={
            getIdUsers.includes("pelajar")
              ? "/Student/Dashboard"
              : getIdUsers.includes("pengajar")
                ? "/Teacher/dashboard"
                : "/"
          }
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
          <span>Dashboard</span>
        </Link>
        <Link
          href={
            getIdUsers.includes("pelajar")
              ? "/Student/Profile"
              : getIdUsers.includes("pengajar")
                ? "/Teacher/Profile"
                : "/"
          }
          className="cursor-pointer flex items-center gap-x-3"
        >
          <Image
            src={`/img/global/${
              isLocationPage === "/Student/Profile" ||
              isLocationPage === "/Teacher/Profile"
                ? "user-full"
                : "user-outline"
            }.png`}
            alt="Profile"
            width={200}
            height={200}
            className="size-9"
          />
          <span>Profil</span>
        </Link>
        <Link href="/" className="cursor-pointer flex items-center gap-x-3">
          <Image
            src="/img/global/home.png"
            alt="Home"
            width={200}
            height={200}
            className="size-9"
          />
          <span>Beranda</span>
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
              <span>Logout</span>
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
                  <Button onClick={useHandleLogout()}>Oke</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
