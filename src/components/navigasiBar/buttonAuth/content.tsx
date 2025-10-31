import Link from "next/link";

export default function ButtonAutentications(props: {
  isUserThereStudent: boolean;
  isUserThereTeacher: boolean;
  handleLogout: any;
}) {
  const { isUserThereStudent, isUserThereTeacher, handleLogout } = props;
  return (
    <>
      {isUserThereStudent === true || isUserThereTeacher === true ? (
        <button
          onClick={handleLogout}
          className="bg-[#71C9CE] py-1.5 px-5 rounded-lg hover:bg-teal-500 cursor-pointer font-semibold text-lg"
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            href="/Autentikasi/Daftar"
            className="bg-blue-400 py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg"
          >
            Daftar
          </Link>
          <Link
            href="/Autentikasi/Login"
            className="border border-black py-1.5 px-5 rounded-lg cursor-pointer font-semibold text-lg"
          >
            Login
          </Link>
        </>
      )}
    </>
  );
}
