import { useVerifyToken } from "@/app/hooks/getVerifyToken";
import React, { useEffect } from "react";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";
import { useGetDataUsers } from "@/store/useGetDataUsers/state";
import { usePathname } from "next/navigation";
import { useLocationPage } from "@/store/useLocationPage/state";
import ListSidebar from "@/components/global/listSidebar/content";
import { useShallow } from "zustand/shallow";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainContent({ children }: React.PropsWithChildren) {
  const { loadingSession, statusToken } = useVerifyToken();
  const getDataUsers = useGetDataUsers((state) => state.setGetDataUsers);
  const { setHandleGetIdUsers, idUsers, role, typeAccount } = useGetIdUsers(
    useShallow((state) => ({
      setHandleGetIdUsers: state.setHandleGetIdUsers,
      idUsers: state.idUsers,
      role: state.role,
      typeAccount: state.typeAccount,
    })),
  );
  useEffect(() => {
    setHandleGetIdUsers();
  }, []);

  useEffect(() => {
    if (role === "pelajar") {
      getDataUsers(idUsers, "account-student", "idStudent");
    } else if (role === "pengajar") {
      getDataUsers(idUsers, "account_teacher", "id_teacher");
    }
  }, [role, idUsers]);
  const pathName = usePathname();
  const isLocationPage = useLocationPage((state) => state.setLocationPage);

  useEffect(() => {
    isLocationPage(pathName);
  }, [pathName]);

  return (
    <div className="bg-black">
      <div
        className={`bg-blue-100 flex ${
          loadingSession && `opacity-50 animate-pulse`
        }`}
      >
        <Dialog open={typeAccount === "google" ? true : false}>
          <DialogContent>
            <DialogHeader>Terindikasi Login Menggunakan Google</DialogHeader>
            <DialogDescription>
              Sistem mendeteksi bahwa Anda login menggunakan Google. maka dari
              itu anda harus menambahkan kelas pada akun ada ini untuk bisa
              menggunakan sistem ini.
            </DialogDescription>
            <DialogFooter>
              <Link href="/Student/Profile">Oke</Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {pathName === "/Student/Exams/StartExam" ? (
          children
        ) : (
          <>
            <div className="md:w-1/4 lg:w-1/5 hidden md:block">
              <div className="bg-slate-50 md:w-1/4 lg:w-1/5 fixed h-screen shadow-xl shadow-slate-700 flex flex-col items-center pt-14 font-medium text-xl">
                <ListSidebar />
              </div>
            </div>
            <div className="w-11/12 mx-auto md:w-2/3 lg:w-3/4 my-10">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
