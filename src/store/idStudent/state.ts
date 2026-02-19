import { create } from "zustand";

type fetchIdUser = {
  idStudent: string;
  loading: boolean;
  message: string;
  fetchIdStudent: () => void;
};

export const useIdStudentStore = create<fetchIdUser>((set) => ({
  idStudent: "",
  loading: false,
  message: "",

  fetchIdStudent: async () => {
    try {
      set({ loading: true });
      const request = await fetch(`/api/decodeToken`, {
        credentials: "include",
      });
      const response = await request.json();
      if (response.status) {
        set({
          idStudent: response.data.idStudent,
          loading: false,
          message: "ID berhasil di ambil",
        });
      } else {
        set({ idStudent: "", loading: false, message: "ID gagal di ambil" });
      }
    } catch {
      set({
        idStudent: "",
        loading: false,
        message: "Gagal decode token / token tidak valid",
      });
    }
  },
}));
