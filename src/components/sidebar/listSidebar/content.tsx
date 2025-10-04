import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ListSidebar() {
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
    localStorage.removeItem("idLoginGuru");
    localStorage.removeItem("random-number-exam");
    push("/Autentikasi/Login");
    toast("Berhasil ✅", { description: messageRespons.message });
  }
  return (
    <>
      <div className="bg-slate-200 rounded-md w-10/12 h-16 mx-auto flex items-center px-3 shadow-lg shadow-slate-700 md:hidden">
        <Image
          src="/img/footer/logo.png"
          alt="Logo"
          width={400}
          height={400}
          className="w-full"
        />
      </div>
      <Link href="/" className="cursor-pointer flex items-center gap-x-5 w-2/3">
        <Image
          src="/img/dashboardStudent/home.png"
          alt="Dashboard"
          width={200}
          height={200}
          className="w-1/5"
        />
        <span className="text-slate-200">Beranda</span>
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
        <span className="text-slate-200">Dashboard</span>
      </Link>
      <Link
        href={
          isUserThereTeacher === true ? "/Teacher/Profil" : "/Student/Profile"
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
        <span className="text-slate-200">Profil</span>
      </Link>
      <li className="cursor-pointer flex items-center gap-x-5 w-2/3">
        <Image
          src="/img/dashboardStudent/logout.png"
          alt="Dashboard"
          width={200}
          height={200}
          className="w-1/5"
        />
        <span className="text-slate-200" onClick={handleLogout}>
          Logout
        </span>
      </li>
    </>
  );
}
