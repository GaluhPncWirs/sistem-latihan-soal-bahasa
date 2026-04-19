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
import { Home, LayoutDashboard, LogOut, User2 } from "lucide-react";

export default function ListSidebar() {
  const getIdUsers = useGetIdUsers((state) => state.role);
  return (
    <>
      <Image
        src="/img/global/logo.png"
        alt="Logo"
        width={400}
        height={400}
        className="w-52"
      />
      <div className="grid grid-cols-2 gap-7 place-content-center place-items-center mt-7 md:place-items-baseline md:mt-0 md:grid-cols-1 md:h-83">
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
          <LayoutDashboard className="size-7" />
          <span className="font-semibold">Dashboard</span>
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
          <User2 className="size-7" />
          <span className="font-semibold">Profil</span>
        </Link>
        <Link
          href="/Introduction"
          className="cursor-pointer flex items-center gap-x-3"
        >
          <Home className="size-7" />
          <span className="font-semibold">Beranda</span>
        </Link>
        <div className="cursor-pointer flex items-center gap-x-3">
          <LogOut className="size-7" />
          <Dialog>
            <DialogTrigger asChild>
              <span className="font-semibold">Logout</span>
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
