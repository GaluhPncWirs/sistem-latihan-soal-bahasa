import ListSidebar from "@/components/sidebar/listSidebar/content";

export default function LayoutBodyContent({ children }: any) {
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] flex">
      <div className="md:w-1/4 lg:w-1/5 max-[640px]:hidden sm:hidden md:block">
        <div className="bg-[#476EAE] md:w-1/4 lg:w-1/5 fixed h-screen shadow-xl shadow-slate-700">
          <ul className="flex flex-col items-center gap-y-10 pt-28 text-slate-200 font-medium text-xl">
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
