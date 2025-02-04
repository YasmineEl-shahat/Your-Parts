"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePosts, Post } from "../hooks/usePosts";
import { motion } from "framer-motion";

const PostList = () => {
  const { t } = useTranslation("common");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { useGetPosts, deletePost, defaultLimit } = usePosts();
  const {
    data: posts,
    isLoading,
    error,
  } = useGetPosts({
    page: currentPage,
    limit: defaultLimit,
  });

  const totalPages = posts ? Math.ceil(posts.total / defaultLimit) : 1;

  const handleDelete = (id: number) => {
    setDeletingId(id);
    deletePost.mutate(id, {
      onSettled: () => {
        setDeletingId(null);
        // If the last post on the page is deleted, go to the previous page
        if (posts?.data.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      },
    });
  };
  const filteredPosts =
    posts?.data?.filter((post: Post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];
  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        {t("error_fetching_posts")}: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        {t("posts")}
      </h1>
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder={t("search_placeholder")}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          href="/posts/pages/create"
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
        >
          {t("create_new_post")}
        </Link>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              className="animate-pulse bg-gray-200 rounded-lg p-4 shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Posts List */}
      {!isLoading && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {filteredPosts?.length > 0 ? (
            filteredPosts.map((post: Post) => (
              <motion.div
                key={post.id}
                className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-5 hover:shadow-xl transition-shadow transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.body}</p>
                <div className="flex justify-end gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all"
                  >
                    <Link href={`/posts/pages/${post.id}`}>{t("edit")}</Link>
                  </motion.div>
                  <motion.button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="px-3 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 disabled:bg-red-300 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {deletingId === post.id ? t("deleting") : t("delete")}
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">{t("no_results")}</p>
          )}
        </motion.div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-x-3">
        <motion.button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition-all"
          whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {t("previous")}
        </motion.button>

        <span className="px-4 py-2 bg-gray-100 rounded-lg shadow-sm">
          {t("page")} {currentPage} / {totalPages}
        </span>

        <motion.button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition-all"
          whileHover={{ scale: currentPage >= totalPages ? 1 : 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {t("next")}
        </motion.button>
      </div>
    </div>
  );
};

export default PostList;
