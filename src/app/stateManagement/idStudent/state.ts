import { useGetIdStudent } from "@/app/hooks/getIdStudent";
import { create } from "zustand";

export const useIdStudent = create(() => ({
  getIdStudent1: useGetIdStudent(),
}));
