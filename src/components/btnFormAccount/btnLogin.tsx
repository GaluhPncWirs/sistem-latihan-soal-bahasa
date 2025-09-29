import Link from "next/link";

export default function ButtonLogin() {
  return (
    <div className="text-center mt-5">
      <p>
        Belum Punya Akun ?{" "}
        <Link
          className="font-semibold text-blue-700 hover:underline"
          href="/Autentikasi/Daftar"
        >
          Daftar
        </Link>{" "}
      </p>
    </div>
  );
}
