import "./style.css";

const STORAGE_KEY = "nikohyaku_plus_on_off";

export default defineContentScript({
    matches: ["https://dic.nicovideo.jp/*"],

    async main() {
        const snsArea = document.querySelector(".a-area_sns");
        if (!snsArea) {
            return;
        }

        const stored = await browser.storage.local.get(STORAGE_KEY);
        let enabled = stored[STORAGE_KEY] === true;

        const button = document.createElement("button");
        button.id = "nicohyaku_plus__on_off_button";
        button.className = enabled
            ? "nicohyaku-plus--on-off-button-enable"
            : "nicohyaku-plus--on-off-button-disable";
        button.textContent = "シロナガスクジラ";
        button.type = "button";

        const render = (animate = false) => {
            for (const element of document.querySelectorAll(".auto")) {
                element.classList.toggle("nicohyaku-plus--auto-hdn", enabled);
                element.classList.toggle("highlight-none", !enabled);
                element.classList.toggle(
                    "nicohyaku-plus--no-animation",
                    !animate,
                );
            }
            for (const element of document.querySelectorAll(".auto-hdn")) {
                element.classList.toggle("nicohyaku-plus--auto", enabled);
                element.classList.toggle("highlight-none", !enabled);
                element.classList.toggle(
                    "nicohyaku-plus--no-animation",
                    !animate,
                );
            }

            button.classList.toggle(
                "nicohyaku-plus--on-off-button-enable",
                enabled,
            );
            button.classList.toggle(
                "nicohyaku-plus--on-off-button-disable",
                !enabled,
            );
        };

        button.addEventListener("click", async () => {
            enabled = !enabled;
            render(true);

            try {
                await browser.storage.local.set({ [STORAGE_KEY]: enabled });
            } catch (error) {
                console.error(
                    "ニコ百の表示設定を保存できませんでした。",
                    error,
                );
            }
        });

        snsArea.before(button);
        render();
    },
});
