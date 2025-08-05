export function useConvertDate(created_at: string) {
  const optionsTime: any = {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  };

  return new Date(created_at).toLocaleDateString("id-ID", optionsTime);
}
