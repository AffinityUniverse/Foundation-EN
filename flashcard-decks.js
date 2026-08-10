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
     *
     * 각 카드의 세 번째 값에는 강조할 문자열 또는
     * 여러 강조어가 담긴 배열을 넣을 수 있습니다.
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

            /*
             * 문자열이면 문자열 그대로,
             * 배열이면 배열 그대로 전달합니다.
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

        /* ========================================
           FD03-1 · Value
        ======================================== */

        "fd03-1": {
            title: "Value",
            highlight: "(Lightness)",

            cards: createTextDeck(
                "Value",

                [
                    [
                        "value",
                        "명도"
                    ],
                    [
                        "light",
                        "밝은, 연한"
                    ],
                    [
                        "dark",
                        "어두운"
                    ],
                    [
                        "bright",
                        "밝고 빛나는"
                    ],
                    [
                        "calm",
                        "차분한"
                    ]
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
                        "The rectangle is lighter than the triangle.",
                        "사각형이 삼각형보다 더 밝습니다.",
                        [
                            "rectangle",
                            "triangle"
                        ]
                    ]
                ]
            )
        },

        /* ========================================
           FD03-2 · Chroma
        ======================================== */

        "fd03-2": {
            title: "",
            highlight: "Chroma",

            cards: createTextDeck(
                "Chroma",

                [
                    [
                        "chroma",
                        "채도"
                    ],
                    [
                        "saturation",
                        "채도"
                    ],
                    [
                        "vivid",
                        "선명한"
                    ],
                    [
                        "intense",
                        "강렬한"
                    ],
                    [
                        "muted",
                        "탁한"
                    ],
                    [
                        "dull",
                        "흐린"
                    ]
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
                            "square"
                        ]
                    ]
                ]
            )
        },

        /* ========================================
           FD03-3 · Color Temperature
        ======================================== */

        "fd03-3": {
            title: "Color",
            highlight: "Temperature",

            cards: createTextDeck(
                "Color Temperature",

                [
                    [
                        "temperature",
                        "온도"
                    ],
                    [
                        "warm",
                        "따뜻한"
                    ],
                    [
                        "cool",
                        "차가운"
                    ],
                    [
                        "neutral",
                        "중립적인"
                    ]
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

        /* ========================================
           FD03-4 · Contrast
        ======================================== */

        "fd03-4": {
            title: "",
            highlight: "Contrast",

            cards: createTextDeck(
                "Contrast",

                [
                    [
                        "contrast",
                        "대비"
                    ],
                    [
                        "stand out",
                        "돋보이다"
                    ],
                    [
                        "similar",
                        "비슷하다"
                    ],
                    [
                        "subtle",
                        "은은한"
                    ]
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
                        [
                            "circle",
                            "square"
                        ]
                    ],
                    [
                        "These two greens have low contrast.",
                        "이 두 개의 초록은 대비가 약합니다.",
                        "low contrast"
                    ]
                ]
            )
        },

        /* ========================================
           FD04
        ======================================== */
        "fd04-1": {
            title: "RGB vs. CMYK",
            highlight: "",

            cards: createTextDeck(
                "RGB vs. CMYK",

                [
                    [
                        "format",
                        "형식"
                    ],
                    [
                        "stand for",
                        "~을 뜻하다"
                    ],
                    [
                        "screen",
                        "화면"
                    ],
                    [
                        "print",
                        "인쇄"
                    ]
                ],

                [
                    [
                        "We have to decide which color format to use.",
                        "어떤 색상 형식을 사용할지 결정해야 합니다."
                    ],
                    [
                        "Have you ever heard of RGB before?",
                        "RGB에 대해 들어본 적이 있나요?"
                    ],
                    [
                        "What do you think it means?",
                        "무슨 뜻이라고 생각하나요?"
                    ],
                    [
                        "Let’s compare that with another system.",
                        "다른 색상 시스템과 비교해 봅시다."
                    ],
                    [
                        "RGB is used for screens, and CMYK is used for print.",
                        "RGB는 화면에 사용되고, CMYK는 인쇄에 사용됩니다."
                    ],
                    [
                        "RGB stands for Red, Green and Blue.",
                        "RGB는 Red, Green, Blue를 뜻합니다."
                    ],
                    [
                        "CMYK stands for cyan, magenta, yellow and black.",
                        "CMYK는 cyan, magenta, yellow, black을 뜻합니다."
                    ]
                ]
            )
        },

        "fd04-2": {
            title: "Red & Yellow",
            highlight: "",

            cards: createTextDeck(
                "Red & Yellow",

                [
                    [
                        "remind",
                        "떠올리게 하다"
                    ],
                    [
                        "grab attention",
                        "시선을 끌다"
                    ],
                    [
                        "bold",
                        "대담한"
                    ],
                    [
                        "intensity",
                        "강렬함, 강도"
                    ],
                    [
                        "hope",
                        "희망"
                    ],
                    [
                        "positive",
                        "긍정적인"
                    ],
                    [
                        "cheerful",
                        "밝고 활기찬"
                    ],
                    [
                        "attract",
                        "끌다"
                    ],
                    [
                        "friendly",
                        "친근한"
                    ]
                ],

                [
                    [
                        "When you see red, what comes to your mind?",
                        "빨간색을 보면 무엇이 떠오르나요?"
                    ],
                    [
                        "And how does it feel?",
                        "그리고 어떤 느낌인가요?"
                    ],
                    [
                        "It stands out very easily, and it grabs our attention quickly.",
                        "빨간색은 쉽게 눈에 띄고 빠르게 우리의 시선을 끕니다."
                    ],
                    [
                        "That’s why red is often used in warning signs and brand logos.",
                        "그래서 빨간색은 경고 표지판과 브랜드 로고에 자주 사용됩니다."
                    ],
                    [
                        "Red helps the brand feel bold, strong, and memorable.",
                        "빨간색은 브랜드를 대담하고 강하며 기억에 남게 느껴지도록 합니다."
                    ],
                    [
                        "Red reminds me of tomatoes, apples, and hearts.",
                        "빨간색은 토마토, 사과, 하트를 떠올리게 합니다."
                    ],
                    [
                        "Red gives us the feeling of energy, power, and intensity.",
                        "빨간색은 에너지, 힘, 강렬함의 느낌을 줍니다."
                    ],
                    [
                        "What does yellow remind you of?",
                        "노란색을 보면 무엇이 떠오르나요?"
                    ],
                    [
                        "Yellow is often connected to happiness, hope, and positive energy.",
                        "노란색은 행복, 희망, 긍정적인 에너지와 자주 연결됩니다."
                    ],
                    [
                        "Yellow can also attract attention, but it feels more friendly.",
                        "노란색도 시선을 끌 수 있지만 더 친근하게 느껴집니다."
                    ],
                    [
                        "Yellow reminds me of lemons, a school bus, and the sun.",
                        "노란색은 레몬, 스쿨버스, 태양을 떠올리게 합니다."
                    ],
                    [
                        "Yellow feels bright, cheerful, and warm.",
                        "노란색은 밝고 활기차며 따뜻하게 느껴집니다."
                    ]
                ]
            )
        },

        "fd04-3": {
            title: "Blue & Pink",
            highlight: "",

            cards: createTextDeck(
                "Blue & Pink",

                [
                    [
                        "global",
                        "세계적인"
                    ],
                    [
                        "trust",
                        "신뢰"
                    ],
                    [
                        "reliability",
                        "신뢰성"
                    ],
                    [
                        "refreshing",
                        "상쾌한"
                    ],
                    [
                        "sweet",
                        "달콤한"
                    ],
                    [
                        "soft",
                        "부드러운"
                    ],
                    [
                        "lovable",
                        "사랑스러운"
                    ],
                    [
                        "stylish",
                        "세련된"
                    ],
                ],

                [
                    [
                        "Blue is one of the most liked colors in the world.",
                        "파란색은 세계에서 가장 선호되는 색 중 하나입니다."
                    ],
                    [
                        "It is one of the most commonly used colors in global branding.",
                        "파란색은 글로벌 브랜딩에서 가장 흔히 사용되는 색 중 하나입니다."
                    ],
                    [
                        "Blue often gives people a feeling of trust and reliability.",
                        "파란색은 사람들에게 신뢰와 믿음직한 느낌을 자주 줍니다."
                    ],
                    [
                        "That’s why many banks and tech companies use blue.",
                        "그래서 많은 은행과 기술 기업이 파란색을 사용합니다."
                    ],
                    [
                        "Blue reminds me of the sky, ocean, and ice.",
                        "파란색은 하늘, 바다, 얼음을 떠올리게 합니다."
                    ],
                    [
                        "Blue feels cool, calm, and refreshing.",
                        "파란색은 시원하고 차분하며 상쾌하게 느껴집니다."
                    ],
                    [
                        "Pink is often used in beauty brands, fashion brands, or dessert brands because it feels sweet and lovable.",
                        "분홍색은 달콤하고 사랑스럽게 느껴져 뷰티, 패션, 디저트 브랜드에 자주 사용됩니다."
                    ],
                    [
                        "Pink can also feel stylish, modern, and even strong, depending on the design.",
                        "분홍색은 디자인에 따라 세련되고 현대적이며 때로는 강하게 느껴질 수도 있습니다."
                    ],
                    [
                        "Pink reminds me of cotton candy and sweets.",
                        "분홍색은 솜사탕과 달콤한 간식을 떠올리게 합니다."
                    ],
                    [
                        "Pink usually feels soft, warm, and friendly.",
                        "분홍색은 보통 부드럽고 따뜻하며 친근하게 느껴집니다."
                    ]
                ]
            )
        },

        "fd04-4": {
            title: "Black & White",
            highlight: "",

            cards: createTextDeck(
                "Black & White",

                [
                    [
                        "strong",
                        "강한"
                    ],
                    [
                        "elegant",
                        "우아한"
                    ],
                    [
                        "luxurious",
                        "고급스러운"
                    ],
                    [
                        "premium",
                        "프리미엄의"
                    ],
                    [
                        "powerful",
                        "강력한"
                    ]
                ],

                [
                    [
                        "What does black remind you of?",
                        "검은색을 보면 무엇이 떠오르나요?"
                    ],
                    [
                        "And how does it feel?",
                        "그리고 어떤 느낌인가요?"
                    ],
                    [
                        "That’s why black is very common in fashion, premium products, and luxury brands.",
                        "그래서 검은색은 패션, 프리미엄 제품, 럭셔리 브랜드에서 매우 흔하게 사용됩니다."
                    ],
                    [
                        "When designers combine black and gold, the design often looks even more luxurious and premium.",
                        "디자이너가 검은색과 금색을 조합하면 디자인이 더 고급스럽고 프리미엄하게 보이는 경우가 많습니다."
                    ],
                    [
                        "Black reminds me of night, a shadow, and a cat.",
                        "검은색은 밤, 그림자, 고양이를 떠올리게 합니다."
                    ],
                    [
                        "Black often feels strong, elegant, and luxurious.",
                        "검은색은 강하고 우아하며 고급스럽게 느껴지는 경우가 많습니다."
                    ]
                ]
            )
        },

        /* ========================================
           FD05
        ======================================== */
        "fd05-1": {
            title: "Serif",
            highlight: "",

            cards: createTextDeck(
                "Serif",

                [
                    [
                        "serif",
                        "세리프"
                    ],
                    [
                        "stroke",
                        "획"
                    ],
                    [
                        "classic",
                        "클래식한"
                    ],
                    [
                        "elegant",
                        "우아한"
                    ],
                    [
                        "formal",
                        "격식 있는"
                    ],
                    [
                        "readable",
                        "읽기 쉬운"
                    ]
                ],

                [
                    [
                        "A serif font has tiny finishing strokes at the ends of the letters.",
                        "세리프 폰트는 글자 끝에 작은 마무리 획이 있습니다."
                    ],
                    [
                        "Those little finishing parts are called serifs.",
                        "그 작은 마무리 부분을 세리프라고 합니다."
                    ],
                    [
                        "What does this serif font feel like?",
                        "이 세리프 폰트는 어떤 느낌인가요?"
                    ],
                    [
                        "Serif fonts are often used in books, newspapers, and long texts because they are readable.",
                        "세리프 폰트는 읽기 쉬워 책, 신문, 긴 글에 자주 사용됩니다."
                    ],
                    [
                        "Times New Roman is a serif font.",
                        "Times New Roman은 세리프 폰트입니다."
                    ],
                    [
                        "It feels fancy, serious, classic, old-fashioned, elegant, and formal.",
                        "고급스럽고 진지하며 클래식하고 전통적이며 우아하고 격식 있게 느껴집니다."
                    ]
                ]
            )
        },

        "fd05-2": {
            title: "Sans Serif",
            highlight: "",

            cards: createTextDeck(
                "Sans Serif",

                [
                    [
                        "sans serif",
                        "산세리프"
                    ],
                    [
                        "clean",
                        "깔끔한"
                    ],
                    [
                        "modern",
                        "현대적인"
                    ],
                    [
                        "simple",
                        "단순한"
                    ]
                ],

                [
                    [
                        "The word sans means without.",
                        "sans라는 단어는 ‘~이 없는’이라는 뜻입니다."
                    ],
                    [
                        "Sans serif letters don’t have finishing strokes.",
                        "산세리프 글자는 끝에 마무리 획이 없습니다."
                    ],
                    [
                        "What feels different about a sans serif font?",
                        "산세리프 폰트는 어떤 점이 다르게 느껴지나요?"
                    ],
                    [
                        "They are used a lot in apps, websites, signs, posters, logos, and headings because they stand out clearly.",
                        "산세리프 폰트는 또렷하게 눈에 띄기 때문에 앱, 웹사이트, 표지판, 포스터, 로고, 제목에 많이 사용됩니다."
                    ],
                    [
                        "Arial is a sans serif font.",
                        "Arial은 산세리프 폰트입니다."
                    ],
                    [
                        "It often feels clean, modern, simple, and direct.",
                        "깔끔하고 현대적이며 단순하고 직접적으로 느껴지는 경우가 많습니다."
                    ]
                ]
            )
        },

        "fd05-3": {
            title: "Script Fonts",
            highlight: "",

            cards: createTextDeck(
                "Script Fonts",

                [
                    [
                        "script",
                        "스크립트체"
                    ],
                    [
                        "handwriting",
                        "손글씨"
                    ],
                    [
                        "personal",
                        "개인적인"
                    ],
                    [
                        "stylish",
                        "세련된"
                    ],
                    [
                        "display",
                        "디스플레이 폰트"
                    ],
                    [
                        "bold",
                        "대담한"
                    ],
                    [
                        "playful",
                        "발랄한"
                    ],
                    [
                        "eye-catching",
                        "눈에 띄는"
                    ]
                ],

                [
                    [
                        "Script fonts look like handwriting.",
                        "스크립트 폰트는 손글씨처럼 보입니다."
                    ],
                    [
                        "How does a script font feel to you?",
                        "스크립트 폰트는 어떤 느낌이 드나요?"
                    ],
                    [
                        "They are often used in invitations, greeting cards, and signatures.",
                        "초대장, 축하 카드, 서명에 자주 사용됩니다."
                    ],
                    [
                        "Script fonts are not always easy to read.",
                        "스크립트 폰트가 항상 읽기 쉬운 것은 아닙니다."
                    ],
                    [
                        "Freestyle Script is a script font.",
                        "Freestyle Script는 스크립트 폰트입니다."
                    ],
                    [
                        "It often feels personal, warm, stylish, expressive, and soft.",
                        "개인적이고 따뜻하며 세련되고 표현력이 있으며 부드럽게 느껴지는 경우가 많습니다."
                    ],
                    [
                        "Display fonts are designed to stand out.",
                        "디스플레이 폰트는 눈에 띄도록 설계됩니다."
                    ],
                    [
                        "What does this display font feel like?",
                        "이 디스플레이 폰트는 어떤 느낌인가요?"
                    ],
                    [
                        "They are used for posters, packaging, or short eye-catching text.",
                        "포스터, 패키지, 짧고 눈에 띄는 텍스트에 사용됩니다."
                    ],
                    [
                        "Monofett is a display font.",
                        "Monofett는 디스플레이 폰트입니다."
                    ],
                    [
                        "It often feels bold, playful, unique, and cute.",
                        "대담하고 발랄하며 독특하고 귀엽게 느껴지는 경우가 많습니다."
                    ]
                ]
            )
        },

        "fd05-4": {
            title: "Font Family & Weight",
            highlight: "",

            cards: createTextDeck(
                "Font Family & Weight",

                [],

                [
                    [
                        "Fonts often come in a family with several weights.",
                        "폰트는 보통 여러 굵기를 가진 하나의 패밀리로 제공됩니다."
                    ],
                    [
                        "Examples include Light, Regular, Medium, Bold, and Extra Bold.",
                        "예를 들면 Light, Regular, Medium, Bold, Extra Bold가 있습니다."
                    ],
                    [
                        "Using one font family keeps the design consistent but allows emphasis.",
                        "하나의 폰트 패밀리를 사용하면 디자인의 통일감을 유지하면서도 강조를 줄 수 있습니다."
                    ],
                    [
                        "This text uses a bold weight. It stands out.",
                        "이 텍스트는 Bold 굵기를 사용해 눈에 잘 띕니다."
                    ],
                    [
                        "This text is regular weight. It looks balanced.",
                        "이 텍스트는 Regular 굵기라 균형 있게 보입니다."
                    ]
                ]
            )
        },

        /* ========================================
           FD06
        ======================================== */
        "fd06-1": {
            title: "TTF vs OTF",
            highlight: "",

            cards: createTextDeck(
                "TTF vs OTF",

                [
                    [
                        "format",
                        "형식"
                    ],
                    [
                        "character",
                        "문자"
                    ],
                    [
                        "feature",
                        "기능"
                    ],
                    [
                        "available",
                        "사용 가능한"
                    ]
                ],

                [
                    [
                        "TTF (TrueType Font) is very common and compatible.",
                        "TTF(TrueType Font)는 매우 일반적이고 호환성이 좋습니다."
                    ],
                    [
                        "OTF (OpenType Font) can include more font styles and special characters.",
                        "OTF(OpenType Font)는 더 많은 폰트 스타일과 특수 문자를 포함할 수 있습니다."
                    ],
                    [
                        "This gives designers more options when working with text.",
                        "이 때문에 디자이너는 텍스트 작업에서 더 많은 선택지를 가질 수 있습니다."
                    ],
                    [
                        "If both TTF and OTF are available, it is usually better to download the OTF file.",
                        "TTF와 OTF가 모두 있다면 보통 OTF 파일을 다운로드하는 것이 좋습니다."
                    ],
                    [
                        "OTF usually has more features.",
                        "OTF는 보통 더 많은 기능을 제공합니다."
                    ]
                ]
            )
        },

        "fd06-2": {
            title: "Weight option & letter spacing",
            highlight: "",

            cards: createTextDeck(
                "Weight option & letter spacing",

                [],

                [
                    [
                        "A bold word feels heavier and stronger.",
                        "굵은 글자는 더 묵직하고 강하게 느껴집니다."
                    ],
                    [
                        "A light word feels softer and more delicate.",
                        "가는 글자는 더 부드럽고 섬세하게 느껴집니다."
                    ],
                    [
                        "This is useful when you are making titles and subtitles.",
                        "이 차이는 제목과 부제목을 만들 때 유용합니다."
                    ],
                    [
                        "Letter spacing is the space between letters.",
                        "Letter spacing은 글자 사이의 간격입니다."
                    ],
                    [
                        "Watch how the word feels when you change the spacing.",
                        "간격을 바꿀 때 단어의 느낌이 어떻게 달라지는지 살펴보세요."
                    ],
                    [
                        "If the letters go too far apart, the word starts to feel broken.",
                        "글자 사이가 너무 멀어지면 단어가 끊어진 것처럼 느껴지기 시작합니다."
                    ],
                    [
                        "If the letters are too close, the word can feel crowded and hard to read.",
                        "글자 사이가 너무 가까우면 답답하고 읽기 어렵게 느껴질 수 있습니다."
                    ]
                ]
            )
        },

        "fd06-3": {
            title: "Line Spacing & All Caps",
            highlight: "",

            cards: createTextDeck(
                "Line Spacing & All Caps",

                [],

                [
                    [
                        "Line spacing means the space between two lines.",
                        "Line spacing은 두 줄 사이의 간격을 뜻합니다."
                    ],
                    [
                        "If the lines are too close, they can feel messy.",
                        "줄 간격이 너무 좁으면 복잡하게 느껴질 수 있습니다."
                    ],
                    [
                        "If the lines are too far apart, they can feel disconnected.",
                        "줄 간격이 너무 넓으면 서로 떨어져 보일 수 있습니다."
                    ],
                    [
                        "If you click All Caps, your text becomes all capital letters.",
                        "All Caps를 클릭하면 텍스트가 모두 대문자로 바뀝니다."
                    ]
                ]
            )
        },

        "fd06-4": {
            title: "Artistic Text Tool & Frame Text Tool",
            highlight: "",

            cards: createTextDeck(
                "Artistic Text Tool & Frame Text Tool",

                [],

                [
                    [
                        "The Artistic Text Tool feels free.",
                        "Artistic Text Tool은 자유롭게 다루는 느낌을 줍니다."
                    ],
                    [
                        "When you resize or move it, the letters inside also change size.",
                        "크기를 조절하거나 이동하면 안의 글자 크기도 함께 바뀝니다."
                    ],
                    [
                        "You can use it for names, headings, labels, or expressive text.",
                        "이름, 제목, 라벨, 표현적인 텍스트에 사용할 수 있습니다."
                    ],
                    [
                        "The Frame Text Tool is good for long text or paragraphs.",
                        "Frame Text Tool은 긴 글이나 문단에 적합합니다."
                    ],
                    [
                        "When you resize the frame, the letters stay the same size.",
                        "프레임 크기를 조절해도 글자 크기는 그대로 유지됩니다."
                    ],
                    [
                        "To make the letters bigger or smaller, you must select the text and change the size manually.",
                        "글자를 더 크게 또는 작게 만들려면 텍스트를 선택한 뒤 크기를 직접 변경해야 합니다."
                    ],
                    [
                        "This changes the text from editable text into image-like shapes.",
                        "이 기능은 편집 가능한 텍스트를 이미지처럼 다룰 수 있는 도형 형태로 바꿉니다."
                    ],
                    [
                        "Press Ctrl + Shift + G. This ungroups the letters.",
                        "Ctrl + Shift + G를 누르면 글자 그룹이 해제됩니다."
                    ],
                    [
                        "Once the text is an image, each letter can be moved or rotated separately.",
                        "텍스트가 이미지 형태가 되면 각 글자를 따로 이동하거나 회전할 수 있습니다."
                    ]
                ]
            )
        },

        /* ========================================
           FD07
        ======================================== */
        "fd07-1": {
            title: "Text Inside a Shape and Around a Shape",
            highlight: "",

            cards: createTextDeck(
                "Text Inside a Shape and Around a Shape",

                [
                    [
                        "appear",
                        "나타나다"
                    ],
                    [
                        "wrap",
                        "감싸다"
                    ],
                    [
                        "edge",
                        "가장자리"
                    ]
                ],

                [
                    [
                        "When the cursor appears inside the shape, type a short message.",
                        "커서가 도형 안에 나타나면 짧은 문장을 입력하세요."
                    ],
                    [
                        "When the text wraps inside the circle, you can see how text and shapes work together.",
                        "텍스트가 원 안에서 감싸지면 텍스트와 도형이 어떻게 함께 작동하는지 볼 수 있습니다."
                    ],
                    [
                        "This is useful for speech bubbles, badges, stickers, labels, and picture book design.",
                        "말풍선, 배지, 스티커, 라벨, 그림책 디자인에 유용합니다."
                    ],
                    [
                        "Slowly move your mouse outside the edge of the circle until the cursor changes.",
                        "커서가 바뀔 때까지 마우스를 원의 가장자리 바깥쪽으로 천천히 움직이세요."
                    ],
                    [
                        "Use the green triangle to move the text around the shape.",
                        "초록색 삼각형을 사용해 텍스트를 도형 주위로 이동하세요."
                    ],
                    [
                        "Use the red triangle to move the text inside or outside the shape.",
                        "빨간색 삼각형을 사용해 텍스트를 도형 안쪽이나 바깥쪽으로 이동하세요."
                    ],
                    [
                        "Draw one smooth wavy line across the page.",
                        "페이지를 가로지르는 부드러운 물결선을 하나 그리세요."
                    ],
                    [
                        "Watch how the words move with the curve.",
                        "글자가 곡선을 따라 어떻게 움직이는지 살펴보세요."
                    ],
                    [
                        "You can compare a straight title and a wavy title.",
                        "직선 제목과 물결 모양 제목을 비교해 볼 수 있습니다."
                    ],
                    [
                        "Which one feels more alive?",
                        "어느 쪽이 더 생동감 있게 느껴지나요?"
                    ]
                ]
            )
        },

        "fd07-2": {
            title: "Clipping Mask",
            highlight: "",

            cards: createTextDeck(
                "Clipping Mask",

                [],

                [
                    [
                        "A clipping mask means you only show the part you want.",
                        "클리핑 마스크는 원하는 부분만 보이게 하는 기능입니다."
                    ],
                    [
                        "It’s like cutting out just the area you need.",
                        "필요한 영역만 잘라내는 것과 비슷합니다."
                    ],
                    [
                        "Pick one image, but make sure the face and ears are clearly visible.",
                        "이미지 하나를 고르되 얼굴과 귀가 선명하게 보이는지 확인하세요."
                    ],
                    [
                        "Avoid images that are cut off.",
                        "중요한 부분이 잘린 이미지는 피하세요."
                    ]
                ]
            )
        },

        "fd07-3": {
            title: "Shape Clipping & Pen Tool",
            highlight: "",

            cards: createTextDeck(
                "Shape Clipping & Pen Tool",

                [],

                [
                    [
                        "The key is to drag it onto the thumbnail.",
                        "핵심은 오브젝트를 썸네일 위로 드래그하는 것입니다."
                    ],
                    [
                        "For the first point, just click once. Then keep clicking to create straight lines.",
                        "첫 번째 점은 한 번 클릭하고, 이어서 계속 클릭해 직선을 만드세요."
                    ],
                    [
                        "At the end, connect back to the first point.",
                        "마지막에는 첫 번째 점으로 다시 연결하세요."
                    ],
                    [
                        "If you use a clipping mask, you can hide the background and keep only the puppy.",
                        "클리핑 마스크를 사용하면 배경을 숨기고 강아지만 남길 수 있습니다."
                    ],
                    [
                        "For the second point, click and drag to control the curve.",
                        "두 번째 점에서는 클릭한 채 드래그해 곡선을 조절하세요."
                    ],
                    [
                        "Try moving your mouse slowly to see how the curve changes.",
                        "마우스를 천천히 움직이며 곡선이 어떻게 바뀌는지 확인해 보세요."
                    ],
                    [
                        "Click the red handle to reset the direction.",
                        "빨간 핸들을 클릭해 방향을 초기화하세요."
                    ],
                    [
                        "If you don’t do this, the next curve will follow the previous direction.",
                        "이렇게 하지 않으면 다음 곡선이 이전 방향을 따라갑니다."
                    ],
                    [
                        "It already looks smoother than before.",
                        "이미 전보다 더 부드럽게 보입니다."
                    ]
                ]
            )
        },

        "fd07-4": {
            title: "Eraser & Clipping mask in text",
            highlight: "",

            cards: createTextDeck(
                "Eraser & Clipping mask in text",

                [],

                [
                    [
                        "Use the bracket keys and adjust the brush size.",
                        "대괄호 키를 사용해 브러시 크기를 조절하세요."
                    ],
                    [
                        "It’s better to stop often and take your hand off the mouse.",
                        "자주 멈추고 마우스에서 손을 떼어 작업을 나누는 것이 좋습니다."
                    ],
                    [
                        "Drag it directly onto the text itself.",
                        "그 오브젝트를 텍스트 자체 위로 직접 드래그하세요."
                    ],
                    [
                        "You can also move it around to adjust how it looks.",
                        "위치를 옮기면서 보이는 방식을 조절할 수도 있습니다."
                    ]
                ]
            )
        },

        /* ========================================
           FD08
        ======================================== */
        "fd08-1": {
            title: "Duplicating and Text setting",
            highlight: "",

            cards: createTextDeck(
                "Duplicating and Text setting",

                [
                    [
                        "exact",
                        "정확한"
                    ],
                    [
                        "automatically",
                        "자동으로"
                    ],
                    [
                        "diagonally",
                        "대각선으로"
                    ],
                    [
                        "combine",
                        "결합하다"
                    ],
                    [
                        "used to",
                        "예전에는 ~였다"
                    ]
                ],

                [
                    [
                        "Make sure not to click anywhere else.",
                        "다른 곳을 클릭하지 않도록 주의하세요."
                    ],
                    [
                        "The program remembers the exact spacing and duplicates the circle automatically.",
                        "프로그램이 정확한 간격을 기억하고 원을 자동으로 복제합니다."
                    ],
                    [
                        "Let’s drag over this whole set of circles and make another copy diagonally.",
                        "이 원 묶음 전체를 드래그한 뒤 대각선 방향으로 하나 더 복제해 봅시다."
                    ],
                    [
                        "We’re going to combine them using the Add tool.",
                        "Add 도구를 사용해 이 도형들을 결합할 것입니다."
                    ],
                    [
                        "They used to be separate circles, but now they are fully combined into one!",
                        "원래는 각각 떨어진 원이었지만 이제 하나로 완전히 결합되었습니다!"
                    ],
                    [
                        "Choose something a little different from the circle color so it pops.",
                        "눈에 띄도록 원 색상과 조금 다른 색을 선택하세요."
                    ]
                ]
            )
        },

        "fd08-2": {
            title: "Thumbnail Mask and Stock Image",
            highlight: "",

            cards: createTextDeck(
                "Thumbnail Mask and Stock Image",

                [],

                [
                    [
                        "Since the pattern is going inside, the text layer will stay still.",
                        "패턴이 안쪽으로 들어가기 때문에 텍스트 레이어는 그대로 유지됩니다."
                    ],
                    [
                        "You'll see the pattern nested right inside the text layer.",
                        "패턴이 텍스트 레이어 안쪽에 중첩되어 들어간 것을 볼 수 있습니다."
                    ],
                    [
                        "We’re going to do the exact opposite.",
                        "이번에는 정확히 반대로 해보겠습니다."
                    ],
                    [
                        "Now the text is trapped inside the pattern shapes.",
                        "이제 텍스트가 패턴 도형 안에 들어가 보이게 됩니다."
                    ],
                    [
                        "We’re going to drag the pattern layer and drop it right onto that tiny square preview.",
                        "패턴 레이어를 드래그해 작은 사각형 미리보기 위에 바로 놓아 봅시다."
                    ],
                    [
                        "That little square is called the thumbnail.",
                        "그 작은 사각형을 썸네일이라고 합니다."
                    ],
                    [
                        "If you hover your mouse over it, it will actually say “clipping mask.”",
                        "마우스를 올리면 실제로 “clipping mask”라고 표시됩니다."
                    ],
                    [
                        "What kind of scenery are you into?",
                        "어떤 풍경을 좋아하나요?"
                    ],
                    [
                        "If it’s too big, we can scale it down a bit to fit.",
                        "너무 크다면 맞도록 조금 축소할 수 있습니다."
                    ],
                    [
                        "We are going to mask the background image inside our text!",
                        "배경 이미지를 텍스트 안에 마스킹해 보겠습니다!"
                    ]
                ]
            )
        },

        "fd08-3": {
            title: "Pencil & Crop tool",
            highlight: "",

            cards: createTextDeck(
                "Pencil & Crop tool",

                [],

                [
                    [
                        "We’re going to draw a line right across our “Affinity” text.",
                        "“Affinity” 텍스트를 가로지르는 선을 그려 보겠습니다."
                    ],
                    [
                        "Since the line isn't a closed shape, it doesn't need a fill anyway.",
                        "선은 닫힌 도형이 아니므로 Fill이 필요하지 않습니다."
                    ],
                    [
                        "Let's give this line some texture using a brush style.",
                        "브러시 스타일을 사용해 이 선에 질감을 더해 봅시다."
                    ],
                    [
                        "Feel free to test out as many as you want.",
                        "원하는 만큼 여러 스타일을 자유롭게 시험해 보세요."
                    ],
                    [
                        "You can click and drag these individual points to reshape the curve.",
                        "각 점을 클릭하고 드래그해 곡선 형태를 바꿀 수 있습니다."
                    ],
                    [
                        "Press Ctrl + J to make a duplicate copy directly on top of it.",
                        "Ctrl + J를 눌러 바로 위에 복제본을 만드세요."
                    ],
                    [
                        "Grab the blue boundary line at the bottom and slide it upward.",
                        "아래쪽의 파란 경계선을 잡고 위로 올리세요."
                    ],
                    [
                        "The Crop Tool simply hides or cuts away parts of your object.",
                        "Crop Tool은 오브젝트의 일부를 간단히 숨기거나 잘라냅니다."
                    ]
                ]
            )
        },

        "fd08-4": {
            title: "Shadow Effect & Divide",
            highlight: "",

            cards: createTextDeck(
                "Shadow Effect & Divide",

                [],

                [
                    [
                        "Try tapping the down arrow key a few times first.",
                        "먼저 아래쪽 화살표 키를 몇 번 눌러 보세요."
                    ],
                    [
                        "Do you see how everything has been broken up into separate little pieces?",
                        "모든 것이 각각의 작은 조각으로 나뉜 것이 보이나요?"
                    ],
                    [
                        "Click on those circle pieces sticking out on the sides and delete them.",
                        "양옆으로 튀어나온 원 조각을 클릭해 삭제하세요."
                    ],
                    [
                        "The big difference is that everything is permanently broken into many separate pieces.",
                        "가장 큰 차이는 모든 요소가 여러 개의 개별 조각으로 영구적으로 분리된다는 점입니다."
                    ]
                ]
            )
        },

        /* ========================================
           FD09
        ======================================== */
        "fd09-1": {
            title: "Bevel & Emboss & Outline & 3D",
            highlight: "",

            cards: createTextDeck(
                "Bevel & Emboss & Outline & 3D",

                [
                    [
                        "bevel",
                        "베벨, 모서리 경사"
                    ],
                    [
                        "emboss",
                        "엠보스, 양각"
                    ],
                    [
                        "radius",
                        "반경"
                    ],
                    [
                        "multiple",
                        "여러 개의"
                    ],
                    [
                        "Diffuse",
                        "확산"
                    ],
                    [
                        "Specular",
                        "정반사"
                    ],
                    [
                        "Shininess",
                        "광택"
                    ],
                    [
                        "dictate",
                        "결정하다"
                    ]
                ],

                [
                    [
                        "We can clearly see how our shape changes in real time as we tweak the settings.",
                        "설정을 조절할 때 도형이 실시간으로 어떻게 바뀌는지 선명하게 볼 수 있습니다."
                    ],
                    [
                        "Grab the Radius slider and move it back and forth.",
                        "Radius 슬라이더를 잡고 앞뒤로 움직여 보세요."
                    ],
                    [
                        "The effect is restricted to the inside of the shape.",
                        "효과는 도형의 안쪽에만 적용됩니다."
                    ],
                    [
                        "You’ll see the edges blend and become much smoother.",
                        "가장자리가 섞이면서 훨씬 부드러워지는 것을 볼 수 있습니다."
                    ],
                    [
                        "This controls where your light source is coming from.",
                        "이 설정은 광원이 어디에서 오는지 조절합니다."
                    ],
                    [
                        "Blend Mode controls how the outline color mixes with the background.",
                        "Blend Mode는 외곽선 색이 배경과 어떻게 섞이는지 조절합니다."
                    ],
                    [
                        "This allows you to create multiple outlines.",
                        "이 기능을 사용하면 여러 개의 외곽선을 만들 수 있습니다."
                    ],
                    [
                        "You’ll see the colors stacking on top of each other.",
                        "색이 서로 겹쳐 쌓이는 것을 볼 수 있습니다."
                    ],
                    [
                        "This one makes your shape look more like a 3D bead or a smooth little marble.",
                        "이 효과는 도형을 3D 구슬이나 매끄러운 작은 구슬처럼 보이게 합니다."
                    ],
                    [
                        "Diffuse basically controls how the light spreads across the surface.",
                        "Diffuse는 기본적으로 표면에 빛이 어떻게 퍼지는지 조절합니다."
                    ],
                    [
                        "Specular controls how strongly the light reflects off the surface, creating that glossy highlight.",
                        "Specular는 표면에서 빛이 얼마나 강하게 반사되는지 조절해 반짝이는 하이라이트를 만듭니다."
                    ],
                    [
                        "Shininess controls the size of that glossy spot.",
                        "Shininess는 반짝이는 부분의 크기를 조절합니다."
                    ],
                    [
                        "Direction dictates where your light source is coming from.",
                        "Direction은 광원이 어느 방향에서 오는지 결정합니다."
                    ]
                ]
            )
        },

        "fd09-2": {
            title: "Inner Shadow & Inner Glow",
            highlight: "",

            cards: createTextDeck(
                "Inner Shadow & Inner Glow",

                [],

                [
                    [
                        "For shadows, Blend Mode is usually set to “Multiply.”",
                        "그림자에는 보통 Blend Mode를 “Multiply”로 설정합니다."
                    ],
                    [
                        "For glows, it is usually set to “Screen.”",
                        "글로우에는 보통 “Screen”으로 설정합니다."
                    ],
                    [
                        "Feel free to experiment with different Blend Modes to see how they behave.",
                        "여러 Blend Mode를 자유롭게 시험해 보며 어떻게 작동하는지 확인하세요."
                    ],
                    [
                        "Offset controls how far the shadow travels from the edge.",
                        "Offset은 그림자가 가장자리에서 얼마나 멀리 이동하는지 조절합니다."
                    ],
                    [
                        "Intensity controls how sharp or hard the shadow looks.",
                        "Intensity는 그림자가 얼마나 선명하고 강하게 보이는지 조절합니다."
                    ],
                    [
                        "Inner Glow adds a beautiful, radiant glow inside your shape.",
                        "Inner Glow는 도형 안쪽에 밝게 퍼지는 글로우 효과를 더합니다."
                    ],
                    [
                        "If you select Center, the glowing light will radiate right out from the middle of your shape.",
                        "Center를 선택하면 빛이 도형의 중앙에서 바깥으로 퍼집니다."
                    ],
                    [
                        "If you choose Edge, the glow will hug the inner borders instead.",
                        "Edge를 선택하면 글로우가 도형 안쪽 가장자리를 따라 나타납니다."
                    ],
                    [
                        "It spreads evenly based on whether you choose Center or Edge.",
                        "Center 또는 Edge 선택에 따라 글로우가 고르게 퍼집니다."
                    ]
                ]
            )
        },

        "fd09-3": {
            title: "Color Overlay & Gradient Overlay",
            highlight: "",

            cards: createTextDeck(
                "Color Overlay & Gradient Overlay",

                [],

                [
                    [
                        "Color Overlay literally means placing another layer of color right on top of the original color.",
                        "Color Overlay는 원래 색 위에 또 하나의 색 레이어를 올리는 것을 뜻합니다."
                    ],
                    [
                        "That means you can stack multiple colors.",
                        "즉 여러 색을 겹쳐 쌓을 수 있습니다."
                    ],
                    [
                        "We can control how they mix using the Opacity slider.",
                        "Opacity 슬라이더로 색이 섞이는 정도를 조절할 수 있습니다."
                    ],
                    [
                        "At 100%, the overlay color completely covers the base.",
                        "100%에서는 오버레이 색이 기본 색을 완전히 덮습니다."
                    ],
                    [
                        "But if you lower the opacity, it starts blending with the original color underneath.",
                        "Opacity를 낮추면 아래의 원래 색과 섞이기 시작합니다."
                    ],
                    [
                        "With Gradient Overlay, your original background color stays safely underneath.",
                        "Gradient Overlay를 사용해도 원래 배경색은 아래에 그대로 유지됩니다."
                    ],
                    [
                        "If you slide it to the left, the gradient transition becomes sharper and tighter.",
                        "왼쪽으로 움직이면 그라디언트 전환이 더 선명하고 좁아집니다."
                    ],
                    [
                        "If you slide it to the right, it gets much softer and smoother.",
                        "오른쪽으로 움직이면 훨씬 부드럽고 매끄러워집니다."
                    ],
                    [
                        "Conical looks just like a 3D funnel or a cone from above.",
                        "Conical은 위에서 본 3D 깔때기나 원뿔처럼 보입니다."
                    ]
                ]
            )
        },

        "fd09-4": {
            title: "Outer glow & Outer shadow & Gaussian Blur",
            highlight: "",

            cards: createTextDeck(
                "Outer glow & Outer shadow & Gaussian Blur",

                [],

                [
                    [
                        "Outer Glow is a light effect that beams out from the outside of your shape.",
                        "Outer Glow는 도형 바깥쪽으로 빛이 퍼져 나가는 효과입니다."
                    ],
                    [
                        "Feel free to go higher with the Radius even more—try typing a big number directly into the box.",
                        "Radius 값을 더 크게 높여도 됩니다. 입력 상자에 큰 숫자를 직접 넣어 보세요."
                    ],
                    [
                        "If you turn up the Opacity, the shadow will get deeper and darker.",
                        "Opacity를 높이면 그림자가 더 진하고 어두워집니다."
                    ],
                    [
                        "Gaussian Blur is perfect for softening the edges and creating a smooth, blurry effect.",
                        "Gaussian Blur는 가장자리를 부드럽게 하고 매끄러운 블러 효과를 만드는 데 적합합니다."
                    ]
                ]
            )
        },

        /* ========================================
           FD10
        ======================================== */
        "fd10-1": {
            title: "Gradient tool & Changing Colors and Ratios",
            highlight: "",

            cards: createTextDeck(
                "Gradient tool & Changing Colors and Ratios",

                [],

                [
                    [
                        "Pressing G switches to the gradient tool.",
                        "G를 누르면 Gradient Tool로 전환됩니다."
                    ],
                    [
                        "You can apply the gradient freely depending on the direction you drag.",
                        "드래그하는 방향에 따라 그라디언트를 자유롭게 적용할 수 있습니다."
                    ],
                    [
                        "You can decide how dark or light you want it to be.",
                        "원하는 만큼 어둡거나 밝게 조절할 수 있습니다."
                    ],
                    [
                        "Try grabbing the line between two points and move it back and forth.",
                        "두 점 사이의 선을 잡고 앞뒤로 움직여 보세요."
                    ],
                    [
                        "You can adjust the balance between the two colors this way.",
                        "이 방법으로 두 색 사이의 비율을 조절할 수 있습니다."
                    ],
                    [
                        "Click that point and try changing the color.",
                        "그 점을 클릭하고 색을 바꿔 보세요."
                    ]
                ]
            )
        },

        "fd10-2": {
            title: "Adding a Point & Adjusting Opacity & Noise",
            highlight: "",

            cards: createTextDeck(
                "Adding a Point & Adjusting Opacity & Noise",

                [],

                [
                    [
                        "Now click anywhere on the gradient line.",
                        "이제 그라디언트 선 위의 아무 곳이나 클릭하세요."
                    ],
                    [
                        "You can add another point like this.",
                        "이렇게 새 점을 추가할 수 있습니다."
                    ],
                    [
                        "If you want to remove one, just press the Delete key.",
                        "점을 삭제하려면 Delete 키를 누르면 됩니다."
                    ],
                    [
                        "Opacity means transparency.",
                        "Opacity는 투명도를 뜻합니다."
                    ],
                    [
                        "You can adjust the transparency of the selected point like this.",
                        "이렇게 선택한 점의 투명도를 조절할 수 있습니다."
                    ],
                    [
                        "Click the small circle under opacity. It changes from opacity to noise.",
                        "Opacity 아래의 작은 원을 클릭하면 Opacity에서 Noise로 바뀝니다."
                    ],
                    [
                        "The area you selected gets a grainy texture.",
                        "선택한 영역에 거친 입자 질감이 생깁니다."
                    ],
                    [
                        "You can add noise to just one part using gradients.",
                        "그라디언트를 사용하면 특정 부분에만 Noise를 추가할 수 있습니다."
                    ]
                ]
            )
        },

        "fd10-3": {
            title: "Type – Linear & Elliptical & Radial & Conical & Mesh",
            highlight: "",

            cards: createTextDeck(
                "Type – Linear & Elliptical & Radial & Conical & Mesh",

                [],

                [
                    [
                        "“Linear” is the one we’ve been using, where the gradient goes in a straight line.",
                        "“Linear”는 지금까지 사용한 방식으로, 그라디언트가 직선 방향으로 진행됩니다."
                    ],
                    [
                        "When you drag, the gradient spreads in an oval shape like this.",
                        "드래그하면 그라디언트가 이렇게 타원형으로 퍼집니다."
                    ],
                    [
                        "So no matter which direction you go—left, right, up, or down—the ratio stays the same.",
                        "왼쪽, 오른쪽, 위, 아래 어느 방향으로 움직여도 비율은 동일하게 유지됩니다."
                    ],
                    [
                        "That’s why it looks like a sphere.",
                        "그래서 구처럼 보입니다."
                    ],
                    [
                        "The gradient flows like it’s gathering toward one point.",
                        "그라디언트가 한 점을 향해 모이는 것처럼 흐릅니다."
                    ],
                    [
                        "Then it becomes more like a funnel, with everything focusing on one point.",
                        "그러면 모든 것이 한 점에 모이면서 깔때기 같은 형태가 됩니다."
                    ],
                    [
                        "You can control the color exactly where you want it.",
                        "원하는 위치에서 색을 정확하게 조절할 수 있습니다."
                    ]
                ]
            )
        },

        "fd10-4": {
            title: "Outer glow & Outer shadow & Gaussian Blur",
            highlight: "",

            cards: createTextDeck(
                "Outer glow & Outer shadow & Gaussian Blur",

                [],

                [
                    [
                        "Outer Glow is a light effect that beams out from the outside of your shape.",
                        "Outer Glow는 도형 바깥쪽으로 빛이 퍼져 나가는 효과입니다."
                    ],
                    [
                        "Feel free to go higher with the Radius even more—try typing a big number directly into the box.",
                        "Radius 값을 더 크게 높여도 됩니다. 입력 상자에 큰 숫자를 직접 넣어 보세요."
                    ],
                    [
                        "If you turn up the Opacity, the shadow will get deeper and darker.",
                        "Opacity를 높이면 그림자가 더 진하고 어두워집니다."
                    ],
                    [
                        "Gaussian Blur is perfect for softening the edges and creating a smooth, blurry effect.",
                        "Gaussian Blur는 가장자리를 부드럽게 하고 매끄러운 블러 효과를 만드는 데 적합합니다."
                    ]
                ]
            )
        },


        /* ========================================
           FD 11강 자료 붙여넣기👇
        ======================================== */


        /* ========================================
           FD 12강 자료 붙여넣기👇
        ======================================== */
    };
})();
