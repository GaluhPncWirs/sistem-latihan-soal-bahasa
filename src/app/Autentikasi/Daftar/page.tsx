"use client";

import { useRandomId } from "@/app/hooks/getRandomId";
import LayoutFormAccount from "@/layout/formAccount";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterAccount() {
  const [clearForm, setClearForm] = useState(false);

  async function handleRegister(e: any) {
    e.preventDefault();
    const dataRegister = {
      fullName: e.target.fullname.value,
      classes: e.target.kelas.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "pelajar",
      idStudent: useRandomId(7, "STD"),
    };
    const { data, error }: any = await supabase
      .from("account-student")
      .select("email")
      .eq("email", e.target.email.value);
    if (data.length > 0) {
      toast("Nama Email Sudah Dibuat Sebelumnya. Buat kembali Yang Berbeda");
      setClearForm(true);
    } else if (error) {
      toast("Data Gagal Diload");
    } else {
      const { error }: any = await supabase
        .from("account-student")
        .insert([dataRegister]);
      if (error) {
        toast("Gagal Membuat Akun");
      } else {
        toast("Berhasil Membuat Akun Silahkan Kembali Ke Form Login");
      }
    }
  }

  return (
    <LayoutFormAccount formTitle={"Buat Akun"}>
      <form
        className="flex justify-center flex-col w-3/4 gap-3 mx-auto max-[640px]:gap-2"
        onSubmit={(e) => handleRegister(e)}
      >
        <label
          htmlFor="fullname"
          className="text-xl font-semibold text-blue-500"
        >
          Nama
        </label>
        <input
          type="text"
          id="fullname"
          placeholder="adam jobs"
          className="w-full rounded-md p-3 bg-teal-100"
        />
        <label htmlFor="kelas" className="text-xl font-semibold text-blue-500">
          Kelas
        </label>
        <input
          type="text"
          id="kelas"
          placeholder="Tp 5"
          className="w-full rounded-md p-3 bg-teal-100"
        />
        <label htmlFor="email" className="text-xl font-semibold text-blue-500">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="adamJobs@gmail.com"
          className="w-full rounded-md p-3 bg-teal-100"
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
          className="w-full rounded-md p-3 bg-teal-100"
        />

        <button
          className="bg-blue-300 rounded-md font-semibold w-full py-1.5 my-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </LayoutFormAccount>
  );
}
