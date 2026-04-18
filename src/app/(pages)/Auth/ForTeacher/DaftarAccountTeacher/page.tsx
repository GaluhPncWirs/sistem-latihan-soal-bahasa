"use client";
import { useRandomId } from "@/app/hooks/getRandomId";
import { useHandleInput } from "@/app/hooks/getHandleInput";
import { supabase } from "@/lib/supabase/data";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LayoutFormAccount from "@/layout/formAccount";
import FormInput from "@/components/local/authFormInput/formInput/content";
import FormButton from "@/components/local/authFormInput/formButton/content";

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
    <LayoutFormAccount formTitle={"Daftar Akun Guru"}>
      <form
        className="flex justify-center flex-col w-3/4 gap-3 mx-auto"
        onSubmit={(e) => handleCreateAccountTeacher(e)}
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
        <FormButton isFormFilled={isFormFilled} isLoading={isLoading} />
      </form>
    </LayoutFormAccount>
  );
}
