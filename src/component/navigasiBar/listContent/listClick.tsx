import Link from "next/link";
import { useEffect, useState } from "react";

export default function ListClickContent() {
  const [isUserThereStudent, setIsUserThereStudent] = useState<boolean>(false);
  const [isUserThereTeacher, setIsUserThereTeacher] = useState<boolean>(false);

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
  return (
    <>
      <li className="cursor-pointer text-xl font-semibold">
        <Link href="/" className="hover:text-slate-500">
          Beranda
        </Link>
      </li>
      {isUserThereTeacher === true ? (
        <>
          <li className="cursor-pointer text-xl font-semibold">
            <Link href="/Teacher/dashboard" className="hover:text-slate-500">
              Dashboard
            </Link>
          </li>
          <li className="cursor-pointer text-xl font-semibold">
            <Link href="/Teacher/Profil" className="hover:text-slate-500">
              Profil
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="cursor-pointer text-xl font-semibold">
            <Link
              className="hover:text-slate-500"
              href={`${
                isUserThereStudent === true ? `/Student/Dashboard` : `/`
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li className="cursor-pointer text-xl font-semibold">
            <Link
              className="hover:text-slate-500"
              href={`${isUserThereStudent === true ? `/Student/Profile` : `/`}`}
            >
              Profil
            </Link>
          </li>
        </>
      )}
    </>
  );
}
