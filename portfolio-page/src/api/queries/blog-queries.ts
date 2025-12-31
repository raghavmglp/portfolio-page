// queries/blog.queries.ts
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/api/services/blog-services";
import { useStore } from "@/store/useStore";

export const usePosts = () => {
  const setPosts = useStore((state) => state.setPosts);

  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await blogService.getAllPosts();
      setPosts(data);
      return data;
    },
    staleTime: 1000 * 60,
  });
};

export const usePostById = (id: string) => {
  const setCurrentPost = useStore((state) => state.setCurrentPost);

  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const data = await blogService.getPostById(id);
      setCurrentPost(data);
      return data;
    },
    enabled: !!id,
  });
};
