(() => {
    "use strict";

    function initFlashcard() {
        /* ========================================
           덱 데이터 불러오기
        ======================================== */

        const deckKey = document.body.dataset.deck?.trim();
        const decks = window.FLASHCARD_DECKS || {};
        const rawDeck = decks[deckKey];

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
         * 현재 권장 구조:
         *
         * {
         *     title: "Selecting",
         *     highlight: "& Moving",
         *     cards: [...]
         * }
         *
         * 기존 배열 구조도 임시 호환합니다.
         */
        const deck = Array.isArray(rawDeck)
            ? {
                title: "",
                highlight: "",
                cards: rawDeck
            }
            : rawDeck;

        const cards = deck.cards;

        if (!Array.isArray(cards) || cards.length === 0) {
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

        const doorFront =
            document.getElementById("doorFront");

        const doorBack =
            document.getElementById("doorBack");

        const cardToc =
            document.getElementById("cardToc");

        const pageTitle =
            document.getElementById("pageTitle") ||
            document.querySelector(".title");

        const requiredElements = {
            group,
            cardStage,
            koreanCard,
            doorFront,
            doorBack,
            cardToc,
            pageTitle
        };

        const missingElements = Object.entries(
            requiredElements
        )
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

            pageTitle.replaceChildren();

            if (normalTitle) {
                pageTitle.append(
                    document.createTextNode(normalTitle)
                );
            }

            if (normalTitle && highlightTitle) {
                pageTitle.append(
                    document.createTextNode(" ")
                );
            }

            if (highlightTitle) {
                const highlight =
                    document.createElement("span");

                highlight.textContent =
                    highlightTitle;

                pageTitle.append(highlight);
            }

            const fullTitle = [
                normalTitle,
                highlightTitle
            ]
                .filter(Boolean)
                .join(" ");

            document.title =
                fullTitle || deckKey.toUpperCase();
        }

        /* ========================================
           카드 열기 및 닫기
        ======================================== */

        function isCardOpen() {
            return group.classList.contains("open");
        }

        function setCardOpen(open) {
            group.classList.toggle("open", open);

            cardStage.setAttribute(
                "aria-expanded",
                String(open)
            );
        }

        function toggleCard() {
            setCardOpen(!isCardOpen());
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
                    String(card.section || "CARD");

                if (!sectionMap.has(section)) {
                    sectionMap.set(section, []);
                    sectionOrder.push(section);
                }

                sectionMap.get(section).push({
                    card,
                    index
                });
            });

            sectionOrder.forEach(
                (section, sectionIndex) => {
                    if (sectionIndex > 0) {
                        const divider =
                            document.createElement("div");

                        divider.className =
                            "toc-divider";

                        divider.setAttribute(
                            "aria-hidden",
                            "true"
                        );

                        cardToc.append(divider);
                    }

                    const tocGroup =
                        document.createElement("div");

                    tocGroup.className =
                        "toc-group";

                    const tocTitle =
                        document.createElement("div");

                    tocTitle.className =
                        "toc-title";

                    tocTitle.textContent =
                        section;

                    tocGroup.append(tocTitle);

                    const sectionCards =
                        sectionMap.get(section);

                    sectionCards.forEach(
                        ({ card, index }, localIndex) => {
                            const link =
                                document.createElement("a");

                            link.href =
                                `#${card.id}`;

                            link.dataset.index =
                                String(index);

                            link.textContent =
                                card.navLabel ||
                                (
                                    section === "VOCA"
                                        ? `V${localIndex + 1}`
                                        : String(localIndex + 1)
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
                                    goToCard(index);
                                }
                            );

                            tocGroup.append(link);
                        }
                    );

                    cardToc.append(tocGroup);
                }
            );

            tocLinks = [
                ...cardToc.querySelectorAll("a")
            ];
        }

        /* ========================================
           현재 카드 출력
        ======================================== */

        function renderCard() {
            const card = cards[currentIndex];

            if (!card) {
                return;
            }

            /*
             * front = 영어 앞면
             * back  = 카드를 열었을 때 보이는 한국어
             */
            const frontImage =
                `url("${card.front}")`;

            group.id = card.id;

            koreanCard.src = card.back;
            koreanCard.alt = "";

            doorFront.style.backgroundImage =
                frontImage;

            doorBack.style.backgroundImage =
                frontImage;

            cardStage.setAttribute(
                "aria-label",
                `${card.label || `Card ${currentIndex + 1}`} 카드 열기`
            );

            tocLinks.forEach((link, index) => {
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
            });

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

        function goToCard(nextIndex) {
            if (
                navigationLocked ||
                nextIndex < 0 ||
                nextIndex >= cards.length ||
                nextIndex === currentIndex
            ) {
                return;
            }

            const changeCard = () => {
                currentIndex = nextIndex;
                renderCard();
                navigationLocked = false;
            };

            /*
             * 열린 상태에서는 먼저 닫은 후
             * 다음 카드로 변경합니다.
             */
            if (isCardOpen()) {
                navigationLocked = true;

                setCardOpen(false);

                window.setTimeout(
                    changeCard,
                    430
                );
            } else {
                changeCard();
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
                    event.target instanceof Element
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
                if (
                    event.key === " " &&
                    event.target !== cardStage
                ) {
                    const interactiveElement =
                        target?.closest("button, a");

                    if (interactiveElement) {
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
                if (event.key === "ArrowLeft") {
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
                if (event.key === "ArrowRight") {
                    event.preventDefault();

                    goToCard(
                        currentIndex + 1
                    );

                    return;
                }

                /*
                 * Escape:
                 * 카드 닫기
                 */
                if (event.key === "Escape") {
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
                currentIndex = hashIndex;
            }
        }

        /* ========================================
           초기 실행
        ======================================== */

        renderPageTitle();
        createNavigator();
        setInitialCardFromHash();
        renderCard();
    }

    /* ========================================
       문서 로딩 완료 후 실행
    ======================================== */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initFlashcard
        );
    } else {
        initFlashcard();
    }
})();