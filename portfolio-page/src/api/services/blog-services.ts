import { api } from "@/api/axios";
import type { BlogPost } from "@/models/blog-models";

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    const res = await api.get<BlogPost[]>("/posts");
    return res.data;
  },

  getPostById: async (id: string): Promise<BlogPost> => {
    const res = await api.get<BlogPost>(`/post/${id}`);
    return res.data;
  },
};
