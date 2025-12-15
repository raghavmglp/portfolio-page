import { create } from "zustand";
import { tabs } from "@/constants/tabs";

interface AppState {
  currentTab: string;

  setCurrentTab: (tab: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentTab: tabs.HOME,

  setCurrentTab: (tab) => set({ currentTab: tab }),
}));
