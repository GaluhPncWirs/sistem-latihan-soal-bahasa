import { create } from "zustand";

type locationPage = {
  curentLocationPage: string;
  setLocationPage: (page: string) => void;
};

export const useLocationPage = create<locationPage>((set) => ({
  curentLocationPage: "",
  setLocationPage: (page: string) => set({ curentLocationPage: page }),
}));
