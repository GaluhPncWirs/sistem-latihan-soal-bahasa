export function useConvertDate(created_at: string) {
  const optionsTime: any = {
    minute: "numeric",
    hour: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return new Date(created_at).toLocaleDateString("id-ID", optionsTime);
}
