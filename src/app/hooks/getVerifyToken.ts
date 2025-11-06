import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useVerifyToken() {
  const [loadingSession, setLoadingSesion] = useState<boolean>(true);
  const [statusToken, setStatusToken] = useState<boolean>(false);
  const { push } = useRouter();
  useEffect(() => {
    async function verifyTokenJWT() {
      const request = await fetch(`/api/verifyToken`);
      const response = await request.json();
      if (!response.status) {
        toast("❌ Gagal", {
          description: "Token Sudah Expired, Tolong Untuk Login Lagi",
        });
        setStatusToken(false);
        setTimeout(() => {
          push("/Autentikasi/Login");
        }, 3000);
      }
      setStatusToken(true);
      setLoadingSesion(false);
    }
    verifyTokenJWT();
  }, []);
  return { loadingSession, statusToken };
}
