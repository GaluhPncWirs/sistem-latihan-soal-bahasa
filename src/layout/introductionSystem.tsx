"use client";
import FooterComponent from "@/components/footer/footerComp";
import NavigasiBar from "@/components/navigasiBar/navbar";
import { useEffect } from "react";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";

export default function LayoutIntroductionsSystem({ children }: any) {
  const getidUsers = useGetIdUsers((state) => state.setHandleGetIdUsers);
  useEffect(() => {
    getidUsers();
  }, []);
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
      <NavigasiBar />
      {children}
      <FooterComponent />
    </div>
  );
}
