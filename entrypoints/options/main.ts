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

const currentModeBadge = requireElement<HTMLElement>("#current-mode");
const currentStatusBadge = requireElement<HTMLElement>("#current-status-badge");
const errorMessage = requireElement<HTMLElement>("#error-message");
const cemeteryToggle = requireElement<HTMLInputElement>("#cemetery-toggle");
const toggleStatusText = requireElement<HTMLElement>("#toggle-status-text");
const modeSelectionArea = requireElement<HTMLElement>("#mode-selection-area");

const saveNormalButton = requireElement<HTMLButtonElement>("#save-normal");
const saveRandomButton = requireElement<HTMLButtonElement>("#save-random");
const saveManualButton = requireElement<HTMLButtonElement>("#save-manual");

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

const modeButtons: Record<RedirectMode, HTMLButtonElement> = {
  normal: saveNormalButton,
  random: saveRandomButton,
  manual: saveManualButton,
};

currentYear.textContent = String(new Date().getFullYear());

let currentActiveMode: RedirectMode = "normal";
let isFeatureEnabled = true;

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
  const videoId = `${manualPrefix.value}${number}`;
  manualPreview.src = `https://ext.nicovideo.jp/thumb/${videoId}`;
}

function updateUI(): void {
  cemeteryToggle.checked = isFeatureEnabled;
  toggleStatusText.textContent = isFeatureEnabled ? "有効" : "無効 (オフ)";
  toggleStatusText.classList.toggle("is-disabled", !isFeatureEnabled);

  currentStatusBadge.textContent = isFeatureEnabled ? "ON" : "OFF";
  currentStatusBadge.className = isFeatureEnabled ? "status-on" : "status-off";

  currentModeBadge.textContent = MODE_LABELS[currentActiveMode];

  // オフ時はモード選択エリアをグレーアウト＆操作不可に
  modeSelectionArea.classList.toggle("is-disabled", !isFeatureEnabled);

  // モードボタンの選択状態（有効時は選ばれているモードボタンの色を変えて選択状態を強調）
  for (const [modeKey, btn] of Object.entries(modeButtons) as [RedirectMode, HTMLButtonElement][]) {
    const isSelected = isFeatureEnabled && modeKey === currentActiveMode;
    btn.classList.toggle("is-active", isSelected);
    if (isSelected) {
      btn.textContent = `${MODE_LABELS[modeKey]} (選択中)`;
    } else {
      btn.textContent = `${MODE_LABELS[modeKey]}モードにする`;
    }
  }
}

async function saveToggle(enabled: boolean): Promise<void> {
  try {
    isFeatureEnabled = enabled;
    await browser.storage.local.set({ cemetery_enabled: enabled });
    updateUI();
    errorMessage.hidden = true;
  } catch (error) {
    showError(error);
  }
}

async function saveMode(mode: RedirectMode): Promise<void> {
  if (!isFeatureEnabled) {
    return;
  }
  try {
    currentActiveMode = mode;
    await browser.storage.local.set({ mode });
    modeTabs[mode].checked = true;
    updateUI();
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
    "cemetery_enabled",
  ]);

  isFeatureEnabled =
    typeof stored.cemetery_enabled === "boolean"
      ? stored.cemetery_enabled
      : stored.mode !== "off";

  currentActiveMode =
    stored.mode === "random" || stored.mode === "manual"
      ? stored.mode
      : "normal";

  modeTabs[currentActiveMode].checked = true;

  if (stored.manual_id === "nm") {
    manualPrefix.value = "nm";
  }
  if (typeof stored.manual_url === "string") {
    manualNumber.value = stored.manual_url;
  }
  updatePreview();
  updateUI();
} catch (error) {
  currentModeBadge.textContent = "読み込めませんでした";
  showError(error);
}

cemeteryToggle.addEventListener("change", () => {
  saveToggle(cemeteryToggle.checked);
});

saveNormalButton.addEventListener("click", () => saveMode("normal"));
saveRandomButton.addEventListener("click", () => saveMode("random"));

manualPrefix.addEventListener("change", updatePreview);
manualNumber.addEventListener("input", updatePreview);
manualForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!manualForm.reportValidity() || !isFeatureEnabled) {
    return;
  }

  try {
    currentActiveMode = "manual";
    await browser.storage.local.set({
      mode: "manual",
      manual_id: manualPrefix.value,
      manual_url: manualNumber.value,
    });
    modeTabs.manual.checked = true;
    updateUI();
    errorMessage.hidden = true;
  } catch (error) {
    showError(error);
  }
});
