import { browser } from "wxt/browser";

const MODE_LABELS: Record<string, string> = {
  normal: "ノーマル",
  random: "ランダム",
  manual: "マニュアル",
};

const currentMode = document.querySelector<HTMLElement>("#current-mode");
const errorMessage = document.querySelector<HTMLElement>("#error-message");
const openOptionsButton = document.querySelector<HTMLButtonElement>(
  "#open-options",
);

if (!currentMode || !errorMessage || !openOptionsButton) {
  throw new Error("ポップアップの必要な要素が見つかりません。");
}

try {
  const stored = await browser.storage.local.get("mode");
  currentMode.textContent =
    typeof stored.mode === "string"
      ? MODE_LABELS[stored.mode] ?? "ノーマル"
      : "ノーマル";
} catch (error) {
  currentMode.textContent = "設定を読み込めませんでした";
  errorMessage.hidden = false;
  errorMessage.textContent = String(error);
}

openOptionsButton.addEventListener("click", async () => {
  try {
    await browser.runtime.openOptionsPage();
    window.close();
  } catch (error) {
    errorMessage.hidden = false;
    errorMessage.textContent = `設定画面を開けませんでした: ${String(error)}`;
  }
});
