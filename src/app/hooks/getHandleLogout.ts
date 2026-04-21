import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useHandleLogout() {
  const { push } = useRouter();
  async function handleLogout() {
    const responseDelCookies = await fetch("/api/delCookies", {
      method: "DELETE",
      credentials: "include",
    });
    const messageRespons = await responseDelCookies.json();
    if (messageRespons.status === 200) {
      localStorage.removeItem("alreadyShownTypeAccountDialog");
      push("/Auth/Login");
      toast("Berhasil ✅", { description: messageRespons.message });
    }
  }
  return handleLogout;
}
