import { create } from "zustand";

type GetIdUsersState = {
  idUsers: string;
  role: string;
  typeAccount: string;
  isLoading: boolean;
  message: string;
  setHandleGetIdUsers: () => Promise<void>;
};

export const useGetIdUsers = create<GetIdUsersState>((set) => ({
  idUsers: "",
  role: "",
  typeAccount: "",
  isLoading: false,
  message: "",

  setHandleGetIdUsers: async () => {
    try {
      set({ isLoading: true });
      const request = await fetch(`/api/decodeToken`, {
        credentials: "include",
      });
      const response = await request.json();
      if (response.status) {
        if (response.role === "pelajar") {
          set({
            idUsers: response.data.idStudent,
            role: response.data.role,
            typeAccount: response.data.typeAccount,
            isLoading: false,
            message: "ID berhasil di ambil",
          });
        } else if (response.role === "pengajar") {
          set({
            idUsers: response.data.idTeacher,
            role: response.data.role,
            isLoading: false,
            message: "ID berhasil di ambil",
          });
        }
      } else {
        set({ idUsers: "", isLoading: false, message: "ID gagal di ambil" });
      }
    } catch (error) {
      set({
        idUsers: "",
        isLoading: false,
        message: "Gagal decode token / token tidak valid",
      });
    }
  },
}));
