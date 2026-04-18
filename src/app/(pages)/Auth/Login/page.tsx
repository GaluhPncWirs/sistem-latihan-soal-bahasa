"use client";
import { useHandleInput } from "@/app/hooks/getHandleInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LayoutFormAccount from "@/layout/formAccount";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
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
      <div className="w-3/4 mx-auto">
        <form
          className="flex justify-center flex-col gap-y-3"
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
              <SelectTrigger className="w-full bg-white cursor-pointer">
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent className="bg-white p-1">
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
              className="w-full rounded-md p-2.5 bg-white"
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
              className="w-full rounded-md p-2.5 bg-white"
              onChange={handleValueInput}
              value={formMustFilled.password}
            />
          </div>
          <Button
            className="bg-blue-400 rounded-md font-semibold w-full py-1.5 mt-3 hover:bg-blue-500 text-black cursor-pointer text-lg"
            type="submit"
            disabled={!isFormFilled()}
          >
            {isLoading ? <Loader2 className="animate-spin size-7" /> : "Login"}
          </Button>
        </form>
        <div
          className="text-right mt-2"
          onClick={() =>
            signIn("google", {
              redirect: false,
              callbackUrl: "/Student/Dashboard",
            })
          }
        >
          Masuk dengan akun{" "}
          <Button
            variant="link"
            className="text-blue-600 px-0 text-base font-semibold"
          >
            Google
          </Button>
        </div>
      </div>
    </LayoutFormAccount>
  );
}
