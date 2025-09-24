"use client";
import FooterComponent from "@/component/footer/footerComp";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LayoutBodyContent({ children }: any) {
  const params = usePathname();
  // useEffect(() => {
  //   function handleBack(e: PopStateEvent) {
  //     console.log("tombol kembali telah aktif");
  //     console.log(e.preventDefault());
  //   }

  //   window.addEventListener("popstate", handleBack);

  //   return () => window.removeEventListener("popstate", handleBack);
  // }, []);
  return (
    <>
      {!params.startsWith("/Student/Exams") && <NavigasiBar />}
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] overflow-auto">
        {children}
      </div>
      <FooterComponent />
    </>
  );
}
