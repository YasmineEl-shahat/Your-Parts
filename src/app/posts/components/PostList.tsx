"use client";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import Link from "next/link";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

const PostList = () => {
  const { t } = useTranslation("common");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { useGetPosts, deletePost, defaultLimit } = usePosts();

  const {
    data: posts,
    isLoading,
    error,
  } = useGetPosts({
    page: currentPage,
    limit: defaultLimit,
  });

  const handleDelete = (id: number) => {
    setDeletingId(id);
    deletePost.mutate(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        {t("error_fetching_posts")}: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-6">{t("posts")}</h1>
        <Link
          href="/posts/pages/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {t("create_new_post")}
        </Link>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-100 rounded-lg p-4"
            >
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Posts List */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts?.data?.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.body}</p>
              <div className="flex justify-end space-x-2">
                <Link
                  href={`/posts/pages/${post.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {t("edit")}
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
                >
                  {deletingId === post.id ? t("deleting") : t("delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {t("previous")}
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded">
          {t("page")} {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default PostList;
