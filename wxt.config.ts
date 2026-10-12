import { defineConfig } from "wxt";

export default defineConfig({
    manifest: {
        name: "ニコ見なべ",
        version: "4.0.0",
        description: "ニコニコ用ブラウザ拡張機能の詰め合わせ",
        permissions: ["storage"],
        action: {
            default_title: "ニコ見なべ",
        },
    },
});
