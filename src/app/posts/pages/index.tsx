import useTranslation from "next-translate/useTranslation";
import PostList from "../components/PostList";
import Link from "next/link";

export default function HomePage() {
  const { t } = useTranslation("common");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("posts")}</h1>
        <Link
          href="/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {t("create_new_post")}
        </Link>
      </div>

      <PostList />
    </main>
  );
}
