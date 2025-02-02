"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";

export default function Navbar() {
  const { t } = useTranslation("common");
  const lang = i18n.language;

  const switchLanguage = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", lng);
  };

  return (
    <nav
      className={`bg-white shadow-sm ${
        lang === "ar" ? "font-noto-arabic" : "font-inter"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            {t("app_name")}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            {/* Create Post Button */}
            <Link
              href="/posts/pages/create"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              {t("create_new_post")}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center ltr:border-l rtl:border-r border-gray-200 ltr:pl-4 rtl:pr-4">
              <button
                onClick={() => switchLanguage("en")}
                className={`px-3 py-1 rounded ${
                  lang === "en"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage("ar")}
                className={`px-3 py-1 rounded ${
                  lang === "ar"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Switch to Arabic"
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
