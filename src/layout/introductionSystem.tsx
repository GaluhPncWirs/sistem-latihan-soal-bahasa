import { useIdUserStore } from "@/app/stateManagement/idStudent/state";
import FooterComponent from "@/components/footer/footerComp";
import NavigasiBar from "@/components/navigasiBar/navbar";
import { useEffect } from "react";

export default function LayoutIntroductionsSystem({ children }: any) {
  const fetchIdUser = useIdUserStore((func: any) => func.fetchIdStudent);
  useEffect(() => {
    fetchIdUser();
  }, []);
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
      <NavigasiBar />
      {children}
      <FooterComponent />
    </div>
  );
}
