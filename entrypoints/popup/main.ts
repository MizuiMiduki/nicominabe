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
  const stored = await browser.storage.local.get(["mode", "cemetery_enabled"]);
  const isEnabled =
    typeof stored.cemetery_enabled === "boolean"
      ? stored.cemetery_enabled
      : stored.mode !== "off";

  if (!isEnabled) {
    currentMode.textContent = "オフ (無効)";
    currentMode.style.color = "#888";
  } else {
    const mode = typeof stored.mode === "string" ? stored.mode : "normal";
    currentMode.textContent = MODE_LABELS[mode] ?? "ノーマル";
    currentMode.style.color = "#ff6600";
  }
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
