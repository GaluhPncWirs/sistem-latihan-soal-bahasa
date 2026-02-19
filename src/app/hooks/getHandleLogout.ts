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
    push("/Auth/Login");
    toast("Berhasil ✅", { description: messageRespons.message });
  }

  return handleLogout;
}
