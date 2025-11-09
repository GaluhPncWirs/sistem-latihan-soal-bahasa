import { create } from "zustand";

export const useLocationPage = create((set) => ({
  curentLocationPage: "",
  setLocationPage: (page: string) => set({ curentLocationPage: page }),
}));
