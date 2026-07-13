(() => {
    "use strict";

    /*
     * 공통 이미지 파일 규칙
     *
     * VOCA 영어 앞면:
     * v1-1.png, v2-1.png ...
     *
     * VOCA 한국어:
     * v1-2.png, v2-2.png ...
     *
     * PATTERN 영어 앞면:
     * 1-1.png, 2-1.png ...
     *
     * PATTERN 한국어:
     * 1-2.png, 2-2.png ...
     */
    function createDeck(
        folder,
        vocaCount,
        patternCount
    ) {
        const vocaCards = Array.from(
            { length: vocaCount },
            (_, index) => {
                const number = index + 1;

                return {
                    id: `voca${number}`,
                    label: `Voca ${number}`,
                    section: "VOCA",

                    front:
                        `${folder}/v${number}-1.png`,

                    back:
                        `${folder}/v${number}-2.png`
                };
            }
        );

        const patternCards = Array.from(
            { length: patternCount },
            (_, index) => {
                const number = index + 1;

                return {
                    id: `pattern${number}`,
                    label: `Pattern ${number}`,
                    section: "PATTERN",

                    front:
                        `${folder}/${number}-1.png`,

                    back:
                        `${folder}/${number}-2.png`
                };
            }
        );

        return [
            ...vocaCards,
            ...patternCards
        ];
    }

    window.FLASHCARD_DECKS = {
        /* ========================================
           FD01 · Class Communication
        ======================================== */

        /*
         * FD01-1
         * Online Check
         *
         * VOCA 5개
         * PATTERN 8개
         */
        "fd01-1": {
            title: "Online",
            highlight: "Check",

            cards: createDeck(
                "Online%20Check",
                5,
                8
            )
        },

        /*
         * FD01-2
         * Asking Questions
         *
         * VOCA 4개
         * PATTERN 6개
         */
        "fd01-2": {
            title: "Asking",
            highlight: "Questions",

            cards: createDeck(
                "Questions",
                4,
                6
            )
        },

        /*
         * FD01-3
         * Asking for Help
         *
         * VOCA 4개
         * PATTERN 8개
         */
        "fd01-3": {
            title: "Asking for",
            highlight: "Help",

            cards: createDeck(
                "Asking%20for%20Help",
                4,
                8
            )
        },

        /*
         * FD01-4
         * Class Participation & Response
         *
         * VOCA 3개
         * PATTERN 5개
         */
        "fd01-4": {
            title: "Class Participation",
            highlight: "& Response",

            cards: createDeck(
                "Participation",
                3,
                5
            )
        },

        /* ========================================
           FD02 · Transform Basics
        ======================================== */

        /*
         * FD02-1
         * Selecting & Moving
         *
         * VOCA 7개
         * PATTERN 6개
         */
        "fd02-1": {
            title: "Selecting",
            highlight: "& Moving",

            cards: createDeck(
                "Selecting%20%26%20Moving",
                7,
                6
            )
        },

        /*
         * FD02-2
         * Resizing
         *
         * VOCA 5개
         * PATTERN 6개
         */
        "fd02-2": {
            title: "",
            highlight: "Resizing",

            cards: createDeck(
                "Resizing",
                5,
                6
            )
        },

        /*
         * FD02-3
         * Rotating & Flipping
         *
         * VOCA 6개
         * PATTERN 5개
         */
        "fd02-3": {
            title: "Rotating",
            highlight: "& Flipping",

            cards: createDeck(
                "Rotating%20%26%20Flipping",
                6,
                5
            )
        },

        /*
         * FD02-4
         * Grouping & Aligning
         *
         * VOCA 4개
         * PATTERN 5개
         */
        "fd02-4": {
            title: "Grouping",
            highlight: "& Aligning",

            cards: createDeck(
                "Grouping%20%26%20Aligning",
                4,
                5
            )
        }
    };
})();