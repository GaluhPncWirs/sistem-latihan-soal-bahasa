"use client";
import { useHandleInput } from "@/app/hooks/handleInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LayoutFormAccount from "@/layout/formAccount";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginAccount() {
  const { push } = useRouter();
  const [valueTypeAccount, setValueTypeAccount] = useState<string>("");
  const { formMustFilled, handleValueInput, isFormFilled } = useHandleInput({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(e: any) {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valueEmail: e.currentTarget.email.value,
        valuePassword: e.currentTarget.password.value,
        valueTypeAccount: valueTypeAccount,
      }),
    });

    const dataLogin = await response.json();

    if (valueTypeAccount !== "") {
      if (dataLogin.success) {
        if (dataLogin.tipe === "siswa") {
          localStorage.setItem("idLoginSiswa", dataLogin.id);
          push("/");
          toast("Berhasil ✅", {
            description: "Masuk Akun Berhasil",
          });
        } else {
          localStorage.setItem("idLoginGuru", dataLogin.id);
          push("/Teacher/dashboard");
          toast("Berhasil ✅", {
            description: "Masuk Akun Berhasil",
          });
        }
        setIsLoading(true);
      } else {
        toast("Gagal ❌", {
          description: "Email dan Password Salah Input Kembali",
        });
      }
    } else {
      toast("Gagal ❌", {
        description: "Jenis Akun Belum Dipilih",
      });
    }
  }

  return (
    <LayoutFormAccount formTitle={"Login"}>
      <form
        className="flex justify-center flex-col w-3/4 gap-3 mx-auto max-[640px]:gap-2"
        onSubmit={(e) => handleLogin(e)}
      >
        <label
          htmlFor="akunGuru"
          className="text-xl font-semibold text-blue-500"
        >
          Jenis Akun
        </label>
        <Select onValueChange={(val) => setValueTypeAccount(val)}>
          <SelectTrigger className="w-full bg-teal-100 cursor-pointer">
            <SelectValue placeholder="Pilih Jenis" />
          </SelectTrigger>
          <SelectContent className="bg-teal-100 p-1">
            <SelectItem value="guru">Guru</SelectItem>
            <SelectItem value="siswa">Siswa</SelectItem>
          </SelectContent>
        </Select>
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
          className="bg-blue-300 font-semibold rounded-md w-full py-2 mt-3 hover:bg-blue-400 disabled:cursor-not-allowed cursor-pointer flex justify-center"
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
            "Login"
          )}
        </button>
      </form>
    </LayoutFormAccount>
  );
}
