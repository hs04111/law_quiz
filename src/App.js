import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

const quizData = [
  {
    question: "React는 ___ 라이브러리이다.",
    options: ["UI", "Backend", "Database"],
    answer: "UI",
  },
  {
    question: "JSX는 ___를 의미한다.",
    options: ["JavaScript XML", "Java Syntax Extension", "Java Server XML"],
    answer: "JavaScript XML",
  },
  {
    question: "useState는 ___를 관리한다.",
    options: ["상태", "UI", "CSS"],
    answer: "상태",
  },
  {
    question: "React에서 컴포넌트는 ___이다.",
    options: ["함수", "HTML 태그", "CSS"],
    answer: "함수",
  },
  {
    question: "React의 Virtual DOM은 ___를 의미한다.",
    options: ["가상 UI", "가상 메모리", "가상 데이터베이스"],
    answer: "가상 UI",
  },
];

function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [typedText, setTypedText] = useState("");

  // 랜덤으로 선택된 문제 배열
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const introText =
    "React와 Tailwind를 활용한 퀴즈 앱입니다. 이 앱은 React의 기본 개념을 복습하기 위해 제작되었습니다. 총 5개의 문제 중 랜덤으로 3개의 문제가 출제됩니다. 재미있게 즐겨주세요!";

  const resultRef = useRef(null);

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

  // 문제 시작 시 랜덤 3개 선택
  const startQuiz = () => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setSelectedQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentScreen("quiz");
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === selectedQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    // 2번 문제(인덱스 1)로 넘어가기 전에 50% 확률로 error 화면 전환
    // 즉, 현재 문제 인덱스가 0에서 1로 넘어갈 때 에러 발생 체크
    if (nextQuestionIndex === 1) {
      if (Math.random() < 0.5) {
        // 50% 확률로 에러 화면
        setCurrentScreen("error");
        return;
      }
    }

    // 그 외 정상 진행
    if (nextQuestionIndex < selectedQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // 모든 선택 문제를 다 풀면 결과 화면으로
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 소개 화면 */}
      {currentScreen === "intro" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            퀴즈 풀기 앱에 오신 것을 환영합니다!
          </h1>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap">{typedText}</p>
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
          <h2 className="text-xl font-bold mb-4">
            {selectedQuestions[currentQuestionIndex]?.question.replace(
              "___",
              "_____"
            )}
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
            backgroundImage: 'url("/background.jpg")', // 이미지 경로 설정
            backgroundSize: "cover", // 이미지가 화면을 가득 채우도록 설정
            backgroundPosition: "center", // 이미지 중앙 정렬
            backgroundRepeat: "no-repeat", // 이미지 반복 없음
          }}
        >
          <h2 className="text-2xl font-bold mb-4">
            문제가 발생하여 퀴즈를 종료합니다
          </h2>
          <button
            onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
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
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 mr-2"
          >
            공유하기
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
