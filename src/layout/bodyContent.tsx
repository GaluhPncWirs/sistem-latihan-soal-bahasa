import { useVerifyToken } from "@/app/hooks/getVerifyToken";
import ListSidebar from "@/components/sidebar/listSidebar/content";
import React, { useEffect } from "react";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";
import { useGetDataUsers } from "@/store/useGetDataUsers/state";

export default function LayoutBodyContent({
  children,
}: React.PropsWithChildren) {
  const { loadingSession, statusToken } = useVerifyToken();
  const getDataUsers = useGetDataUsers((state) => state.setGetDataUsers);
  const getidUsers = useGetIdUsers((state) => state.setHandleGetIdUsers);
  useEffect(() => {
    getidUsers();
  }, []);
  const idUsers = useGetIdUsers((state) => state.idUsers);
  const role = useGetIdUsers((state) => state.role);
  useEffect(() => {
    if (role === "pelajar") {
      getDataUsers(idUsers, "account-student", "idStudent");
    } else if (role === "pengajar") {
      getDataUsers(idUsers, "account_teacher", "id_teacher");
    }
  }, [role, idUsers]);

  return (
    <div className="bg-black">
      <div
        className={`bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] flex ${
          loadingSession && `opacity-50 animate-pulse`
        }`}
      >
        <div className="md:w-1/4 lg:w-1/5 hidden md:block">
          <div className="bg-[#476EAE] md:w-1/4 lg:w-1/5 fixed h-screen shadow-xl shadow-slate-700 flex flex-col items-center pt-14 text-slate-200 font-medium text-xl">
            <ListSidebar />
          </div>
        </div>
        <div className="w-11/12 mx-auto md:w-2/3 lg:w-3/4 my-10">
          {children}
        </div>
      </div>
    </div>
  );
}
