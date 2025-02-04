"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Content is required"),
});

export default function PostForm({
  onSubmit,
  isLoading,
  onCancel,
  initialValues,
  t,
}: {
  onSubmit: (data: { title: string; body: string }) => void;
  isLoading: boolean;
  onCancel: () => void;
  initialValues?: { title: string; body: string };
  t: (key: string) => string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues,
  });

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-6 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("post_title")}
        </label>
        <input
          {...register("title")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:opacity-50"
          disabled={isLoading}
        />
        {errors.title && (
          <motion.span
            className="text-red-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {t(errors.title.message || "invalid_input")}
          </motion.span>
        )}
      </motion.div>

      {/* Body Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("post_content")}
        </label>
        <textarea
          {...register("body")}
          className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all disabled:opacity-50"
          disabled={isLoading}
        />
        {errors.body && (
          <motion.span
            className="text-red-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {t(errors.body.message || "invalid_input")}
          </motion.span>
        )}
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex justify-end gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
        >
          {t("cancel")}
        </motion.button>

        <motion.button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-600 disabled:bg-blue-300 transition-all"
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          ) : null}
          {isLoading ? t("submitting") : t("submit")}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
