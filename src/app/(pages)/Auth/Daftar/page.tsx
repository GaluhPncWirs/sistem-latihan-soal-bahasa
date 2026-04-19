"use client";
import { useRandomId } from "@/app/hooks/getRandomId";
import { useHandleInput } from "@/app/hooks/getHandleInput";
import LayoutFormAccount from "@/layout/formAccount";
import { supabase } from "@/lib/supabase/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FormInput from "@/components/local/authFormInput/formInput/content";
import FormButton from "@/components/local/authFormInput/formButton/content";

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
    try {
      setIsLoading(true);
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
        kelas: "",
        email: "",
        password: "",
      });
    }
  }, [clearForm]);

  return (
    <LayoutFormAccount formTitle={"Buat Akun"}>
      <form
        className="flex justify-center flex-col w-3/4 gap-y-3 mx-auto"
        onSubmit={(e) => handleRegister(e)}
      >
        <FormInput
          typeInput="text"
          placeholder="adam jobs"
          labelTitle="Nama"
          nameInput="fullname"
          handleValueInput={handleValueInput}
          formMustFilled={formMustFilled.fullname}
        />
        <FormInput
          typeInput="text"
          placeholder="TP2"
          labelTitle="Kelas"
          nameInput="kelas"
          handleValueInput={handleValueInput}
          formMustFilled={formMustFilled.kelas}
        />
        <FormInput
          typeInput="email"
          placeholder="adamJobs@gmail.com"
          labelTitle="Email"
          nameInput="email"
          handleValueInput={handleValueInput}
          formMustFilled={formMustFilled.email}
        />
        <FormInput
          typeInput="password"
          placeholder="**********"
          labelTitle="Password"
          nameInput="password"
          handleValueInput={handleValueInput}
          formMustFilled={formMustFilled.password}
        />
        <FormButton
          buttonName="Register"
          isFormFilled={isFormFilled}
          isLoading={isLoading}
        />
      </form>
    </LayoutFormAccount>
  );
}
