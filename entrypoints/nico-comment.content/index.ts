import "./style.css";

const ROTATE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20">
  <path d="M478 1056q-93 0-176-33.5t-147-92Q91 872 50 793.5T0 624h72q9 72 41 135.5T195.5 871Q246 919 311 948.5T449 983l-67-68 50-51 175 174q-38 11-71 14.5t-58 3.5Zm122-192v-96H360q-30 0-51-21t-21-51V456h-96v-72h96v-96h72v408h408v72h-96v96h-72Zm0-240V456H432v-72h168q30 0 51 21t21 51v168h-72Zm288-96q-9-72-41-135.5T764.5 281q-50.5-48-115-77.5T511 169l67 68-50 51-175-174q38-11 71-14.5t58-3.5q93 0 176 33.5t147 92q64 58.5 105 137T960 528h-72Z" fill="currentColor"/>
</svg>`;

const TRANSFORMS: Record<number, string> = {
  0: "",
  1: "rotate(90deg) scale(56.25%)",
  2: "rotate(180deg)",
  3: "rotate(270deg) scale(56.25%)",
};

/** 拡張機能が挿入したボタンを識別するための data 属性 */
const BTN_ATTR = "data-nico-ex-rotate";

export default defineContentScript({
  matches: ["https://www.nicovideo.jp/*"],

  async main() {
    let rotateState = 0;

    function getVideoElement(): HTMLVideoElement | null {
      return document.querySelector<HTMLVideoElement>("video");
    }

    function rotatePlayer() {
      rotateState = (rotateState + 1) % 4;
      const video = getVideoElement();
      if (!video) {
        console.warn("[nicominabe] <video> 要素が見つかりません");
        return;
      }

      const transform = TRANSFORMS[rotateState] ?? "";
      video.style.transform = transform;
      video.style.transformOrigin = "center center";

      // CSSアニメーション用のIDを付与（旧UI互換）
      video.id = rotateState === 0 ? "VideoPlayer" : `VideoPlayer_${rotateState + 1}`;
    }

    /**
     * 回転状態を video 要素に再適用する
     * フルスクリーン移行時に NicoNico がスタイルをリセットすることがあるため
     * タイミングをずらして複数回適用する
     */
    function reapplyRotation() {
      if (rotateState === 0) return;
      const transform = TRANSFORMS[rotateState] ?? "";
      const apply = () => {
        const video = getVideoElement();
        if (video) {
          video.style.transform = transform;
          video.style.transformOrigin = "center center";
        }
      };
      apply();
      setTimeout(apply, 100);
      setTimeout(apply, 300);
    }

    /**
     * 回転ボタンを1つ生成する
     */
    function createRotateButton(): HTMLButtonElement {
      const btn = document.createElement("button");
      btn.setAttribute(BTN_ATTR, "1");
      btn.className = "nico-ex-btn";
      btn.setAttribute("aria-label", "動画を回転させる(拡張機能)");
      btn.title = "動画を回転させる(拡張機能)";
      btn.type = "button";
      btn.innerHTML = `<span class="nico-ex-btn-inner">${ROTATE_SVG}</span>`;
      btn.addEventListener("click", rotatePlayer);
      return btn;
    }

    /**
     * ページ上のすべての「設定」ボタンを走査し、
     * まだ回転ボタンが挿入されていないものに追加する。
     * 通常時・全画面時どちらのコントローラーにも対応。
     */
    function syncButtons() {
      const settingsBtns = document.querySelectorAll<HTMLButtonElement>(
        "button[aria-label='設定']"
      );
      for (const settingsBtn of settingsBtns) {
        // この設定ボタンの直前にすでに回転ボタンがあればスキップ
        const prev = settingsBtn.previousElementSibling;
        if (prev && prev.hasAttribute(BTN_ATTR)) continue;

        const rotateBtn = createRotateButton();
        settingsBtn.before(rotateBtn);
      }
    }

    // フルスクリーン突入・解除どちらでも回転維持
    document.addEventListener("fullscreenchange", () => {
      reapplyRotation();
      // 全画面コントローラーはマウス移動時に遅延レンダリングされるため
      // ここでは syncButtons() を呼ばず MutationObserver に任せる
    });

    // ESC / F キーのフォールバック
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape" || event.key === "f" || event.key === "F") {
        setTimeout(reapplyRotation, 200);
      }
    });

    // ---- MutationObserver: ページ全体を常時監視 ----
    // 全画面コントローラーはマウス移動で遅延描画されるため、
    // 初期化後も監視を続けて設定ボタンが現れるたびに回転ボタンを追加する。
    const observer = new MutationObserver(() => {
      syncButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 初回も実行（すでに描画済みの場合）
    syncButtons();
  },
});
