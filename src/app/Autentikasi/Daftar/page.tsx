"use client";

import LayoutFormAccount from "@/layout/formAccount";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterAccount() {
  const [clearForm, setClearForm] = useState(false);

  function randomIdStudent(len = 7) {
    const alphabetLowerCase = "abcdefghijklmnopqrstuvwxyz";
    const alphabetUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";

    const allCharacter = alphabetLowerCase + alphabetUpperCase + num;
    let result = `STD-`;
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * allCharacter.length);
      result += allCharacter[randomIndex];
    }
    return result;
  }

  async function handleRegister(e: any) {
    e.preventDefault();
    const dataRegister = {
      fullName: e.currentTarget.fullname.value,
      classes: e.currentTarget.kelas.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      idStudent: randomIdStudent(),
    };
    const { data, error }: any = await supabase
      .from("data-account-student")
      .select("*")
      .eq("email", dataRegister.email);
    if (data.length > 0) {
      toast("Akun Telah Ada, Buat Akun Yang berbeda");
      setClearForm(true);
    } else if (error) {
      toast("Error");
    } else {
      const { data, error }: any = await supabase
        .from("data-account-student")
        .insert([dataRegister]);
      if (error) {
        toast("Gagal Membuat Akun");
      } else {
        toast("Berhasil Membuat Akun");
      }
    }
  }

  return (
    <LayoutFormAccount formTitle={"Buat Akun"}>
      <form
        className="flex justify-center flex-col w-3/4 gap-3 mx-auto"
        onSubmit={(e) => handleRegister(e)}
      >
        <label
          htmlFor="fullname"
          className="text-xl font-semibold text-blue-500"
        >
          Fullname
        </label>
        <input
          type="text"
          id="fullname"
          placeholder="adam jobs"
          className="w-full rounded-md p-3 bg-blue-200"
        />
        <label htmlFor="kelas" className="text-xl font-semibold text-blue-500">
          Kelas
        </label>
        <input
          type="text"
          id="kelas"
          placeholder="Tp 5"
          className="w-full rounded-md p-3 bg-blue-200"
        />
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
          className="bg-blue-300 rounded-md w-full py-1.5 my-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </LayoutFormAccount>
  );
}
