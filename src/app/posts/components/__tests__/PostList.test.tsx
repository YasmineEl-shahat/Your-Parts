import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostList from "../PostList";

// Mocking the usePosts hook
vi.mock("../hooks/usePosts", () => ({
  usePosts: () => ({
    useGetPosts: vi.fn().mockReturnValue({
      data: { data: [{ id: 1, title: "Test Post", body: "Post body" }] },
      isLoading: false,
      error: null,
    }),
    deletePost: { mutate: vi.fn() },
    defaultLimit: 10,
  }),
}));

// Create a wrapper for React Query's QueryClientProvider
const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("PostList", () => {
  it("displays posts correctly", async () => {
    render(<PostList />, { wrapper });

    // Check if the post title is rendered
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });
});
