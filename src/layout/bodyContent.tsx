import ListSidebar from "@/components/sidebar/listSidebar/content";
import Image from "next/image";

export default function LayoutBodyContent({ children }: any) {
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] flex">
      <div className="md:w-1/4 lg:w-1/5 max-[640px]:hidden sm:hidden md:block">
        <div className="bg-[#476EAE] md:w-1/4 lg:w-1/5 fixed h-screen shadow-xl shadow-slate-700">
          <div className="bg-slate-200 rounded-md w-10/12 h-16 mx-auto mt-14 flex items-center px-3 shadow-lg shadow-slate-700">
            <Image
              src="/img/footer/logo.png"
              alt="Logo"
              width={400}
              height={400}
              className="w-full"
            />
          </div>
          <ul className="flex flex-col items-center gap-y-10 mt-10 text-slate-200 font-medium text-xl">
            <ListSidebar />
          </ul>
        </div>
      </div>
      <div className="max-[640px]:w-[95%] max-[640px]:mx-auto sm:w-[95%] sm:mx-auto md:w-3/4 lg:w-4/5 my-10">
        {children}
      </div>
    </div>
  );
}
