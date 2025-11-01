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
      <div className="bg-slate-200 rounded-md w-10/12 h-16 mx-auto flex items-center px-3 shadow-lg shadow-slate-700 md:hidden">
        <Image
          src="/img/footer/logo.png"
          alt="Logo"
          width={400}
          height={400}
          className="w-full"
        />
      </div>
      <Link
        href={
          isUserThereTeacher === true
            ? "/Teacher/dashboard"
            : "/Student/Dashboard"
        }
        className="cursor-pointer flex items-center gap-x-6 w-2/3"
      >
        <Image
          src={`/img/global/${
            isLocationPage === "/Student/Dashboard"
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
        className="cursor-pointer flex items-center gap-x-5 w-2/3"
      >
        <Image
          src={`/img/global/${
            isLocationPage === "/Student/Profile" ? "user-full" : "user-outline"
          }.png`}
          alt="Profile"
          width={200}
          height={200}
          className="size-9"
        />
        <span className="text-slate-200">Profil</span>
      </Link>
      <Link href="/" className="cursor-pointer flex items-center gap-x-5 w-2/3">
        <Image
          src="/img/global/home-full.png"
          alt="Home"
          width={200}
          height={200}
          className="size-9"
        />
        <span className="text-slate-200">Beranda</span>
      </Link>
      <div className="cursor-pointer flex items-center gap-x-5 w-2/3">
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
                <Button variant="secondary" className="cursor-pointer">
                  Batal
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleLogout} className="cursor-pointer">
                  Oke
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
