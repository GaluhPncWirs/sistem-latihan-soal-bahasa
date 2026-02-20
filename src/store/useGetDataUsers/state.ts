import { supabase } from "@/lib/supabase/data";
import { create } from "zustand";

type GetDataUsersState = {
  dataUsers: any[];
  isLoading: boolean;
  setGetDataUsers: (
    idUsers: string,
    selectDatabase: string,
    searchById: string,
  ) => Promise<void>;
};

export const useGetDataUsers = create<GetDataUsersState>((set) => ({
  dataUsers: [],
  isLoading: false,

  setGetDataUsers: async (idUsers, selectDatabase, searchById) => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from(selectDatabase)
        .select("*")
        .eq(searchById, idUsers)
        .single();
      if (error) {
        set({ dataUsers: [] });
        console.log("Data gagal diambil", error);
      } else {
        set({ dataUsers: data });
      }
    } catch (error) {
      set({ dataUsers: [] });
      console.log("Data gagal diambil, error pada database");
    } finally {
      set({ isLoading: false });
    }
  },
}));
