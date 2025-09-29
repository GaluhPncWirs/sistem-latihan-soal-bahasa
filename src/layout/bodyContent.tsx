import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LayoutBodyContent({ children }: any) {
  const [isUserThereStudent, setIsUserThereStudent] = useState<boolean>(false);
  const [isUserThereTeacher, setIsUserThereTeacher] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    const isUserDataSiswa = localStorage.getItem("idLoginSiswa");
    const isUserDataGuru = localStorage.getItem("idLoginGuru");
    if (isUserDataSiswa) {
      const isObjectTrue = Object.keys(isUserDataSiswa).length > 0;
      setIsUserThereStudent(isObjectTrue);
    } else if (isUserDataGuru) {
      const isObjectTrue = Object.keys(isUserDataGuru).length > 0;
      setIsUserThereTeacher(isObjectTrue);
    }
  }, []);

  async function handleLogout() {
    const responseDelCookies = await fetch("/api/delCookies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const messageRespons = await responseDelCookies.json();
    localStorage.removeItem("idLoginSiswa");
    localStorage.removeItem("idLoginGuru");
    push("/Autentikasi/Login");
    toast("Berhasil ✅", { description: messageRespons.message });
  }

  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] flex">
      <div className="basis-1/5">
        <div className="bg-[#476EAE] w-1/5 fixed h-screen shadow-xl shadow-slate-700">
          <ul className="flex flex-col items-center gap-y-10 pt-28 text-slate-200 font-medium text-xl">
            <Link
              href="/"
              className="cursor-pointer flex items-center gap-x-5 w-2/3"
            >
              <Image
                src="/img/dashboardStudent/home.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/5"
              />
              <span>Beranda</span>
            </Link>
            <Link
              href={
                isUserThereTeacher === true
                  ? "/Teacher/dashboard"
                  : "/Student/Dashboard"
              }
              className="cursor-pointer flex items-center gap-x-6 w-2/3"
            >
              <Image
                src="/img/dashboardStudent/dashboard.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/6"
              />
              <span>Dashboard</span>
            </Link>
            <Link
              href={
                isUserThereTeacher === true
                  ? "/Teacher/Profil"
                  : "/Student/Profile"
              }
              className="cursor-pointer flex items-center gap-x-5 w-2/3"
            >
              <Image
                src="/img/dashboardStudent/user.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/5"
              />
              <span>Profil</span>
            </Link>
            <li className="cursor-pointer flex items-center gap-x-5 w-2/3">
              <Image
                src="/img/dashboardStudent/logout.png"
                alt="Dashboard"
                width={200}
                height={200}
                className="w-1/5"
              />
              <span onClick={handleLogout}>Logout</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="basis-4/5 my-10">{children}</div>
    </div>
  );
}
