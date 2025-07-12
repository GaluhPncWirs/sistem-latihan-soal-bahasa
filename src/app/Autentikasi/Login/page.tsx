"use client";
import LayoutFormAccount from "@/layout/formAccount";
import { supabase } from "@/lib/supabase/data";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginAccount() {
  const { push } = useRouter();

  async function handleLogin(e: any) {
    e.preventDefault();
    const valueEmail = e.currentTarget.email.value;
    const valuePassword = e.currentTarget.password.value;
    const { data, error }: any = await supabase
      .from("data-account-student")
      .select("*")
      .eq("email", valueEmail)
      .eq("password", valuePassword)
      .single();
    if (error) {
      toast("Email dan Password Salah Input Kembali");
    } else {
      localStorage.setItem("idLoginSiswa", data.idStudent);
      push("/");
    }
  }

  return (
    <LayoutFormAccount formTitle={"Login Akun"}>
      <form
        className="flex justify-center flex-col w-3/4 gap-3 mx-auto"
        onSubmit={(e) => handleLogin(e)}
      >
        <label htmlFor="email" className="text-xl font-semibold text-blue-500">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="adamJobs@gmail.com"
          className="w-full rounded-md p-3 bg-blue-200"
        />
        <label
          htmlFor="password"
          className="text-xl font-semibold text-blue-500"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="**********"
          className="w-full rounded-md p-3 bg-blue-200"
        />
        <button
          className="bg-blue-300 rounded-md w-full py-1.5 mt-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
          // onClick={loginAccount}
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="ml-10 mt-7 text-slate-700">
        <button>
          Masuk Dengan Akun{" "}
          <span className="font-semibold hover:underline text-blue-700 cursor-pointer">
            Google
          </span>
        </button>
      </div>
    </LayoutFormAccount>
  );
}
