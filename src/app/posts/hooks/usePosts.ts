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

const LOCAL_STORAGE_KEY = "postsData";

const saveToLocalStorage = (page: number, posts: Post[], total: number) => {
  const storedData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );
  storedData[page] = { posts, total };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));
};

const getFromLocalStorage = (page: number) => {
  const storedData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );
  return storedData[page] || null;
};

const getSinglePostFromLocalStorage = (id: number): Post | null => {
  const storedData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );
  for (const page in storedData) {
    const post = storedData[page].posts.find((p: Post) => p.id === id);
    if (post) return post;
  }
  return null;
};

export const usePosts = () => {
  const queryClient = useQueryClient();
  const defaultLimit = 10;

  const useGetPosts = (params?: PostsQueryParams) => {
    return useQuery({
      queryKey: ["posts", params?.page],
      queryFn: async () => {
        const storedData = getFromLocalStorage(params?.page || 1);
        if (storedData) {
          return { data: storedData.posts, total: storedData.total };
        }

        const res = await api.get<Post[]>(
          `/posts?_page=${params?.page || 1}&_limit=${
            params?.limit || defaultLimit
          }`
        );

        const total = parseInt(res.headers["x-total-count"] || "0", 10);
        saveToLocalStorage(params?.page || 1, res.data, total);

        return { data: res.data, total };
      },
    });
  };

  const useGetPost = (id: number) => {
    return useQuery({
      queryKey: ["post", id],
      queryFn: async () => {
        const storedPost = getSinglePostFromLocalStorage(id);
        if (storedPost) return storedPost;

        const res = await api.get<Post>(`/posts/${id}`);
        return res.data;
      },
      enabled: !!id, // Only fetch if id exists
    });
  };

  // Create a new post
  const createPost = useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => {
      const storedData = getFromLocalStorage(1) || { posts: [], total: 0 };

      const postWithId = { ...newPost, id: storedData.total + 1 }; // Generate ID based on total posts
      const updatedPosts = [postWithId, ...storedData.posts];
      saveToLocalStorage(1, updatedPosts, storedData.total + 1);

      return Promise.resolve(postWithId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Update a post
  const updatePost = useMutation({
    mutationFn: (updatedPost: Post) => {
      let page = Math.ceil(updatedPost.id / defaultLimit); // Calculate the page based on the post ID
      if (getFromLocalStorage(page)) page = 1;
      const storedData = getFromLocalStorage(page);

      if (!storedData) return Promise.resolve(updatedPost);

      const updatedPosts = storedData.posts.map((post: Post) =>
        post.id === updatedPost.id ? updatedPost : post
      );

      saveToLocalStorage(page, updatedPosts, storedData.total);
      return Promise.resolve(updatedPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Delete a post
  const deletePost = useMutation({
    mutationFn: (id: number) => {
      const page = Math.ceil(id / defaultLimit); // Calculate the page based on the post ID
      const storedData = getFromLocalStorage(page);
      if (!storedData) return Promise.resolve();

      const updatedPosts = storedData.posts.filter(
        (post: Post) => post.id !== id
      );
      saveToLocalStorage(page, updatedPosts, storedData.total - 1);

      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    useGetPosts,
    useGetPost,
    createPost,
    updatePost,
    deletePost,
    defaultLimit,
  };
};
