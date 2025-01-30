import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

interface PostsQueryParams {
  page?: number;
  limit?: number;
}

export const usePosts = () => {
  const queryClient = useQueryClient();
  const defaultLimit = 10;

  const useGetPosts = (params?: PostsQueryParams) => {
    return useQuery({
      queryKey: ["posts", params?.page],
      queryFn: () =>
        api
          .get<Post[]>(
            `/posts?_page=${params?.page || 1}&_limit=${
              params?.limit || defaultLimit
            }`
          )
          .then((res) => ({
            data: res.data,
            total: parseInt(res.headers["x-total-count"] || "0", 10),
          })),
    });
  };

  const createPost = useMutation({
    mutationFn: (newPost: Omit<Post, "id">) =>
      api.post<Post>("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePost = useMutation({
    mutationFn: (id: number) => api.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return {
    useGetPosts,
    createPost,
    deletePost,
    defaultLimit,
  };
};
