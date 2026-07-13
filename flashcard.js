(() => {
    "use strict";

    async function initFlashcard() {
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
         * 권장 데이터 구조:
         *
         * {
         *     title: "Selecting",
         *     highlight: "& Moving",
         *     cards: [...]
         * }
         *
         * 기존 배열 구조도 호환합니다.
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
            document.querySelector(".title");

        const requiredElements = {
            group,
            cardStage,
            koreanCard,
            englishDoor,
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
                fullTitle ||
                deckKey.toUpperCase() ||
                "Flashcard";
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
            if (navigationLocked) {
                return;
            }

            setCardOpen(!isCardOpen());
        }

        /* ========================================
           CSS 시간값 변환
        ======================================== */

        function parseCssTime(value) {
            const time =
                String(value || "").trim();

            if (time.endsWith("ms")) {
                return Number.parseFloat(time) || 0;
            }

            if (time.endsWith("s")) {
                return (
                    Number.parseFloat(time) || 0
                ) * 1000;
            }

            return Number.parseFloat(time) || 0;
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
                durations.map((duration, index) => {
                    const delay =
                        delays[index % delays.length] || 0;

                    return duration + delay;
                });

            /*
             * transitionend 이벤트 누락에 대비해
             * 약간의 여유 시간을 추가합니다.
             */
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

                const handleTransitionEnd = event => {
                    if (
                        event.target === englishDoor &&
                        event.propertyName === "transform"
                    ) {
                        finish();
                    }
                };

                const fallbackTimer =
                    window.setTimeout(
                        finish,
                        getTransitionTotal(englishDoor)
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

            /*
             * transitionend 감지를 먼저 등록한 뒤
             * 닫힘 클래스를 적용합니다.
             */
            const transitionPromise =
                waitForDoorTransition();

            setCardOpen(false);

            await transitionPromise;
        }

        /* ========================================
           이미지 미리 불러오기
        ======================================== */

        function preloadImage(source) {
            return new Promise(resolve => {
                if (!source) {
                    resolve();
                    return;
                }

                const image = new Image();
                let completed = false;

                const finish = () => {
                    if (completed) {
                        return;
                    }

                    completed = true;
                    resolve();
                };

                image.decoding = "async";

                image.addEventListener(
                    "load",
                    finish,
                    { once: true }
                );

                image.addEventListener(
                    "error",
                    finish,
                    { once: true }
                );

                image.src = source;

                if (image.complete) {
                    finish();
                }
            });
        }

        function preloadCard(card) {
            if (!card) {
                return Promise.resolve();
            }

            return Promise.all([
                preloadImage(card.front),
                preloadImage(card.back)
            ]);
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
             * back  = 문을 열었을 때 보이는 한국어
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

        async function goToCard(nextIndex) {
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
                 * 카드가 열려 있으면 문을 완전히 닫은 뒤
                 * 이미지 데이터를 변경합니다.
                 */
                await closeCardAndWait();

                /*
                 * 다음 영어·한국어 이미지를 모두 불러온 뒤
                 * 화면의 카드 데이터를 변경합니다.
                 */
                await preloadCard(nextCard);

                currentIndex = nextIndex;

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
                if (event.key === " ") {
                    const interactiveElement =
                        target?.closest(
                            "button, a"
                        );

                    if (
                        interactiveElement ||
                        event.target === cardStage
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
                 * 열린 카드 닫기
                 */
                if (event.key === "Escape") {
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
                currentIndex = hashIndex;
            }
        }

        /* ========================================
           초기 실행
        ======================================== */

        renderPageTitle();
        createNavigator();
        setInitialCardFromHash();

        /*
         * 첫 카드 이미지를 모두 불러온 뒤 출력합니다.
         */
        await preloadCard(
            cards[currentIndex]
        );

        renderCard();
        preloadAdjacentCards();
    }

    /* ========================================
       문서 로딩 완료 후 실행
    ======================================== */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            () => {
                initFlashcard().catch(error => {
                    console.error(
                        "[Flashcard] 초기화 중 오류가 발생했습니다.",
                        error
                    );
                });
            },
            { once: true }
        );
    } else {
        initFlashcard().catch(error => {
            console.error(
                "[Flashcard] 초기화 중 오류가 발생했습니다.",
                error
            );
        });
    }
})();
