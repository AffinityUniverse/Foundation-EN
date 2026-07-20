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

            cards: createTextDeck(
                "Online Check",

                [
                    [
                        "hear",
                        "듣다"
                    ],
                    [
                        "see",
                        "보다"
                    ],
                    [
                        "screen",
                        "화면"
                    ],
                    [
                        "camera",
                        "카메라"
                    ],
                    [
                        "microphone",
                        "마이크"
                    ]
                ],

                [
                    [
                        "Can you hear me?",
                        "목소리 잘 들리나요?"
                    ],
                    [
                        "I can hear you. / I can’t hear you.",
                        "잘 들려요 / 잘 안 들려요"
                    ],
                    [
                        "Can you share your screen?",
                        "화면 공유 해주세요."
                    ],
                    [
                        "Can you see my screen?",
                        "선생님 화면이 잘 보이나요?"
                    ],
                    [
                        "I can see your screen. / I can’t see your screen.",
                        "잘 보여요 / 잘 안 보여요"
                    ],
                    [
                        "Please unmute your microphone.",
                        "마이크를 켜주세요."
                    ],
                    [
                        "Just a moment.",
                        "잠시 기다려 주세요."
                    ],
                    [
                        "I'll contact Elsa.",
                        "Elsa에게 연락할게요.",
                        "Elsa"
                    ]
                ]
            )
        },

        "fd01-2": {
            title: "Asking",
            highlight: "Questions",

            cards: createTextDeck(
                "Asking Questions",

                [
                    [
                        "say",
                        "말하다"
                    ],
                    [
                        "mean",
                        "의미하다"
                    ],
                    [
                        "check",
                        "확인하다"
                    ],
                    [
                        "correct",
                        "맞는, 정확한"
                    ]
                ],

                [
                    [
                        "Can you ask me in English?",
                        "영어로 질문해 주세요."
                    ],
                    [
                        "How do you say 말미잘 in English?",
                        "말미잘을 영어로 뭐라고 하나요?",
                        "말미잘"
                    ],
                    [
                        "In English, we say sea anemone.",
                        "영어로 sea anemone라고 말해요.",
                        "sea anemone"
                    ],
                    [
                        "What does trapezoid mean?",
                        "trapezoid는 무슨 뜻이에요?",
                        "trapezoid"
                    ],
                    [
                        "Trapezoid means 사다리꼴 in Korean.",
                        "Trapezoid는 사다리꼴이라는 뜻이에요.",
                        [
                            "Trapezoid",
                            "사다리꼴"
                        ]
                    ],
                    [
                        "Is this correct?",
                        "이거 맞나요?"
                    ]
                ]
            )
        },

        "fd01-3": {
            title: "Asking for",
            highlight: "Help",

            cards: createTextDeck(
                "Asking for Help",

                [
                    [
                        "help",
                        "돕다"
                    ],
                    [
                        "next",
                        "다음"
                    ],
                    [
                        "show",
                        "보여주다"
                    ],
                    [
                        "work",
                        "작동하다"
                    ]
                ],

                [
                    [
                        "Can you show me again?",
                        "다시 보여주실 수 있나요?"
                    ],
                    [
                        "Let me show you again.",
                        "다시 보여줄게요."
                    ],
                    [
                        "Watch my screen carefully.",
                        "선생님 화면 잘 보세요."
                    ],
                    [
                        "I can't find it.",
                        "잘 못 찾겠어요."
                    ],
                    [
                        "It’s not working.",
                        "잘 작동하지 않아요."
                    ],
                    [
                        "Can you help me?",
                        "도와주실 수 있나요?"
                    ],
                    [
                        "Let me help you.",
                        "선생님이 도와줄게요."
                    ],
                    [
                        "Can you say that again?",
                        "한 번 더 말씀해 주실 수 있나요?"
                    ]
                ]
            )
        },

        "fd01-4": {
            title: "Class Participation",
            highlight: "& Response",

            cards: createTextDeck(
                "Class Participation & Response",

                [
                    [
                        "done",
                        "완료한"
                    ],
                    [
                        "first",
                        "첫 번째"
                    ],
                    [
                        "raise",
                        "들다"
                    ]
                ],

                [
                    [
                        "Who wants to go first?",
                        "누가 먼저 해볼까요?"
                    ],
                    [
                        "If you’re done, raise your hand.",
                        "완료했다면 손을 들어주세요."
                    ],
                    [
                        "I’m done. What should I do next?",
                        "저 다 했어요. 다음에는 뭘 하면 될까요?"
                    ],
                    [
                        "If you’re done, let me know.",
                        "완료했다면 선생님에게 알려주세요."
                    ],
                    [
                        "I'm not ready. Can I go next?",
                        "아직 준비가 안 됐어요. 다음번에 해도 될까요?"
                    ]
                ]
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
                        "원을 그려보세요."
                    ],
                    [
                        "Select the triangle.",
                        "삼각형을 선택하세요."
                    ],
                    [
                        "Click on the rounded rectangle.",
                        "둥근 사각형을 클릭하세요."
                    ],
                    [
                        "Drag it to the center.",
                        "가운데로 드래그 하세요."
                    ],
                    [
                        "Move it to the left / right.",
                        "왼쪽 / 오른쪽으로 움직이세요.",
                        "left / right"
                    ],
                    [
                        "Move it up / down.",
                        "위 / 아래로 움직이세요.",
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
                        "사각형을 더 크게 만들어 보세요.",
                        "bigger"
                    ],
                    [
                        "Make the circle smaller.",
                        "원을 더 작게 만들어 보세요.",
                        "smaller"
                    ],
                    [
                        "Move the corner to resize it.",
                        "꼭지점을 움직여서 사이즈를 조절해 주세요.",
                        "resize"
                    ],
                    [
                        "Hold Shift to keep the same shape.",
                        "시프트키를 누르면 같은 모양을 유지할 수 있어요.",
                        "Shift"
                    ],
                    [
                        "Hold Shift to make a perfect circle.",
                        "시프트키를 누르면 정원을 만들 수 있어요.",
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
                        "시계 방향으로 회전해 볼게요."
                    ],
                    [
                        "Rotate it anticlockwise.",
                        "반시계 방향으로 회전해 볼게요."
                    ],
                    [
                        "Flip it horizontally.",
                        "수평 방향 반전해 볼게요."
                    ],
                    [
                        "Flip it vertically.",
                        "수직 방향 반전해 볼게요."
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
                        "컨트롤/커맨드키 + 알파벳 G 눌러서 그룹해 볼게요.",
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
        },
        "fd03-1": {
            title: "Value",
            highlight: "(Lightness)",

            cards: createTextDeck(
                "Value",

                [
                    ["value", "명도"],
                    ["light", "밝은, 연한"],
                    ["dark", "어두운"],
                    ["bright", "밝고 빛나는"],
                    ["calm", "차분한"]
                ],

                [
                    [
                        "Value is the lightness of a color.",
                        "색의 명도는 색의 밝기를 나타냅니다.",
                        "lightness"
                    ],
                    [
                        "High value colors are light.",
                        "명도가 높은 색은 밝습니다.",
                        "High value"
                    ],
                    [
                        "Low value colors are dark.",
                        "명도가 낮은 색은 어둡습니다.",
                        "Low value"
                    ],
                    [
                        "My circle is high value. It feels bright.",
                        "내 원은 명도가 높아요. 밝고 환하게 느껴집니다.",
                        "circle"
                    ],
                    [
                        "This star is low value. It feels dark and calm.",
                        "이 별은 명도가 낮아요. 어둡고 차분하게 느껴집니다.",
                        "star"
                    ],
                    [
                        "The rectangle is brighter than the triangle.",
                        "사각형이 삼각형보다 더 밝습니다.",
                        [
                        "rectangle",
                            ]
                    ]
                ]
            )
        },
        "fd03-2": {
            title: "",
            highlight: "Chroma",

            cards: createTextDeck(
                "Chroma",

                [
                    ["chroma", "채도"],
                    ["saturation", "채도"],
                    ["vivid", "선명한"],
                    ["intense", "강렬한"],
                    ["muted", "탁한"],
                    ["dull", "흐린"]
                ],

                [
                    [
                        "Chroma shows how intense a color is.",
                        "채도는 색의 강도를 나타냅니다.",
                        "intense"
                    ],
                    [
                        "High chroma colors are bright, vivid, and strong.",
                        "채도가 높은 색은 밝고 선명하며 강렬합니다.",
                        "High chroma"
                    ],
                    [
                        "Low chroma colors are dull, muted, and closer to gray.",
                        "채도가 낮은 색은 흐리고 탁하며 회색에 가깝습니다.",
                        "Low chroma"
                    ],
                    [
                        "My heart is high chroma. It looks vivid and strong.",
                        "내 하트는 채도가 높아요. 선명하고 강하게 보여요.",
                        "heart"
                    ],
                    [
                        "This triangle is low chroma. It feels muted and soft.",
                        "이 삼각형은 채도가 낮아요. 탁하고 부드럽게 느껴집니다.",
                        "triangle"
                    ],
                    [
                        "The circle is more vivid than the square.",
                        "원이 사각형보다 더 선명합니다.",
                        [
                        "circle",
                    ]
                ]
            )
        },
        "fd03-3": {
            title: "Color",
            highlight: "Temperature",

            cards: createTextDeck(
                "Color Temperature",

                [
                    ["temperature", "온도"],
                    ["warm", "따뜻한"],
                    ["cool", "차가운"],
                    ["neutral", "중립적인"]
                ],

                [
                    [
                        "Warm colors are red, orange, and yellow.",
                        "따뜻한 색은 빨강, 주황, 노랑입니다.",
                        "Warm colors"
                    ],
                    [
                        "Cool colors are blue and green.",
                        "차가운 색은 파랑과 초록입니다.",
                        "Cool colors"
                    ],
                    [
                        "Neutral colors are gray and beige.",
                        "중립적인 색은 회색과 베이지입니다.",
                        "Neutral colors"
                    ],
                    [
                        "They change depending on the colors around them.",
                        "주변 색상에 따라 색의 느낌이 달라집니다.",
                        "depending on"
                    ],
                    [
                        "Red usually feels warm.",
                        "빨강은 일반적으로 따뜻하게 느껴집니다.",
                        "warm"
                    ],
                    [
                        "Blue usually feels cool.",
                        "파랑은 일반적으로 차갑게 느껴집니다.",
                        "cool"
                    ],
                    [
                        "Red feels warmer than blue.",
                        "빨강이 파랑보다 더 따뜻하게 느껴집니다.",
                        "warmer"
                    ]
                ]
            )
        },
        "fd03-4": {
            title: "",
            highlight: "Contrast",

            cards: createTextDeck(
                "Contrast",

                [
                    ["contrast", "대비"],
                    ["stand out", "돋보이다"],
                    ["similar", "비슷하다"],
                    ["subtle", "은은한"]
                ],

                [
                    [
                        "Contrast shows how different two colors are.",
                        "대비는 두 색이 얼마나 다른지 보여줍니다.",
                        "Contrast"
                    ],
                    [
                        "High contrast makes the colors stand out strongly.",
                        "대비가 강하면 색이 뚜렷하게 돋보입니다.",
                        "stand out"
                    ],
                    [
                        "Low contrast makes the colors look similar and subtle.",
                        "대비가 약하면 색이 비슷하고 은은하게 보입니다.",
                        "subtle"
                    ],
                    [
                        "This yellow circle and blue square have high contrast.",
                        "이 노란 원과 파란 사각형은 대비가 강합니다.",
                        "circle",
                    ],
                    [
                        "These two greens have low contrast.",
                        "이 두 개의 초록은 대비가 약합니다.",
                        "low contrast"
                    ]
                ]
            )
        } /* 중괄호 바로 다음에 콤마(,) 1개 넣기*/

        /* ========================================
           FD 4강 자료 붙여넣기👇
        ======================================== */

        
        /* ========================================
           FD 5강 자료 붙여넣기👇
        ======================================== */

        
        /* ========================================
           FD 6강 자료 붙여넣기👇
        ======================================== */

        
        /* ========================================
           FD 7강 자료 붙여넣기👇
        ======================================== */
        
        
        /* ========================================
           FD 8강 자료 붙여넣기👇
        ======================================== */

        
        /* ========================================
           FD 9강 자료 붙여넣기👇
        ======================================== */
        
        
        /* ========================================
           FD 10강 자료 붙여넣기👇
        ======================================== */
        
        
        /* ========================================
           FD 11강 자료 붙여넣기👇
        ======================================== */
        
        
        /* ========================================
           FD 12강 자료 붙여넣기👇
        ======================================== */
    };
})();
