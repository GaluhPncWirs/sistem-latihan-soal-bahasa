import { useHandleLogout } from "@/app/hooks/getHandleLogout";
import { useIdStudentStore } from "@/app/stateManagement/idStudent/state";
import { useIdTeacherStore } from "@/app/stateManagement/idTeacher/state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

export default function ButtonAutentications() {
  const logout = useHandleLogout();
  const isUserThereStudent = useIdStudentStore((state: any) => state.idStudent);
  const isUserThereTeacher = useIdTeacherStore((state: any) => state.idTeacher);
  return (
    <>
      {isUserThereStudent || isUserThereTeacher ? (
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-400 hover:bg-blue-500 hover:text-slate-200 py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg">
              Logout
            </button>
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
      ) : (
        <>
          <Link
            href="/Autentikasi/Daftar"
            className="bg-blue-400 hover:bg-blue-500 hover:text-slate-200 py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg"
          >
            Daftar
          </Link>
          <Link
            href="/Autentikasi/Login"
            className="border-2 border-slate-700 hover:opacity-70 py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg"
          >
            Login
          </Link>
        </>
      )}
    </>
  );
}
