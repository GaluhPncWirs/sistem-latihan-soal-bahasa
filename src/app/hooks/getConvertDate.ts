export function useConvertDate(created_at: string, options: object) {
  return new Date(created_at).toLocaleDateString("id-ID", options);
}
// const optionsTime: any = {
//   minute: "numeric",
//   hour: "numeric",
//   day: "numeric",
//   month: "long",
//   year: "numeric",
// };
