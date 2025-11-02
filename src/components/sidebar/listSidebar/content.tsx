import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ListSidebar({ isLocationPage }: any) {
  const [isUserThereStudent, setIsUserThereStudent] = useState<boolean>(false);
  const [isUserThereTeacher, setIsUserThereTeacher] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    const isUserDataSiswa = localStorage.getItem("idLoginSiswa");
    const isUserDataGuru = localStorage.getItem("idLoginGuru");
    if (isUserDataSiswa) {
      const isObjectTrue = Object.keys(isUserDataSiswa).length > 0;
      setIsUserThereStudent(isObjectTrue);
    } else if (isUserDataGuru) {
      const isObjectTrue = Object.keys(isUserDataGuru).length > 0;
      setIsUserThereTeacher(isObjectTrue);
    }
  }, []);

  async function handleLogout() {
    const responseDelCookies = await fetch("/api/delCookies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const messageRespons = await responseDelCookies.json();
    localStorage.removeItem("idLoginSiswa");
    localStorage.removeItem("idLoginGuru");
    localStorage.removeItem("idLoginGuru");
    localStorage.removeItem("random-number-exam");
    push("/Autentikasi/Login");
    toast("Berhasil ✅", { description: messageRespons.message });
  }

  return (
    <>
      <div className="bg-slate-200 rounded-md w-52 mx-auto flex items-center shadow-lg shadow-slate-700 md:w-10/12 p-2">
        <Image src="/img/global/logo.png" alt="Logo" width={400} height={400} />
      </div>
      <div className="flex flex-col justify-evenly h-96">
        <Link
          href={
            isUserThereTeacher === true
              ? "/Teacher/dashboard"
              : "/Student/Dashboard"
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
          <span className="text-slate-200">Dashboard</span>
        </Link>
        <Link
          href={
            isUserThereTeacher === true ? "/Teacher/Profil" : "/Student/Profile"
          }
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
                  <Button onClick={handleLogout}>Oke</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
