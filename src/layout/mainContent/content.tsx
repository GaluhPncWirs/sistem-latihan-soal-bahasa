import { useVerifyToken } from "@/app/hooks/getVerifyToken";
import React, { useEffect } from "react";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";
import { useGetDataUsers } from "@/store/useGetDataUsers/state";
import { usePathname } from "next/navigation";
import { useLocationPage } from "@/store/useLocationPage/state";
import ListSidebar from "@/components/global/listSidebar/content";
import { useShallow } from "zustand/shallow";
import DialogFormAddDataUser from "@/components/global/dialogTipeAkun/content";

export default function MainContent({ children }: React.PropsWithChildren) {
  const { loadingSession, statusToken } = useVerifyToken();
  const getDataUsers = useGetDataUsers((state) => state.setGetDataUsers);
  const { setHandleGetIdUsers, idUsers, role } = useGetIdUsers(
    useShallow((state) => ({
      setHandleGetIdUsers: state.setHandleGetIdUsers,
      idUsers: state.idUsers,
      role: state.role,
    })),
  );

  const pathName = usePathname();
  const setLocationPage = useLocationPage((state) => state.setLocationPage);

  useEffect(() => {
    setHandleGetIdUsers();
  }, [setHandleGetIdUsers]);

  useEffect(() => {
    if (role === "pelajar") {
      getDataUsers(idUsers, "account-student", "idStudent");
    } else if (role === "pengajar") {
      getDataUsers(idUsers, "account_teacher", "id_teacher");
    }
  }, [role, idUsers, getDataUsers]);

  useEffect(() => {
    setLocationPage(pathName);
  }, [pathName]);

  return (
    <div className="bg-black">
      <DialogFormAddDataUser idUsers={idUsers} />
      <div
        className={`bg-blue-100 flex ${
          loadingSession && `opacity-50 animate-pulse`
        }`}
      >
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
