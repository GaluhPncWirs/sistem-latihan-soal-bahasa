"use client";
import { useHandleInput } from "@/app/hooks/getHandleInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LayoutFormAccount from "@/layout/formAccount";
import { Loader2 } from "lucide-react";
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
    try {
      setIsLoading(true);
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
            push("/Student/Dashboard");
            toast("Berhasil ✅", {
              description: dataLogin.message,
            });
          } else {
            push("/Teacher/dashboard");
            toast("Berhasil ✅", {
              description: dataLogin.message,
            });
          }
        } else {
          toast("Gagal ❌", {
            description: dataLogin.message,
          });
        }
      } else {
        toast("Gagal ❌", {
          description: "Jenis Akun Belum Dipilih",
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.error("gagal login", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LayoutFormAccount formTitle={"Login"}>
      <form
        className="flex justify-center flex-col w-3/4 gap-y-3 mx-auto"
        onSubmit={(e) => handleLogin(e)}
      >
        <div>
          <label
            htmlFor="akunGuru"
            className="text-xl font-semibold text-blue-500 inline-block mb-3"
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
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-xl font-semibold text-blue-500 inline-block mb-3"
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
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-xl font-semibold text-blue-500 inline-block mb-3"
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
        </div>
        <button
          className="bg-blue-400 font-semibold rounded-md w-full py-2 mt-3 hover:bg-blue-500 hover:text-slate-200 disabled:cursor-not-allowed cursor-pointer flex justify-center text-lg"
          type="submit"
          disabled={!isFormFilled()}
        >
          {isLoading ? <Loader2 className="animate-spin size-7" /> : "Login"}
        </button>
      </form>
    </LayoutFormAccount>
  );
}
