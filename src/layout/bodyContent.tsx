import { useVerifyToken } from "@/app/hooks/getVerifyToken";
import ListSidebar from "@/components/sidebar/listSidebar/content";

export default function LayoutBodyContent({ children, isLocationPage }: any) {
  const { loadingSession, statusToken } = useVerifyToken();

  return (
    <div className="bg-black">
      <div
        className={`bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] flex ${
          loadingSession && `opacity-50 animate-pulse`
        }`}
      >
        <div className="md:w-1/4 lg:w-1/5 hidden md:block">
          <div className="bg-[#476EAE] md:w-1/4 lg:w-1/5 fixed h-screen shadow-xl shadow-slate-700 flex flex-col items-center pt-14 text-slate-200 font-medium text-xl">
            <ListSidebar isLocationPage={isLocationPage} />
          </div>
        </div>
        <div className="w-11/12 mx-auto md:w-2/3 lg:w-3/4 my-10">
          {children}
        </div>
      </div>
    </div>
  );
}
