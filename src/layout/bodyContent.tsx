"use client";
import FooterComponent from "@/component/footer/footerComp";
import NavigasiBar from "@/component/navigasiBar/navbar";
import { usePathname } from "next/navigation";

export default function LayoutBodyContent({ children }: any) {
  const params = usePathname();
  return (
    <>
      {params !== "/Student/Exams" && <NavigasiBar />}
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        {children}
      </div>
      <FooterComponent />
    </>
  );
}
