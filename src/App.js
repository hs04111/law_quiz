import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

// 45개의 헌법 조항 관련 문제 예시
const quizData = [
  {
    question: "대한민국 헌법 제1조: 대한민국은 ___이다.",
    options: ["민주공화국", "입헌군주국", "사회주의국"],
    answer: "민주공화국",
  },
  {
    question:
      "대한민국 헌법 제3조: 대한민국의 영토는 ___와 그 부속도서로 한다.",
    options: ["한반도", "아프리카", "유라시아"],
    answer: "한반도",
  },
  {
    question:
      "대한민국 헌법 제4조: 대한민국은 ___을 지향하며, 자유민주적 기본질서에 입각한 평화적 통일정책을 수립하고 이를 추진한다.",
    options: ["통일", "분단", "전쟁"],
    answer: "통일",
  },
  {
    question:
      "대한민국 헌법 제6조: 헌법에 의하여 체결ㆍ공포된 조약과 일반적으로 승인된 국제법규는 ___과 같은 효력을 가진다.",
    options: ["국내법", "국제법", "관습법"],
    answer: "국내법",
  },
  {
    question:
      "대한민국 헌법 제7조: 공무원은 국민 전체에 대한 ___이며, 국민에 대하여 책임을 진다.",
    options: ["봉사자", "지도자", "방관자"],
    answer: "봉사자",
  },
  {
    question:
      "대한민국 헌법 제8조: 정당의 설립은 ___이며, 복수정당제는 보장된다.",
    options: ["자유", "허가제", "불법"],
    answer: "자유",
  },
  {
    question:
      "대한민국 헌법 제9조: 국가는 전통문화의 계승ㆍ발전과 ___의 창달에 노력하여야 한다.",
    options: ["민족문화", "외래문화", "배척문화"],
    answer: "민족문화",
  },
  {
    question:
      "대한민국 헌법 제10조: 모든 국민은 인간으로서의 ___를 가지며, 행복을 추구할 권리를 가진다.",
    options: ["존엄과 가치", "자전거", "휴대전화"],
    answer: "존엄과 가치",
  },
  {
    question: "대한민국 헌법 제11조: 모든 국민은 ___ 앞에 평등하다.",
    options: ["법", "정부", "사회"],
    answer: "법",
  },
  {
    question: "대한민국 헌법 제12조: 모든 국민은 신체의 ___을 가진다.",
    options: ["자유", "억압", "자랑"],
    answer: "자유",
  },
  {
    question:
      "대한민국 헌법 제13조: 모든 국민은 행위시의 ___에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다.",
    options: ["법률", "명령", "조례"],
    answer: "법률",
  },
  {
    question: "대한민국 헌법 제14조: 모든 국민은 ___의 자유를 가진다.",
    options: ["거주ㆍ이전", "출근시간", "부정청탁"],
    answer: "거주ㆍ이전",
  },
  {
    question: "대한민국 헌법 제22조: 모든 국민은 ___의 자유를 가진다.",
    options: ["학문과 예술", "마약", "아침 메뉴"],
    answer: "학문과 예술",
  },
  {
    question:
      "대한민국 헌법 제16조: 모든 국민은 ___의 자유를 침해받지 아니한다.",
    options: ["주거", "침략", "무단배출"],
    answer: "주거",
  },
  {
    question:
      "대한민국 헌법 제17조: 모든 국민은 ___의 비밀과 자유를 침해받지 아니한다.",
    options: ["사생활", "붕어빵가격", "내일 날씨"],
    answer: "사생활",
  },
  {
    question:
      "대한민국 헌법 제23조: 모든 국민의 재산권은 ___된다. 그 내용과 한계는 법률로 정한다.",
    options: ["보장", "불허", "마음대로"],
    answer: "보장",
  },
  {
    question: "대한민국 헌법 제24조: 모든 국민은 ___에 의하여 선거권을 가진다.",
    options: ["법률이 정하는 바", "고양이가 정하는 바", "대통령이 정하는 바"],
    answer: "법률이 정하는 바",
  },
  {
    question:
      "대한민국 헌법 제25조: 모든 국민은 ___에 의하여 공무담임권을 가진다.",
    options: ["법률이 정하는 바", "뽀삐가 정하는 바", "부모님이 정하는 바"],
    answer: "법률이 정하는 바",
  },
  {
    question:
      "대한민국 헌법 제27조: 모든 국민은 ___에 의하여 법관에 의한 재판을 받을 권리를 가진다.",
    options: ["헌법과 법률", "대통령령", "조례"],
    answer: "헌법과 법률",
  },
  {
    question:
      "대한민국 헌법 제29조: 공무원의 직무상 불법행위로 손해를 받은 국민은 ___에 따라 국가 또는 공공단체에 정당한 배상을 청구할 수 있다.",
    options: ["법률이 정하는 바", "기분에 따라", "대통령령에 따라"],
    answer: "법률이 정하는 바",
  },
  {
    question:
      "대한민국 헌법 제30조: 타인의 범죄행위로 인하여 생명, 신체에 피해를 받은 국민은 ___에 따라 국가로부터 구조를 받을 수 있다.",
    options: ["법률이 정하는 바", "재산에 따라", "날씨에 따라"],
    answer: "법률이 정하는 바",
  },
  {
    question:
      "대한민국 헌법 제31조: 모든 국민은 ___에 따라 균등하게 교육을 받을 권리를 가진다.",
    options: ["능력", "사회적 위치에 따라", "재산에 따라"],
    answer: "능력",
  },
  {
    question:
      "대한민국 헌법 제32조: 근로조건의 기준은 인간의 ___을 보장하도록 법률로 정한다.",
    options: ["불행", "존엄성", "부정청탁"],
    answer: "존엄성",
  },
  {
    question: "대한민국 헌법 제34조: 모든 국민은 ___을 가진다.",
    options: ["인간다운 생활을 할 권리", "불편함", "칫솔"],
    answer: "인간다운 생활을 할 권리",
  },
  {
    question:
      "대한민국 헌법 제36조: 혼인과 가족생활은 ___을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다.",
    options: ["개인의 존엄과 양성의 평등", "기분", "성적"],
    answer: "개인의 존엄과 양성의 평등",
  },

  // 추가된 문제들
  {
    question:
      "대한민국 헌법 제37조: 국민의 모든 자유와 권리는 ___에 의하여 제한될 수 있다.",
    options: [
      "국가안전보장, 질서유지 또는 공공복리",
      "붕어빵 가격",
      "대통령의 기분",
    ],
    answer: "국가안전보장, 질서유지 또는 공공복리",
  },
  {
    question: "대한민국 헌법 제40조: 입법권은 ___에 속한다.",
    options: ["국회", "정부", "헌법재판소"],
    answer: "국회",
  },
  {
    question:
      "대한민국 헌법 제66조: 대통령은 국가의 원수이며, ___에 대하여 국가를 대표한다.",
    options: ["곰국", "외국", "된장국"],
    answer: "외국",
  },
  {
    question:
      "대한민국 헌법 제70조: 대통령의 임기는 ___년으로 하며, 중임할 수 없다.",
    options: ["3", "5", "20"],
    answer: "5",
  },
  {
    question:
      "대한민국 헌법 제77조: 대통령은 ___, 사변 또는 이에 준하는 국가비상사태에 있어서 병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할 필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할 수 있다.",
    options: ["누군가의 분노", "전시", "불편함"],
    answer: "전시",
  },
  {
    question:
      "대한민국 헌법 제84조: 대통령은 ___ 또는 외환의 죄를 범한 경우를 제외하고는 재직 중 형사상의 소추를 받지 아니한다.",
    options: ["음주", "폭식", "내란"],
    answer: "내란",
  },
  {
    question: "대한민국 헌법 제101조: 사법권은 법관으로 구성된 ___에 속한다.",
    options: ["법원", "헌법재판소", "검찰청"],
    answer: "법원",
  },
  {
    question:
      "대한민국 헌법 제111조: 헌법재판소는 법관의 자격을 가진 ___의 재판관으로 구성하며, 재판관은 대통령이 임명한다.",
    options: ["9인", "11인", "7인"],
    answer: "9인",
  },
];

