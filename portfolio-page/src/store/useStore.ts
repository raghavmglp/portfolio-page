import { create } from "zustand";
import { tabs } from "@/constants/tabs";
import type { BlogPost } from "@/models/blog-models";

interface AppState {
  currentTab: string;
  posts: BlogPost[];
  currentPost: BlogPost | null;

  setCurrentTab: (tab: string) => void;
  setPosts: (posts: BlogPost[]) => void;
  setCurrentPost: (post: BlogPost | null) => void;
}

export const useStore = create<AppState>((set) => ({
  currentTab: tabs.HOME,
  posts: [],
  currentPost: null,

  setCurrentTab: (tab) => set({ currentTab: tab }),
  setPosts: (posts) => set({ posts }),
  setCurrentPost: (post) => set({ currentPost: post }),
}));
