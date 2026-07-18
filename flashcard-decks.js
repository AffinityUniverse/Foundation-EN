(() => {
    "use strict";

    /*
     * 기존 이미지형 덱을 생성하는 함수입니다.
     * 영어 파운데이션 클래스 1강 자료와의 호환성을 위해 유지합니다.
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

    /*
     * 이미지 없이 영문과 한글 텍스트만으로
     * 플래시카드 덱을 생성합니다.
     */
    function createTextDeck(
        topic,
        voca,
        patterns
    ) {
        const footer =
            "@ AFFINITY UNIVERSE";

        const makeCards = (
            items,
            section
        ) => items.map(
            (
                [
                    frontText,
                    backText,
                    highlightText
                ],
                index
            ) => ({
                id:
                    `${section.toLowerCase()}${index + 1}`,

                label:
                    `${section === "VOCA"
                        ? "Voca"
                        : "Pattern"} ${index + 1}`,

                section,

                eyebrow:
                    `${topic.toUpperCase()} - ${section}`,

                frontText,
                backText,

                highlightText:
                    highlightText || frontText,

                footer
            })
        );

        return [
            ...makeCards(voca, "VOCA"),
            ...makeCards(patterns, "PATTERN")
        ];
    } function createTextDeck(
        topic,
        voca,
        patterns
    ) {
        const footer =
            "@ AFFINITY UNIVERSE";

        const makeCards = (
            items,
            section
        ) => items.map(
            (
                [
                    frontText,
                    backText,
                    highlightText
                ],
                index
            ) => ({
                id:
                    `${section.toLowerCase()}${index + 1}`,

                label:
                    `${section === "VOCA"
                        ? "Voca"
                        : "Pattern"} ${index + 1}`,

                section,

                eyebrow:
                    `${topic.toUpperCase()} - ${section}`,

                frontText,
                backText,

                /*
                 * 세 번째 값이 지정된 카드만
                 * 노란색으로 강조됩니다.
                 */
                highlightText:
                    highlightText || "",

                footer
            })
        );

        return [
            ...makeCards(voca, "VOCA"),
            ...makeCards(patterns, "PATTERN")
        ];
    }

    window.FLASHCARD_DECKS = {
        /* ========================================
           FD01 · Class Communication
           기존 이미지형 덱
        ======================================== */

        "fd01-1": {
            title: "Online",
            highlight: "Check",

            cards: createDeck(
                "Online%20Check",
                5,
                8
            )
        },

        "fd01-2": {
            title: "Asking",
            highlight: "Questions",

            cards: createDeck(
                "Questions",
                4,
                6
            )
        },

        "fd01-3": {
            title: "Asking for",
            highlight: "Help",

            cards: createDeck(
                "Asking%20for%20Help",
                4,
                8
            )
        },

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
           FD02-1 · Selecting & Moving
        ======================================== */

        "fd02-1": {
            title: "Selecting",
            highlight: "& Moving",

            cards: createTextDeck(
                "Selecting & Moving",

                [
                    [
                        "select",
                        "선택하다"
                    ],
                    [
                        "move",
                        "움직이다"
                    ],
                    [
                        "drag",
                        "드래그하다"
                    ],
                    [
                        "click",
                        "클릭하다"
                    ],
                    [
                        "circle",
                        "원"
                    ],
                    [
                        "triangle",
                        "삼각형"
                    ],
                    [
                        "rounded rectangle",
                        "둥근 사각형"
                    ]
                ],

                [
                    [
                        "Draw a circle.",
                        "원을 그려보세요"
                    ],
                    [
                        "Select the triangle.",
                        "삼각형을 선택하세요"
                    ],
                    [
                        "Click on the rounded rectangle.",
                        "둥근 사각형을 클릭하세요"
                    ],
                    [
                        "Drag it to the center.",
                        "가운데로 드래그 하세요"
                    ],
                    [
                        "Move it to the left / right.",
                        "왼쪽 / 오른쪽으로 움직이세요",
                        "left / right"
                    ],
                    [
                        "Move it up / down.",
                        "위 / 아래로 움직이세요",
                        "up / down"
                    ]
                ]
            )
        },

        /* ========================================
           FD02-2 · Resizing
        ======================================== */

        "fd02-2": {
            title: "",
            highlight: "Resizing",

            cards: createTextDeck(
                "Resizing",

                [
                    [
                        "bigger",
                        "더 크게"
                    ],
                    [
                        "smaller",
                        "더 작게"
                    ],
                    [
                        "resize",
                        "크기를 조절하다"
                    ],
                    [
                        "hold",
                        "누르고 있다"
                    ],
                    [
                        "rectangle",
                        "사각형"
                    ]
                ],

                [
                    [
                        "Make the rectangle bigger.",
                        "사각형을 더 크게 만들어 보세요",
                        "bigger"
                    ],
                    [
                        "Make the circle smaller.",
                        "원을 더 작게 만들어 보세요",
                        "smaller"
                    ],
                    [
                        "Move the corner to resize it.",
                        "꼭지점을 움직여서 사이즈를 조절해 주세요",
                        "resize"
                    ],
                    [
                        "Hold Shift to keep the same shape.",
                        "시프트키를 누르면 같은 모양을 유지할 수 있어요.",
                        "Shift"
                    ],
                    [
                        "Hold Shift to make a perfect circle.",
                        "시프트키를 누르면 정 원을 만들 수 있어요.",
                        "perfect circle"
                    ],
                    [
                        "Hold Ctrl/Cmd key to copy it.",
                        "컨트롤/커맨드키를 눌러서 복사해볼게요.",
                        "Ctrl/Cmd"
                    ]
                ]
            )
        },

        /* ========================================
           FD02-3 · Rotating & Flipping
        ======================================== */

        "fd02-3": {
            title: "Rotating",
            highlight: "& Flipping",

            cards: createTextDeck(
                "Rotating & Flipping",

                [
                    [
                        "rotate",
                        "회전하다"
                    ],
                    [
                        "flip",
                        "반전시키다"
                    ],
                    [
                        "horizontal",
                        "수평(가로)"
                    ],
                    [
                        "vertical",
                        "수직(세로)"
                    ],
                    [
                        "clockwise",
                        "시계 방향"
                    ],
                    [
                        "anticlockwise",
                        "반시계 방향"
                    ]
                ],

                [
                    [
                        "Use the top handle to rotate the heart.",
                        "손잡이를 사용해서 하트 모양을 회전시켜주세요.",
                        "heart"
                    ],
                    [
                        "Rotate it clockwise.",
                        "시계 방향으로 회전해 볼게요"
                    ],
                    [
                        "Rotate it anticlockwise.",
                        "반시계 방향으로 회전해 볼게요"
                    ],
                    [
                        "Flip it horizontally.",
                        "수평 방향 반전해 볼게요"
                    ],
                    [
                        "Flip it vertically.",
                        "수직 방향 반전해 볼게요"
                    ]
                ]
            )
        },

        /* ========================================
           FD02-4 · Grouping & Aligning
        ======================================== */

        "fd02-4": {
            title: "Grouping",
            highlight: "& Aligning",

            cards: createTextDeck(
                "Grouping & Aligning",

                [
                    [
                        "both",
                        "둘 다"
                    ],
                    [
                        "group",
                        "그룹으로 묶다"
                    ],
                    [
                        "align",
                        "정렬하다"
                    ],
                    [
                        "center",
                        "가운데"
                    ]
                ],

                [
                    [
                        "Hold Shift and select both shapes.",
                        "시프트 키를 눌러서 둘 다 선택해 볼게요.",
                        "both shapes"
                    ],
                    [
                        "Drag from the outside to select everything.",
                        "바깥에서부터 드래그 해서 전체 선택해 볼게요.",
                        "select everything"
                    ],
                    [
                        "Press Ctrl/Cmd + G to group them.",
                        "컨트롤/커맨드키 + 알파벳 G 눌러서 그룹해 볼게요",
                        "Ctrl/Cmd + G"
                    ],
                    [
                        "Select both and move them left and right.",
                        "양쪽 모두 선택해서 왼쪽 오른쪽으로 움직여 볼게요.",
                        "left and right"
                    ],
                    [
                        "Align them to the center.",
                        "가운데로 정렬해 볼게요.",
                        "center"
                    ]
                ]
            )
        }
    };
})();
