import { create } from "zustand";

interface NavegationStore {
  value: {
    lat: number;
    lng: number;
  };
  setValue: (value: { lat: number; lng: number }) => void;
}

export const useNavegationStore = create<NavegationStore>((set) => ({
  value: {
    lat: 4.6243,
    lng: -74.0636,
  },
  setValue: (value: { lat: number; lng: number }) => set({ value }),
}));
