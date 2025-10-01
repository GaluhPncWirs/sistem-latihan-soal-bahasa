import FooterComponent from "@/components/footer/footerComp";
import NavigasiBar from "@/components/navigasiBar/navbar";

export default function LayoutIntroductionsSystem({ children }: any) {
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] overflow-auto">
      <NavigasiBar />
      {children}
      <FooterComponent />
    </div>
  );
}
