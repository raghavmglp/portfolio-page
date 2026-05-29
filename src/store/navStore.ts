import { create } from 'zustand'

export type Tab = 'home' | 'projects' | 'blog'

interface NavState {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

export const useNavStore = create<NavState>((set) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
