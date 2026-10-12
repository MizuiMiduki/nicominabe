import { browser } from "wxt/browser";

type RedirectMode = "normal" | "random" | "manual";

const MODE_LABELS: Record<RedirectMode, string> = {
  normal: "ノーマル",
  random: "ランダム",
  manual: "マニュアル",
};

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`設定画面に必要な要素がありません: ${selector}`);
  }
  return element;
}

const currentMode = requireElement<HTMLElement>("#current-mode");
const errorMessage = requireElement<HTMLElement>("#error-message");
const saveNormalButton =
  requireElement<HTMLButtonElement>("#save-normal");
const saveRandomButton =
  requireElement<HTMLButtonElement>("#save-random");
const currentYear = requireElement<HTMLElement>("#current-year");
const manualForm = requireElement<HTMLFormElement>("#manual-form");
const manualPrefix = requireElement<HTMLSelectElement>("#manual-prefix");
const manualNumber = requireElement<HTMLInputElement>("#manual-number");
const manualPreview = requireElement<HTMLIFrameElement>("#manual-preview");
const modeTabs: Record<RedirectMode, HTMLInputElement> = {
  normal: requireElement<HTMLInputElement>("#normal"),
  random: requireElement<HTMLInputElement>("#random"),
  manual: requireElement<HTMLInputElement>("#manual"),
};

currentYear.textContent = String(new Date().getFullYear());

function showError(error: unknown): void {
  errorMessage.hidden = false;
  errorMessage.textContent = `設定を保存または読み込みできませんでした: ${String(error)}`;
}

function updatePreview(): void {
  const number = manualNumber.value;
  if (!/^\d+$/.test(number) || Number(number) < 1) {
    manualPreview.removeAttribute("src");
    return;
  }
  manualPreview.src = `https://ext.nicovideo.jp/thumb/${manualPrefix.value}${number}`;
}

async function saveMode(mode: RedirectMode): Promise<void> {
  try {
    await browser.storage.local.set({ mode });
    currentMode.textContent = MODE_LABELS[mode];
    modeTabs[mode].checked = true;
    errorMessage.hidden = true;
  } catch (error) {
    showError(error);
  }
}

try {
  const stored = await browser.storage.local.get([
    "mode",
    "manual_id",
    "manual_url",
  ]);
  const mode: RedirectMode =
    stored.mode === "random" || stored.mode === "manual"
      ? stored.mode
      : "normal";
  currentMode.textContent = MODE_LABELS[mode];
  modeTabs[mode].checked = true;

  if (stored.manual_id === "nm") {
    manualPrefix.value = "nm";
  }
  if (typeof stored.manual_url === "string") {
    manualNumber.value = stored.manual_url;
  }
  updatePreview();
} catch (error) {
  currentMode.textContent = "読み込めませんでした";
  showError(error);
}

saveNormalButton.addEventListener("click", () => saveMode("normal"));
saveRandomButton.addEventListener("click", () => saveMode("random"));

manualPrefix.addEventListener("change", updatePreview);
manualNumber.addEventListener("input", updatePreview);
manualForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!manualForm.reportValidity()) {
    return;
  }

  try {
    await browser.storage.local.set({
      mode: "manual",
      manual_id: manualPrefix.value,
      manual_url: manualNumber.value,
    });
    currentMode.textContent = MODE_LABELS.manual;
    modeTabs.manual.checked = true;
    errorMessage.hidden = true;
  } catch (error) {
    showError(error);
  }
});
