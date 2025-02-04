"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n/i18n";
import { motion } from "framer-motion";

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
    <motion.nav
      className={`bg-white bg-opacity-80 backdrop-blur-md shadow-sm transition-all ${
        lang === "ar" ? "font-noto-arabic" : "font-inter"
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/"
              className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-all"
            >
              {t("app_name")}
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Create Post Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/posts/pages/create"
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
              >
                {t("create_new_post")}
              </Link>
            </motion.div>

            {/* Language Switcher */}
            <div className="flex items-center ltr:border-l rtl:border-r border-gray-200 ltr:pl-4 rtl:pr-4">
              <motion.button
                onClick={() => switchLanguage("en")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  lang === "en"
                    ? "bg-blue-100 text-blue-600 shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Switch to English"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                EN
              </motion.button>
              <motion.button
                onClick={() => switchLanguage("ar")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  lang === "ar"
                    ? "bg-blue-100 text-blue-600 shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Switch to Arabic"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                AR
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
