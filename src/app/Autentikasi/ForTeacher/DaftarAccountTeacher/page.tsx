"use client";
import { useRandomId } from "@/app/hooks/getRandomId";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterAccountTeacher() {
  const [clearForm, setClearForm] = useState<boolean>(false);

  async function handleCreateAccountTeacher(e: any) {
    e.preventDefault();
    const payloadDataRegiterAccountTeacher = {
      fullName: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "pengajar",
      id_teacher: useRandomId(7, "TCR"),
    };

    const { data, error } = await supabase
      .from("account_teacher")
      .select("email")
      .eq("email", e.target.email.value);
    if (error) {
      console.log("Data Gagal Diload");
    } else if (data.length > 0) {
      setClearForm(true);
      console.log(
        "Nama Email Sudah Dibuat Sebelumnya. Buat kembali Yang Berbeda"
      );
    } else {
      const { error } = await supabase
        .from("account_teacher")
        .insert([payloadDataRegiterAccountTeacher]);
      if (error) {
        toast("Gagal Membuat Akun");
      } else {
        toast("Berhasil Membuat Akun, Silahkan Kembali Ke Form Login");
        setClearForm(true);
      }
    }
  }

  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] h-screen flex justify-center items-center flex-col">
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] rounded-xl shadow-xl shadow-slate-500 max-[640px]:w-10/12 sm:w-2/3 sm:py-5 md:w-1/2 lg:w-2/5 max-[640px]:py-5">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">
          Daftar Akun Guru
        </h1>
        <form
          className="flex justify-center flex-col w-3/4 gap-3 mx-auto max-[640px]:gap-2"
          onSubmit={(e) => handleCreateAccountTeacher(e)}
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
            className="w-full rounded-md p-2.5 bg-teal-100"
          />

          <label
            htmlFor="email"
            className="text-xl font-semibold text-blue-500"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="adamJobs@gmail.com"
            className="w-full rounded-md p-2.5 bg-teal-100"
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
            className="w-full rounded-md p-2.5 bg-teal-100"
          />

          <button
            className="bg-blue-300 rounded-md font-semibold w-full py-1.5 my-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
