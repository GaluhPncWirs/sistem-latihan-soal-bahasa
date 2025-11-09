import { create } from "zustand";

export const useIdTeacherStore = create((set) => ({
  idTeacher: "",
  loading: false,
  message: "",

  fetchIdTeacher: async () => {
    try {
      set({ loading: true });
      const request = await fetch("/api/decodeToken", {
        credentials: "include",
      });
      const response = await request.json();
      if (response.status) {
        set({
          idTeacher: response.data.idTeacher,
          loading: false,
          message: "ID berhasil di ambil",
        });
      } else {
        set({ idTeacher: "", loading: false, message: "ID Gagal di ambil" });
      }
    } catch {
      set({
        idTeacher: "",
        loading: false,
        message: "Gagal decode token / token tidak valid",
      });
    }
  },
}));
