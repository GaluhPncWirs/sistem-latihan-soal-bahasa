import FooterComponent from "@/component/footer/footerComp";
import NavigasiBar from "@/component/navigasiBar/navbar";

export default function LayoutBodyContent({ children }: any) {
  return (
    <>
      <NavigasiBar />
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9]">
        {children}
      </div>
      <FooterComponent />
    </>
  );
}
