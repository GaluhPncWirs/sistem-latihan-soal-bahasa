import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/data";
import { useGetIdUsers } from "@/store/useGetIdUsers/state";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DialogFormAddDataUser({
  idUsers,
}: {
  idUsers: string;
}) {
  const typeAccount = useGetIdUsers((state) => state.typeAccount);
  const hasNotFilled = useGetIdUsers((state) => state.hasNotFilled);
  const notFill = Object.values(hasNotFilled ?? "").every(
    (value) => value === undefined,
  );
  const [isTypeAccount, setIsTypeAccount] = useState<boolean>(false);
  useEffect(() => {
    const alreadyShown = localStorage.getItem("alreadyShownTypeAccountDialog");
    if (!alreadyShown && typeAccount === "google" && notFill) {
      setIsTypeAccount(true);
    }
  }, [typeAccount]);

  async function handleAddDataUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const resultPayload = Object.fromEntries(formData.entries());

    const { error } = await supabase
      .from("account-student")
      .update(resultPayload)
      .eq("idStudent", idUsers)
      .single();

    if (error) {
      toast("Gagal ❌", {
        description: "Edit Profil Gagal",
      });
    } else {
      toast("Berhasil ✅", {
        description: "Edit Profil Berhasil Di Update",
      });
    }

    localStorage.setItem("alreadyShownTypeAccountDialog", "true");
    setIsTypeAccount(false);
  }
  return (
    <Dialog open={isTypeAccount}>
      <DialogContent>
        <form onSubmit={(event) => handleAddDataUser(event)}>
          <DialogHeader>
            <DialogTitle>Terindikasi Login Menggunakan Google</DialogTitle>
            <DialogDescription>
              Sistem mendeteksi bahwa Anda login menggunakan Google. maka dari
              itu anda harus menambahkan kelas, NIS, dan No Hp pada akun anda
              ini untuk bisa menggunakan sistem ini.
            </DialogDescription>
            <div>
              <label htmlFor="classes" className="mb-2 block">
                Kelas
              </label>
              <Input type="text" id="classes" name="classes" required />
            </div>
            <div>
              <label htmlFor="nis" className="mb-2 block">
                NIS
              </label>
              <Input type="text" id="nis" name="nis" required />
            </div>
            <div>
              <label htmlFor="noHp" className="mb-2 block">
                No Hp
              </label>
              <Input type="number" id="noHp" name="noTlp" required />
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" className="mt-5">
              Konfirmasi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
