import { supabase } from "@/lib/supabase/data";
import { create } from "zustand";

export const useGetDataStudentStore = create((set) => ({
  dataStudent: null,
  message: "",

  fetchDataStudent: async (idStudent: string) => {
    if (!idStudent) return;
    try {
      const { data, error } = await supabase
        .from("account-student")
        .select("*")
        .eq("idStudent", idStudent)
        .single();
      if (error) {
        set({ dataStudent: "", message: "Data gagal diambil" });
      } else {
        set({ dataStudent: data, message: "Data berhasil diambil" });
      }
    } catch {
      set({
        dataStudent: "",
        message: "Data gagal diambil, error pada database",
      });
    }
  },
}));
