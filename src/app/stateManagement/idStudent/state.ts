import { create } from "zustand";

export const useIdUserStore = create((set) => ({
  idStudent: "",
  loading: false,

  fetchIdStudent: async () => {
    try {
      set({ loading: true });
      const request = await fetch(`/api/decodeToken`, {
        credentials: "include",
      });
      const response = await request.json();
      if (response.status) {
        set({ idStudent: response.data.idStudent, loading: false });
      } else {
        set({ idStudent: "", loading: false });
      }
    } catch {
      set({ idStudent: "", loading: false });
    }
  },
}));
