import { useHandleLogout } from "@/app/hooks/getHandleLogout";
import { useGetIdStudent } from "@/app/hooks/getIdStudent";
import { useGetIdTeacher } from "@/app/hooks/getIdTeacher";
import Link from "next/link";

export default function ButtonAutentications() {
  const logout = useHandleLogout();
  const isUserThereStudent = useGetIdStudent();
  const isUserThereTeacher = useGetIdTeacher();
  return (
    <>
      {isUserThereStudent || isUserThereTeacher ? (
        <button
          onClick={logout}
          className="bg-blue-400 hover:bg-blue-500 hover:text-slate-200 py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg"
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            href="/Autentikasi/Daftar"
            className="bg-blue-400 hover:bg-blue-500 hover:text-slate-200 py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg"
          >
            Daftar
          </Link>
          <Link
            href="/Autentikasi/Login"
            className="border-2 border-slate-700 hover:opacity-70 py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg"
          >
            Login
          </Link>
        </>
      )}
    </>
  );
}
