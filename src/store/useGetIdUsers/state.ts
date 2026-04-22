import { create } from "zustand";

// type dataUserManual = {
//   idUser: string;
//   role: string;
//   typeAccount: string;
// };

// type dataUserGoogle = {
//   classes: string;
//   email: string;
//   idUser: string;
//   name: string;
//   nis: number;
//   noTlp: string;
//   picture: string;
//   role: string;
//   typeAccount: string;
// };

type dataUserFromGoogleHasNotFilled = {
  classes: string | null;
  nis: number | null;
  noTlp: string | null;
};

type GetIdUsersState = {
  idUser: string;
  role: string;
  hasNotFilled: dataUserFromGoogleHasNotFilled | null;
  typeAccount: string;
  isLoading: boolean;
  message: string;
  setHandleGetIdUsers: () => Promise<void>;
};

export const useGetIdUsers = create<GetIdUsersState>((set) => ({
  idUser: "",
  role: "",
  hasNotFilled: null,
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
            idUser: response.data.idStudent,
            role: response.data.role,
            typeAccount: response.data.typeAccount,
            hasNotFilled: {
              classes: response.data.classes,
              nis: response.data.nis,
              noTlp: response.data.noTlp,
            },
            isLoading: false,
            message: "ID berhasil di ambil",
          });
        } else if (response.role === "pengajar") {
          set({
            idUser: response.data.idTeacher,
            role: response.data.role,
            isLoading: false,
            message: "ID berhasil di ambil",
          });
        }
      } else {
        set({ idUser: "", isLoading: false, message: "ID gagal di ambil" });
      }
    } catch (error) {
      set({
        idUser: "",
        isLoading: false,
        message: "Gagal decode token / token tidak valid",
      });
    }
  },
}));
