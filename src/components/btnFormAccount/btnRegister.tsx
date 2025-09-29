import Link from "next/link";

export default function ButtonRegister() {
  return (
    <div className="text-center mt-5">
      <p>
        Sudah Punya Akun ?{" "}
        <Link
          className="font-semibold text-blue-700 hover:underline"
          href="/Autentikasi/Login"
        >
          Login
        </Link>{" "}
      </p>
    </div>
  );
}
