import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useVerifyToken() {
  const [loadingSession, setLoadingSesion] = useState<boolean>(true);
  const [statusToken, setStatusToken] = useState<boolean>(false);
  const { push } = useRouter();
  useEffect(() => {
    async function verifyTokenJWT() {
      const getToken = localStorage.getItem("sessionTokenLoginStudent");
      if (!getToken) {
        toast("❌ Gagal", {
          description: "Belum Ada Sesi Token, SIlahkan Login Terlebih Dahulu",
        });
        push("/Autentikasi/Login");
        return;
      }

      if (getToken) {
        const request = await fetch(`/api/verifyToken?token=${getToken}`);
        const response = await request.json();

        if (!response.status) {
          toast("❌ Gagal", {
            description: "Token Sudah Expired, Tolong Untuk Login Lagi",
          });
          setStatusToken(false);
          localStorage.removeItem("sessionTokenLoginStudent");
          setTimeout(() => {
            push("/Autentikasi/Login");
          }, 5000);
          return;
        }
        setStatusToken(true);
        setLoadingSesion(false);
      }
    }
    verifyTokenJWT();
  }, []);
  return { loadingSession, statusToken };
}
