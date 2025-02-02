import i18n from "../i18n";
import { describe, expect, it } from "vitest";

describe("i18n", () => {
  it("initializes with English translations", () => {
    expect(i18n.t("posts")).toBe("Posts");
  });

  it("switches to Arabic", async () => {
    await i18n.changeLanguage("ar");
    expect(i18n.t("posts")).toBe("المنشورات");
  });

  it("falls back to English for missing keys", () => {
    expect(i18n.t("non_existent_key")).toBe("non_existent_key");
  });
});
