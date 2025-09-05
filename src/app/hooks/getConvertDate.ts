export function useConvertDate(created_at: string, options: object) {
  return new Date(created_at).toLocaleDateString("id-ID", options);
}
