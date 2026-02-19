"use client";
import { useRandomId } from "@/app/hooks/getRandomId";
import { useHandleInput } from "@/app/hooks/getHandleInput";
import { supabase } from "@/lib/supabase/data";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterAccountTeacher() {
  const [clearForm, setClearForm] = useState<boolean>(false);
  const { formMustFilled, setFormMustFilled, handleValueInput, isFormFilled } =
    useHandleInput({
      fullname: "",
      email: "",
      password: "",
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleCreateAccountTeacher(e: any) {
    e.preventDefault();
    const payloadDataRegiterAccountTeacher = {
      fullName: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "pengajar",
      id_teacher: useRandomId(7, "TCR"),
    };

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("account_teacher")
        .select("email")
        .eq("email", e.target.email.value);
      if (error) {
        toast("Gagal ❌", {
          description: "Data Gagal Diload",
        });
      } else if (data.length > 0) {
        setClearForm(true);
        toast("Gagal ❌", {
          description: "Nama Email Sudah Ada. Buat kembali Yang Berbeda",
        });
      } else {
        const { error } = await supabase
          .from("account_teacher")
          .insert(payloadDataRegiterAccountTeacher);
        if (error) {
          toast("Gagal ❌", {
            description: "Gagal Membuat Akun",
          });
        } else {
          toast("Berhasil ✅", {
            description:
              "Berhasil Membuat Akun, Silahkan Kembali Ke Form Login",
          });
          setClearForm(true);
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.error("gagal register", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (clearForm) {
      setFormMustFilled({
        fullname: "",
        email: "",
        password: "",
      });
    }
  }, [clearForm]);

  return (
    <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] h-screen flex justify-center items-center relative">
      <div className="absolute top-5 left-5">
        <Link
          href="/Auth/Login"
          className="cursor-pointer bg-blue-300 py-2 pl-3 pr-5 flex justify-center items-center rounded-lg hover:bg-blue-400"
        >
          <ChevronLeftIcon />
          <span className="text-base">Kembali</span>
        </Link>
      </div>
      <div className="bg-[#71C9CE] bg-gradient-to-t to-[#A6E3E9] rounded-xl shadow-xl shadow-slate-500 py-5 w-10/12 sm:w-2/3 md:w-1/2 lg:w-2/5">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">
          Daftar Akun Guru
        </h1>
        <form
          className="flex justify-center flex-col w-3/4 gap-3 mx-auto"
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
            onChange={handleValueInput}
            value={formMustFilled.fullname}
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
            onChange={handleValueInput}
            value={formMustFilled.email}
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
            onChange={handleValueInput}
            value={formMustFilled.password}
          />

          <button
            className="bg-blue-400 font-semibold rounded-md w-full py-2 mt-3 hover:bg-blue-500 hover:text-slate-200 disabled:cursor-not-allowed cursor-pointer flex justify-center text-lg"
            type="submit"
            disabled={!isFormFilled()}
          >
            {!isLoading ? (
              <Loader2 className="animate-spin size-7" />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
