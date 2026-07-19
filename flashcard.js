(() => {
    "use strict";

    async function initFlashcard() {
        /* ========================================
           덱 데이터 불러오기
        ======================================== */

        const deckKey =
            document.body.dataset.deck?.trim();

        const decks =
            window.FLASHCARD_DECKS || {};

        const rawDeck =
            decks[deckKey];

        if (!deckKey) {
            console.error(
                '[Flashcard] <body>에 data-deck 값이 없습니다.'
            );
            return;
        }

        if (!rawDeck) {
            console.error(
                `[Flashcard] "${deckKey}" 덱을 찾을 수 없습니다.`
            );
            return;
        }

        /*
         * 권장 데이터 구조:
         *
         * {
         *     title: "Selecting",
         *     highlight: "& Moving",
         *     cards: [...]
         * }
         */
        const deck =
            Array.isArray(rawDeck)
                ? {
                    title: "",
                    highlight: "",
                    cards: rawDeck
                }
                : rawDeck;

        const cards =
            deck.cards;

        if (
            !Array.isArray(cards) ||
            cards.length === 0
        ) {
            console.error(
                `[Flashcard] "${deckKey}"의 카드 데이터가 없습니다.`
            );
            return;
        }

        /* ========================================
           필수 HTML 요소
        ======================================== */

        const group =
            document.querySelector(".group");

        const cardStage =
            document.getElementById("cardStage");

        const koreanCard =
            document.getElementById("koreanCard");

        const englishDoor =
            document.querySelector(".english-door");

        const doorFront =
            document.getElementById("doorFront");

        const doorBack =
            document.getElementById("doorBack");

        const cardToc =
            document.getElementById("cardToc");

        const pageTitle =
            document.getElementById("pageTitle") ||
            document.querySelector(".title") ||
            null;

        const requiredElements = {
            group,
            cardStage,
            koreanCard,
            englishDoor,
            doorFront,
            doorBack,
            cardToc
        };

        const missingElements =
            Object.entries(requiredElements)
                .filter(([, element]) => !element)
                .map(([name]) => name);

        if (missingElements.length > 0) {
            console.error(
                `[Flashcard] 필수 HTML 요소가 없습니다: ${missingElements.join(", ")}`
            );
            return;
        }

        /* ========================================
           상태값
        ======================================== */

        let currentIndex = 0;
        let navigationLocked = false;
        let tocLinks = [];

        /* ========================================
           페이지 타이틀
        ======================================== */

        function renderPageTitle() {
            const normalTitle =
                String(deck.title || "").trim();

            const highlightTitle =
                String(deck.highlight || "").trim();

            const fullTitle = [
                normalTitle,
                highlightTitle
            ]
                .filter(Boolean)
                .join(" ");

            /*
             * 화면에는 타이틀을 만들지 않고,
             * 브라우저 탭 제목만 설정합니다.
             */
            document.title =
                fullTitle ||
                deckKey.toUpperCase() ||
                "Flashcard";
        }

        /* ========================================
           카드 열기 및 닫기
        ======================================== */

        function isCardOpen() {
            return group.classList.contains(
                "open"
            );
        }

        function setCardOpen(open) {
            group.classList.toggle(
                "open",
                open
            );

            cardStage.setAttribute(
                "aria-expanded",
                String(open)
            );
        }

        function toggleCard() {
            if (navigationLocked) {
                return;
            }

            setCardOpen(
                !isCardOpen()
            );
        }

        /* ========================================
           CSS 시간값 변환
        ======================================== */

        function parseCssTime(value) {
            const time =
                String(value || "").trim();

            if (time.endsWith("ms")) {
                return (
                    Number.parseFloat(time) ||
                    0
                );
            }

            if (time.endsWith("s")) {
                return (
                    Number.parseFloat(time) ||
                    0
                ) * 1000;
            }

            return (
                Number.parseFloat(time) ||
                0
            );
        }

        function getTransitionTotal(element) {
            const style =
                window.getComputedStyle(element);

            const durations =
                style.transitionDuration
                    .split(",")
                    .map(parseCssTime);

            const delays =
                style.transitionDelay
                    .split(",")
                    .map(parseCssTime);

            const totalTimes =
                durations.map(
                    (duration, index) => {
                        const delay =
                            delays[
                            index %
                            delays.length
                            ] || 0;

                        return duration + delay;
                    }
                );

            return Math.max(
                0,
                ...totalTimes
            ) + 60;
        }

        /* ========================================
           문 닫힘 완료 대기
        ======================================== */

        function waitForDoorTransition() {
            return new Promise(resolve => {
                let completed = false;

                const finish = () => {
                    if (completed) {
                        return;
                    }

                    completed = true;

                    englishDoor.removeEventListener(
                        "transitionend",
                        handleTransitionEnd
                    );

                    window.clearTimeout(
                        fallbackTimer
                    );

                    resolve();
                };

                const handleTransitionEnd =
                    event => {
                        if (
                            event.target ===
                            englishDoor &&
                            event.propertyName ===
                            "transform"
                        ) {
                            finish();
                        }
                    };

                const fallbackTimer =
                    window.setTimeout(
                        finish,
                        getTransitionTotal(
                            englishDoor
                        )
                    );

                englishDoor.addEventListener(
                    "transitionend",
                    handleTransitionEnd
                );
            });
        }

        async function closeCardAndWait() {
            if (!isCardOpen()) {
                return;
            }

            const transitionPromise =
                waitForDoorTransition();

            setCardOpen(false);

            await transitionPromise;
        }

        /*
         * 텍스트 카드이기 때문에
         * 별도의 이미지 로딩은 필요하지 않습니다.
         * 기존 이동 로직과의 호환성을 위해 유지합니다.
         */
        function preloadCard() {
            return Promise.resolve();
        }

        function preloadAdjacentCards() {
            const previousCard =
                cards[currentIndex - 1];

            const nextCard =
                cards[currentIndex + 1];

            Promise.allSettled([
                preloadCard(previousCard),
                preloadCard(nextCard)
            ]);
        }

        /* ========================================
           네비게이터 자동 생성
        ======================================== */

        function createNavigator() {
            cardToc.replaceChildren();

            const sectionOrder = [];
            const sectionMap = new Map();

            cards.forEach((card, index) => {
                const section =
                    String(
                        card.section ||
                        "CARD"
                    );

                if (!sectionMap.has(section)) {
                    sectionMap.set(
                        section,
                        []
                    );

                    sectionOrder.push(
                        section
                    );
                }

                sectionMap
                    .get(section)
                    .push({
                        card,
                        index
                    });
            });

            sectionOrder.forEach(
                (
                    section,
                    sectionIndex
                ) => {
                    if (sectionIndex > 0) {
                        const divider =
                            document.createElement(
                                "div"
                            );

                        divider.className =
                            "toc-divider";

                        divider.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                        cardToc.append(
                            divider
                        );
                    }

                    const tocGroup =
                        document.createElement(
                            "div"
                        );

                    tocGroup.className =
                        "toc-group";

                    const tocTitle =
                        document.createElement(
                            "div"
                        );

                    tocTitle.className =
                        "toc-title";

                    tocTitle.textContent =
                        section;

                    tocGroup.append(
                        tocTitle
                    );

                    const sectionCards =
                        sectionMap.get(section);

                    sectionCards.forEach(
                        (
                            {
                                card,
                                index
                            },
                            localIndex
                        ) => {
                            const link =
                                document.createElement(
                                    "a"
                                );

                            link.href =
                                `#${card.id}`;

                            link.dataset.index =
                                String(index);

                            link.textContent =
                                card.navLabel ||
                                (
                                    section ===
                                        "VOCA"
                                        ? `V${localIndex + 1}`
                                        : String(
                                            localIndex + 1
                                        )
                                );

                            link.setAttribute(
                                "aria-label",
                                card.label ||
                                `Card ${index + 1}`
                            );

                            link.addEventListener(
                                "click",
                                event => {
                                    event.preventDefault();

                                    goToCard(
                                        index
                                    );
                                }
                            );

                            tocGroup.append(
                                link
                            );
                        }
                    );

                    cardToc.append(
                        tocGroup
                    );
                }
            );

            tocLinks = [
                ...cardToc.querySelectorAll(
                    "a"
                )
            ];
        }

        /* ========================================
           카드 내용 생성
        ======================================== */

        const createFace = text => {
            const face =
                document.createDocumentFragment();

            const eyebrow =
                document.createElement("div");

            eyebrow.className =
                "card-eyebrow";

            eyebrow.textContent =
                card.eyebrow || "";

            const message =
                document.createElement("div");

            message.className =
                `card-message ${card.section === "VOCA"
                    ? "voca-message"
                    : "pattern-message"
                }`;

            const fullText =
                String(text || "");

            /*
             * 문자열 하나와 배열 모두 지원합니다.
             *
             * "말미잘"
             *
             * 또는
             *
             * ["Trapezoid", "사다리꼴"]
             */
            const highlights =
                Array.isArray(card.highlightText)
                    ? card.highlightText
                    : card.highlightText
                        ? [card.highlightText]
                        : [];

            const validHighlights =
                highlights
                    .map(value =>
                        String(value).trim()
                    )
                    .filter(Boolean)
                    .sort(
                        (a, b) =>
                            b.length - a.length
                    );

            if (validHighlights.length === 0) {
                message.textContent =
                    fullText;
            } else {
                const escapedHighlights =
                    validHighlights.map(
                        value =>
                            value.replace(
                                /[.*+?^${}()|[\]\\]/g,
                                "\\$&"
                            )
                    );

                const pattern =
                    new RegExp(
                        escapedHighlights.join("|"),
                        "gi"
                    );

                let currentPosition = 0;
                let match;

                while (
                    (
                        match =
                        pattern.exec(fullText)
                    ) !== null
                ) {
                    /*
                     * 강조 문구 앞의 일반 글자
                     */
                    message.append(
                        fullText.slice(
                            currentPosition,
                            match.index
                        )
                    );

                    /*
                     * 노란색 강조 문구
                     */
                    const highlight =
                        document.createElement(
                            "span"
                        );

                    highlight.textContent =
                        match[0];

                    message.append(
                        highlight
                    );

                    currentPosition =
                        pattern.lastIndex;
                }

                /*
                 * 마지막 강조 문구 뒤의 일반 글자
                 */
                message.append(
                    fullText.slice(
                        currentPosition
                    )
                );
            }

            const footer =
                document.createElement("div");

            footer.className =
                "card-footer";

            footer.textContent =
                card.footer ||
                "@ AFFINITY UNIVERSE";

            face.append(
                eyebrow,
                message,
                footer
            );

            return face;
        };

        /* ========================================
           현재 카드 출력
        ======================================== */

        const appendHighlightedText = (
            element,
            text,
            highlightText
        ) => {
            const fullText =
                String(text || "");

            const highlights =
                Array.isArray(highlightText)
                    ? highlightText
                    : highlightText
                        ? [highlightText]
                        : [];

            if (highlights.length === 0) {
                element.textContent =
                    fullText;

                return;
            }

            const escapedHighlights =
                highlights
                    .filter(Boolean)
                    .map(value =>
                        String(value).replace(
                            /[.*+?^${}()|[\]\\]/g,
                            "\\$&"
                        )
                    );

            if (
                escapedHighlights.length === 0
            ) {
                element.textContent =
                    fullText;

                return;
            }

            /*
             * 긴 문구부터 검사해서
             * 일부 단어가 먼저 잘리는 것을 방지합니다.
             */
            escapedHighlights.sort(
                (a, b) =>
                    b.length - a.length
            );

            const pattern =
                new RegExp(
                    `(${escapedHighlights.join("|")})`,
                    "gi"
                );

            const parts =
                fullText.split(pattern);

            parts.forEach(part => {
                const isHighlight =
                    highlights.some(
                        value =>
                            String(value)
                                .toLocaleLowerCase() ===
                            part.toLocaleLowerCase()
                    );

                if (isHighlight) {
                    const highlight =
                        document.createElement(
                            "span"
                        );

                    highlight.textContent =
                        part;

                    element.append(
                        highlight
                    );
                } else {
                    element.append(part);
                }
            });
        };

        function renderCard() {
            const card =
                cards[currentIndex];

            if (!card) {
                return;
            }

            group.id =
                card.id;

            /*
             * 정규식 특수문자 처리
             */
            function escapeRegExp(value) {
                return String(value).replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                );
            }

            /*
             * 카드 한 면 생성
             *
             * 반드시 renderCard() 내부에 있어야
             * 현재 card 데이터를 사용할 수 있습니다.
             */
            function createFace(text) {
                const face =
                    document.createDocumentFragment();

                const eyebrow =
                    document.createElement("div");

                eyebrow.className =
                    "card-eyebrow";

                eyebrow.textContent =
                    card.eyebrow || "";

                const message =
                    document.createElement("div");

                message.className =
                    `card-message ${card.section === "VOCA"
                        ? "voca-message"
                        : "pattern-message"
                    }`;

                const fullText =
                    String(text || "");

                /*
                 * 세 번째 데이터가 문자열이면 배열로 변환합니다.
                 */
                const highlightValues =
                    Array.isArray(
                        card.highlightText
                    )
                        ? card.highlightText
                        : card.highlightText
                            ? [card.highlightText]
                            : [];

                const highlights =
                    highlightValues
                        .map(value =>
                            String(value).trim()
                        )
                        .filter(Boolean)
                        .sort(
                            (a, b) =>
                                b.length -
                                a.length
                        );

                /*
                 * 강조 문구가 없으면
                 * 일반 텍스트로 표시합니다.
                 */
                if (
                    highlights.length === 0
                ) {
                    message.textContent =
                        fullText;
                } else {
                    const pattern =
                        new RegExp(
                            highlights
                                .map(
                                    escapeRegExp
                                )
                                .join("|"),
                            "gi"
                        );

                    let lastIndex = 0;
                    let match;

                    while (
                        (
                            match =
                            pattern.exec(
                                fullText
                            )
                        ) !== null
                    ) {
                        /*
                         * 강조 문구 앞의 일반 글자
                         */
                        if (
                            match.index >
                            lastIndex
                        ) {
                            message.append(
                                document.createTextNode(
                                    fullText.slice(
                                        lastIndex,
                                        match.index
                                    )
                                )
                            );
                        }

                        /*
                         * 노란색 강조 글자
                         */
                        const highlight =
                            document.createElement(
                                "span"
                            );

                        highlight.textContent =
                            match[0];

                        message.append(
                            highlight
                        );

                        lastIndex =
                            pattern.lastIndex;

                        /*
                         * 빈 문자열 정규식으로 인한
                         * 무한 반복 방지
                         */
                        if (
                            match[0].length === 0
                        ) {
                            pattern.lastIndex += 1;
                        }
                    }

                    /*
                     * 마지막 강조 글자 이후의 일반 글자
                     */
                    if (
                        lastIndex <
                        fullText.length
                    ) {
                        message.append(
                            document.createTextNode(
                                fullText.slice(
                                    lastIndex
                                )
                            )
                        );
                    }
                }

                const footer =
                    document.createElement("div");

                footer.className =
                    "card-footer";

                footer.textContent =
                    card.footer ||
                    "@ AFFINITY UNIVERSE";

                face.append(
                    eyebrow,
                    message,
                    footer
                );

                return face;
            }

            /*
             * 한국어 카드
             */
            koreanCard.replaceChildren(
                createFace(
                    card.backText
                )
            );

            /*
             * 영어 카드 앞면
             */
            doorFront.replaceChildren(
                createFace(
                    card.frontText
                )
            );

            /*
             * 영어 카드 뒷면
             */
            doorBack.replaceChildren(
                createFace(
                    card.frontText
                )
            );

            cardStage.setAttribute(
                "aria-label",
                `${card.label ||
                `Card ${currentIndex + 1}`
                } 카드 열기`
            );

            tocLinks.forEach(
                (link, index) => {
                    const active =
                        index === currentIndex;

                    link.classList.toggle(
                        "active",
                        active
                    );

                    if (active) {
                        link.setAttribute(
                            "aria-current",
                            "true"
                        );

                        link.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "center"
                        });
                    } else {
                        link.removeAttribute(
                            "aria-current"
                        );
                    }
                }
            );

            try {
                history.replaceState(
                    null,
                    "",
                    `#${card.id}`
                );
            } catch (error) {
                console.warn(
                    "[Flashcard] 주소 해시를 변경하지 못했습니다.",
                    error
                );
            }
        }

        /* ========================================
           이전·다음 카드 이동
        ======================================== */

        async function goToCard(
            nextIndex
        ) {
            if (
                navigationLocked ||
                nextIndex < 0 ||
                nextIndex >= cards.length ||
                nextIndex === currentIndex
            ) {
                return;
            }

            navigationLocked = true;

            const nextCard =
                cards[nextIndex];

            try {
                /*
                 * 카드가 열려 있으면 완전히 닫은 후
                 * 다음 카드로 이동합니다.
                 */
                await closeCardAndWait();

                await preloadCard(
                    nextCard
                );

                currentIndex =
                    nextIndex;

                renderCard();
                preloadAdjacentCards();
            } catch (error) {
                console.error(
                    "[Flashcard] 카드 이동 중 오류가 발생했습니다.",
                    error
                );
            } finally {
                navigationLocked = false;
            }
        }

        /* ========================================
           카드 클릭
        ======================================== */

        cardStage.addEventListener(
            "click",
            toggleCard
        );

        /* ========================================
           카드 포커스 상태 키보드
        ======================================== */

        cardStage.addEventListener(
            "keydown",
            event => {
                if (
                    event.key !== " " &&
                    event.key !== "Enter"
                ) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                toggleCard();
            }
        );

        /* ========================================
           페이지 전체 키보드
        ======================================== */

        document.addEventListener(
            "keydown",
            event => {
                const target =
                    event.target instanceof
                        Element
                        ? event.target
                        : null;

                const editableElement =
                    target?.closest(
                        "input, textarea, select, [contenteditable='true']"
                    );

                if (editableElement) {
                    return;
                }

                /*
                 * Space:
                 * 카드 열기 및 닫기
                 */
                if (event.key === " ") {
                    const interactiveElement =
                        target?.closest(
                            "button, a"
                        );

                    if (
                        interactiveElement ||
                        event.target ===
                        cardStage
                    ) {
                        return;
                    }

                    event.preventDefault();

                    toggleCard();

                    return;
                }

                /*
                 * 왼쪽 화살표:
                 * 이전 카드
                 */
                if (
                    event.key ===
                    "ArrowLeft"
                ) {
                    event.preventDefault();

                    goToCard(
                        currentIndex - 1
                    );

                    return;
                }

                /*
                 * 오른쪽 화살표:
                 * 다음 카드
                 */
                if (
                    event.key ===
                    "ArrowRight"
                ) {
                    event.preventDefault();

                    goToCard(
                        currentIndex + 1
                    );

                    return;
                }

                /*
                 * Escape:
                 * 열린 카드 닫기
                 */
                if (
                    event.key ===
                    "Escape"
                ) {
                    if (navigationLocked) {
                        return;
                    }

                    setCardOpen(false);
                }
            }
        );

        /* ========================================
           주소 해시 기준 초기 카드 설정
        ======================================== */

        function setInitialCardFromHash() {
            const hashIndex =
                cards.findIndex(
                    card =>
                        `#${card.id}` ===
                        window.location.hash
                );

            if (hashIndex >= 0) {
                currentIndex =
                    hashIndex;
            }
        }

        /* ========================================
           초기 실행
        ======================================== */

        renderPageTitle();
        createNavigator();
        setInitialCardFromHash();

        await preloadCard(
            cards[currentIndex]
        );

        renderCard();
        preloadAdjacentCards();
    }

    /* ========================================
       문서 로딩 완료 후 실행
    ======================================== */

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            () => {
                initFlashcard()
                    .catch(error => {
                        console.error(
                            "[Flashcard] 초기화 중 오류가 발생했습니다.",
                            error
                        );
                    });
            },
            {
                once: true
            }
        );
    } else {
        initFlashcard()
            .catch(error => {
                console.error(
                    "[Flashcard] 초기화 중 오류가 발생했습니다.",
                    error
                );
            });
    }
})();
