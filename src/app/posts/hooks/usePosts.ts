import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export const usePosts = () => {
  const queryClient = useQueryClient();

  const getPosts = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get("/posts").then((res) => res.data),
  });

  const createPost = useMutation({
    mutationFn: (newPost) => api.post("/posts", newPost),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  return { getPosts, createPost };
};
