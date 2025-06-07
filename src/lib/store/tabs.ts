import { create } from "zustand";

interface TabsStore {
  tab: string;
  setTab: (tab: string) => void;
}

export const useTabsStore = create<TabsStore>((set) => ({
  tab: "1",
  setTab: (tab: string) => set({ tab }),
}));
