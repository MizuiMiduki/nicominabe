import {
  DEFAULT_CEMETERY_VIDEO_ID,
  getCemeteryUrl,
  RANDOM_CEMETERY_VIDEO_IDS,
} from "../../utils/cemetery";

type RedirectMode = "normal" | "random" | "manual";

const ERROR_HEADING = "動画は視聴できません";
const ERROR_PAGE_TIMEOUT_MS = 10_000;

function isMissingVideoPage(): boolean {
  return (
    document.querySelector(".ErrorMessage") !== null ||
    Array.from(document.querySelectorAll("h1")).some((heading) =>
      heading.textContent?.includes(ERROR_HEADING),
    )
  );
}

function waitForMissingVideoPage(): Promise<boolean> {
  if (isMissingVideoPage()) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      if (isMissingVideoPage()) {
        window.clearTimeout(timeoutId);
        observer.disconnect();
        resolve(true);
      }
    });
    const timeoutId = window.setTimeout(() => {
      observer.disconnect();
      resolve(false);
    }, ERROR_PAGE_TIMEOUT_MS);

    observer.observe(document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    if (isMissingVideoPage()) {
      window.clearTimeout(timeoutId);
      observer.disconnect();
      resolve(true);
    }
  });
}

export default defineContentScript({
  matches: [
    "https://www.nicovideo.jp/*",
    "https://sp.nicovideo.jp/*",
  ],

  async main() {
    if (!(await waitForMissingVideoPage())) {
      return;
    }

    let stored: Record<string, unknown>;
    try {
      stored = await browser.storage.local.get([
        "mode",
        "manual_id",
        "manual_url",
      ]);
    } catch (error) {
      console.error("動画遷移の設定を読み込めませんでした。", error);
      return;
    }

    const mode: RedirectMode =
      stored.mode === "random" || stored.mode === "manual"
        ? stored.mode
        : "normal";

    const currentVideoId = window.location.pathname.match(
      /^\/watch\/([^/]+)/,
    )?.[1];
    if (!currentVideoId) {
      return;
    }

    let destinationVideoId: string;
    if (mode === "manual") {
      const prefix = stored.manual_id === "nm" ? "nm" : "sm";
      const number =
        typeof stored.manual_url === "string" &&
        /^\d+$/.test(stored.manual_url)
          ? stored.manual_url
          : "";
      const manualVideoId = number ? `${prefix}${number}` : "";

      if (manualVideoId && currentVideoId !== manualVideoId) {
        destinationVideoId = manualVideoId;
      } else if (currentVideoId !== DEFAULT_CEMETERY_VIDEO_ID) {
        destinationVideoId = DEFAULT_CEMETERY_VIDEO_ID;
      } else {
        return;
      }
    } else if (mode === "random") {
      if (RANDOM_CEMETERY_VIDEO_IDS.includes(currentVideoId)) {
        return;
      }

      const index = Math.floor(Math.random() * RANDOM_CEMETERY_VIDEO_IDS.length);
      destinationVideoId =
        RANDOM_CEMETERY_VIDEO_IDS[index] ?? DEFAULT_CEMETERY_VIDEO_ID;
    } else {
      if (currentVideoId === DEFAULT_CEMETERY_VIDEO_ID) {
        return;
      }
      destinationVideoId = DEFAULT_CEMETERY_VIDEO_ID;
    }

    window.location.replace(getCemeteryUrl(destinationVideoId));
  },
});