// 옵션 배열을 섞는 헬퍼 함수
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const resultRef = useRef(null);

  const introText =
    "헌법은 우리의 권리와 의무를 담고 있는 가장 중요한 법입니다. 하지만 헌법을 알고 계신가요? 재미있는 퀴즈로 헌법을 배우고, 나의 헌법 등급을 확인해보세요!";

  useEffect(() => {
    if (currentScreen === "intro") {
      const typingEffect = async () => {
        let currentText = "";
        for (let i = 0; i < introText.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          currentText += introText[i];
          setTypedText(currentText);
        }
      };
      setTypedText("");
      typingEffect();
    }
  }, [currentScreen]);

  // 퀴즈 시작
  const startQuiz = () => {
    // 전체 문제 중 랜덤 15개 문제 선택
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 15);

    // 각 문제의 options 섞기
    selected.forEach((question) => {
      question.options = shuffleArray([...question.options]);
    });

    setSelectedQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen("quiz");
  };

  // 정답 처리 및 화면 전환 로직
  const handleAnswer = (selectedOption) => {
    if (selectedOption === selectedQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    // 특정 문제 진입 전(2번째 문제) 50% 확률로 에러
    if (nextQuestionIndex >= 7 && Math.random() < 0.1) {
      setCurrentScreen("error");
      return;
    }

    if (nextQuestionIndex < selectedQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setCurrentScreen("result");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("http://bit.ly/3VAoUsB")
      .then(() => {
        alert("URL이 복사되었습니다");
      })
      .catch(() => {
        alert("URL 복사에 실패했습니다");
      });
  };

  const captureAndDownload = () => {
    if (!resultRef.current) return;
    html2canvas(resultRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "quiz_result.png";
      link.click();
    });
  };

  // 등급 계산 함수 (이미지 추가)
  function getGrade(score) {
    if (score >= 14) {
      return {
        title: "헌법의 수호자",
        description:
          "당신은 헌법의 진정한 수호자이며, 국민의 권리와 의무를 꿰뚫고 있습니다.",
        image: "4.png", // 가장 높은 등급 이미지
      };
    } else if (score >= 11) {
      return {
        title: "헌법 전문가",
        description: "거의 완벽합니다. 헌법에 대한 깊은 이해를 보여주셨습니다.",
        image: "3.png",
      };
    } else if (score >= 7) {
      return {
        title: "헌법 탐구자",
        description:
          "좋은 시도입니다! 헌법에 대한 이해가 있습니다. 조금 더 학습하면 전문가가 될 수 있어요!",
        image: "2.png",
      };
    } else {
      return {
        title: "헌법 초심자",
        description:
          "헌법의 첫걸음을 내디뎠습니다! 이제 조금씩 학습을 시작해보세요.",
        image: "1.png",
      };
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 소개 화면 */}
      {currentScreen === "intro" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            헌법 퀴즈에 오신 것을 환영합니다!
          </h1>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap leading-relaxed">
            {typedText}
          </p>
          <button
            onClick={startQuiz}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            시작하기
          </button>
        </div>
      )}

      {/* 퀴즈 화면 */}
      {currentScreen === "quiz" && selectedQuestions.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            문제 {currentQuestionIndex + 1} / {selectedQuestions.length}
          </p>
          <h2 className="text-xl font-bold mb-4">
            {selectedQuestions[currentQuestionIndex]?.question}
          </h2>
          <div className="space-y-2">
            {selectedQuestions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="block w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 에러 화면 */}
      {currentScreen === "error" && (
        <div
          className="text-center min-h-screen w-full flex flex-col items-center justify-center"
          style={{
            backgroundImage: 'url("/background.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h2 className="text-4xl font-bold mb-4 text-white bg-black bg-opacity-50">
            불법 계엄 상황 발생!
          </h2>
          <h2 className="text-2xl font-bold mb-4 text-white bg-black bg-opacity-50">
            계엄령 하에서 게임이 종료됩니다.
          </h2>
          <button
            onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
              setSelectedQuestions([]);
              setCurrentScreen("intro");
            }}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mt-4"
          >
            처음으로
          </button>
        </div>
      )}

      {/* 결과 화면 */}
      {currentScreen === "result" && (
        <div className="text-center" ref={resultRef}>
          <h2 className="text-2xl font-bold mb-4">퀴즈 완료!</h2>
          <p className="text-lg mb-4">
            당신의 점수는 {score} / {selectedQuestions.length}입니다.
          </p>
          {(() => {
            const { title, description, image } = getGrade(score);
            return (
              <>
                {/* 등급 이미지 표시 */}
                <img
                  src={image}
                  alt={title}
                  className="mx-auto mb-4"
                  style={{ maxWidth: "150px" }}
                />
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
              </>
            );
          })()}
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 mr-2"
          >
            퀴즈 공유하기
          </button>
          <button
            onClick={captureAndDownload}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600 mr-2"
          >
            이미지로 저장
          </button>
          <button
            onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
              setSelectedQuestions([]);
              setCurrentScreen("intro");
            }}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 mt-4"
          >
            처음으로 가기
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
