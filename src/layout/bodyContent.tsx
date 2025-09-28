import Image from "next/image";

export default function LayoutBodyContent({ children }: any) {
  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] flex">
      <div className="basis-1/5">
        <div className="bg-[#476EAE] w-1/5 fixed h-screen shadow-xl shadow-slate-700">
          <ul className="flex flex-col items-center gap-y-10 pt-28 text-slate-200 font-medium text-xl">
            <li className="cursor-pointer flex items-center gap-x-5 w-2/3">
              <Image
                src="/img/dashboardStudent/home.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/5"
              />
              <span>Beranda</span>
            </li>
            <li className="cursor-pointer flex items-center gap-x-6 w-2/3">
              <Image
                src="/img/dashboardStudent/dashboard.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/6"
              />
              <span>Dashboard</span>
            </li>
            <li className="cursor-pointer flex items-center gap-x-5 w-2/3">
              <Image
                src="/img/dashboardStudent/user.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/5"
              />
              <span>Profil</span>
            </li>
            <li className="cursor-pointer flex items-center gap-x-5 w-2/3">
              <Image
                src="/img/dashboardStudent/logout.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/5"
              />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="basis-4/5 my-10">{children}</div>
    </div>
  );
}
