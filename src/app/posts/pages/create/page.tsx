"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { usePosts } from "../../hooks/usePosts";
import PostForm from "../../components/PostForm";

export default function CreatePostPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { createPost } = usePosts();

  const handleSubmit = async (data: { title: string; body: string }) => {
    try {
      await createPost.mutateAsync(data);
      router.push("/posts/pages");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("create_new_post")}</h1>
        <PostForm
          onSubmit={handleSubmit}
          isLoading={createPost.isPending}
          onCancel={() => router.back()}
          t={t}
        />
      </div>
    </div>
  );
}
