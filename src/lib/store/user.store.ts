import { create } from "zustand";
import { UserType } from "../type";

interface UserStore {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const UserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: UserType | null) => set({ user }),
}));
