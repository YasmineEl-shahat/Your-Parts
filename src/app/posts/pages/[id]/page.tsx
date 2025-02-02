"use client";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import PostForm from "../../components/PostForm";
import { usePosts } from "../../hooks/usePosts";

export default function EditPostPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { id } = useParams();
  const { useGetPost, updatePost, deletePost } = usePosts();

  const { data: post, isLoading, error } = useGetPost(Number(id));

  const handleSubmit = async (data: { title: string; body: string }) => {
    try {
      await updatePost.mutateAsync({ ...data, id: Number(id) });
      router.push("/posts/pages");
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(Number(id));
      router.push("/posts/pages");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (isLoading) return <div className="p-4">{t("loading")}...</div>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!post) return <div className="p-4">{t("post_not_found")}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("edit_post")}</h1>
          <button
            onClick={handleDelete}
            disabled={deletePost.isPending}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
          >
            {deletePost.isPending ? t("deleting") : t("delete")}
          </button>
        </div>

        <PostForm
          onSubmit={handleSubmit}
          initialValues={post}
          isLoading={updatePost.isPending}
          onCancel={() => router.back()}
          t={t}
        />
      </div>
    </div>
  );
}
