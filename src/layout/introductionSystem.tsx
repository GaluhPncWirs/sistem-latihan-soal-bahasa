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
    <main>
      <NavigasiBar />
      {children}
      <FooterComponent />
    </main>
  );
}
