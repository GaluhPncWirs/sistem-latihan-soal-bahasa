"use client";

import { useRandomId } from "@/app/hooks/getRandomId";
import { useHandleInput } from "@/app/hooks/handleInput";
import LayoutFormAccount from "@/layout/formAccount";
import { supabase } from "@/lib/supabase/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RegisterAccount() {
  const [clearForm, setClearForm] = useState(false);
  const { formMustFilled, setFormMustFilled, handleValueInput, isFormFilled } =
    useHandleInput({
      fullname: "",
      kelas: "",
      email: "",
      password: "",
    });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

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
      toast("Gagal ❌", {
        description: "Nama Email Sudah Ada. Buat kembali Yang Berbeda",
      });
      setClearForm(true);
    } else if (error) {
      toast("Data Gagal Diload");
    } else {
      const { error }: any = await supabase
        .from("account-student")
        .insert(dataRegister);
      if (error) {
        toast("Gagal ❌", {
          description: "Gagal Membuat Akun",
        });
      } else {
        setIsLoading(true);
        push("/Autentikasi/Login");
        toast("Berhasil ✅", {
          description: "Berhasil Membuat Akun Silahkan Kembali Ke Form Login",
        });
      }
    }
  }

  useEffect(() => {
    if (clearForm) {
      setFormMustFilled({
        fullname: "",
        kelas: "",
        email: "",
        password: "",
      });
    }
  }, [clearForm]);

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
          className="w-full rounded-md p-2.5 bg-teal-100"
          onChange={handleValueInput}
          value={formMustFilled.fullname}
        />
        <label htmlFor="kelas" className="text-xl font-semibold text-blue-500">
          Kelas
        </label>
        <input
          type="text"
          id="kelas"
          placeholder="Tp 5"
          className="w-full rounded-md p-2.5 bg-teal-100"
          onChange={handleValueInput}
          value={formMustFilled.kelas}
        />
        <label htmlFor="email" className="text-xl font-semibold text-blue-500">
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
          className="bg-blue-300 rounded-md font-semibold w-full py-1.5 my-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer flex justify-center"
          type="submit"
          disabled={!isFormFilled()}
        >
          {isLoading ? (
            <Image
              src="/img/autentikasi/icon_loading.png"
              alt="Loading"
              width={200}
              height={200}
              className="w-1/12 animate-spin"
            />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </LayoutFormAccount>
  );
}
