import { useVerifyToken } from "@/app/hooks/getVerifyToken";
import React, { useEffect, useRef, useState } from "react";
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
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/data";
import { toast } from "sonner";

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

  const pathName = usePathname();
  const setLocationPage = useLocationPage((state) => state.setLocationPage);
  const [isTypeAccount, setIsTypeAccount] = useState<boolean>(false);

  // 1. Inisialisasi ID User saat mount
  useEffect(() => {
    setHandleGetIdUsers();
  }, [setHandleGetIdUsers]);

  // 2. Efek Sinkronisasi Data User berdasarkan Role
  useEffect(() => {
    if (role === "pelajar") {
      getDataUsers(idUsers, "account-student", "idStudent");
    } else if (role === "pengajar") {
      getDataUsers(idUsers, "account_teacher", "id_teacher");
    }
  }, [role, idUsers, getDataUsers]);

  // 3. Efek Navigasi (Gabungkan state yang bergantung pada pathName)
  useEffect(() => {
    // Update lokasi halaman
    setLocationPage(pathName);

    // Reset isTypeAccount setiap pindah halaman
    setIsTypeAccount(false);
  }, [pathName, setLocationPage]);

  // 4. Efek Logic typeAccount (dipisah karena dependensi berbeda)
  useEffect(() => {
    if (typeAccount === "google") {
      setIsTypeAccount(true);
    }
  }, [typeAccount]);

  async function handleAddClassAndNis(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const resultPayload = Object.fromEntries(formData.entries());

    const { error } = await supabase
      .from("account-student")
      .update(resultPayload)
      .eq("idStudent", idUsers)
      .single();

    if (error) {
      toast("Gagal ❌", {
        description: "Edit Profil Gagal",
      });
    } else {
      toast("Berhasil ✅", {
        description: "Edit Profil Berhasil Di Update",
      });
    }
  }

  return (
    <div className="bg-black">
      <Dialog open={isTypeAccount} onOpenChange={setIsTypeAccount}>
        <DialogContent>
          <form onSubmit={(event) => handleAddClassAndNis(event)}>
            <DialogHeader>
              <DialogTitle>Terindikasi Login Menggunakan Google</DialogTitle>
              <DialogDescription>
                Sistem mendeteksi bahwa Anda login menggunakan Google. maka dari
                itu anda harus menambahkan kelas pada akun anda ini untuk bisa
                menggunakan sistem ini.
              </DialogDescription>
              <div>
                <label htmlFor="classes" className="mb-2 block">
                  Kelas
                </label>
                <Input type="text" id="classes" name="classes" required />
              </div>
              <div>
                <label htmlFor="nis" className="mb-2 block">
                  NIS
                </label>
                <Input type="text" id="nis" name="nis" required />
              </div>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" className="mt-5">
                  Confirm
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div
        className={`bg-blue-100 flex ${
          loadingSession && `opacity-50 animate-pulse`
        }`}
      >
        {pathName === "/Student/Exams/StartExam" ? (
          <>{children}</>
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
