(() => {
    "use strict";

    const wrapperScript = document.currentScript;
    const baseScript = document.createElement("script");
    baseScript.src = new URL("./flashcard-base.js", wrapperScript?.src || window.location.href).href;
    baseScript.async = false;

    const slashPattern = /\s+\/\s+/;

    function getParts(text) {
        return String(text || "")
            .split(slashPattern)
            .map(part => part.trim())
            .filter(Boolean);
    }

    function isTwoFullSentences(text) {
        const parts = getParts(text);
        if (parts.length !== 2) return false;

        return parts.every(part => {
            const words = part.split(/\s+/).filter(Boolean);
            return words.length >= 2 && /[.!?][\"']?$/.test(part);
        });
    }

    function splitMessage(element, originalText) {
        if (!element || element.classList.contains("split-message")) return;

        const parts = getParts(originalText);
        if (parts.length !== 2) return;

        element.replaceChildren();
        element.classList.add("split-message");

        parts.forEach(part => {
            const line = document.createElement("span");
            line.className = "message-line";
            line.textContent = part;
            element.append(line);
        });
    }

    function processCurrentCard() {
        const front = document.querySelector("#doorFront .card-message");
        const back = document.querySelector("#doorBack .card-message");
        const korean = document.querySelector("#koreanCard .card-message");

        if (!front || !back || !korean) return;

        const frontText = front.textContent.trim();
        if (!isTwoFullSentences(frontText)) return;

        splitMessage(front, frontText);
        splitMessage(back, back.textContent.trim());
        splitMessage(korean, korean.textContent.trim());
    }

    function startSentenceLayoutObserver() {
        const targets = [
            document.getElementById("doorFront"),
            document.getElementById("doorBack"),
            document.getElementById("koreanCard")
        ].filter(Boolean);

        if (targets.length === 0) return;

        let scheduled = false;
        const schedule = () => {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(() => {
                scheduled = false;
                processCurrentCard();
            });
        };

        const observer = new MutationObserver(schedule);
        targets.forEach(target => {
            observer.observe(target, {
                childList: true,
                subtree: true,
                characterData: true
            });
        });

        schedule();
    }

    baseScript.addEventListener("load", startSentenceLayoutObserver, { once: true });
    document.head.append(baseScript);
})();
