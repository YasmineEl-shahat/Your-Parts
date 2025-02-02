"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          {t("post_title")}
        </label>
        <input
          {...register("title")}
          className="w-full p-2 border rounded"
          disabled={isLoading}
        />
        {errors.title && (
          <span className="text-red-500 text-sm">
            {t(errors.title.message || "invalid_input")}
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {t("post_content")}
        </label>
        <textarea
          {...register("body")}
          className="w-full p-2 border rounded h-32"
          disabled={isLoading}
        />
        {errors.body && (
          <span className="text-red-500 text-sm">
            {t(errors.body.message || "invalid_input")}
          </span>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={isLoading}
        >
          {t("cancel")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
