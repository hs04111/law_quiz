import React, { useState, useEffect } from 'react';

// 퀴즈 데이터: 문장 중간에 빈칸을 만들고 객관식 보기 제공
const quizData = [
  {
    question: "React는 ___ 라이브러리이다.",
    options: ["UI", "Backend", "Database"],
    answer: "UI"
  },
  {
    question: "JSX는 ___를 의미한다.",
    options: ["JavaScript XML", "Java Syntax Extension", "Java Server XML"],
    answer: "JavaScript XML"
  },
  {
    question: "useState는 ___를 관리한다.",
    options: ["상태", "UI", "CSS"],
    answer: "상태"
  },
  {
    question: "React에서 컴포넌트는 ___이다.",
    options: ["함수", "HTML 태그", "CSS"],
    answer: "함수"
  },
  {
    question: "React의 Virtual DOM은 ___를 의미한다.",
    options: ["가상 UI", "가상 메모리", "가상 데이터베이스"],
    answer: "가상 UI"
  },
];

function App() {
  // 현재 화면 상태를 관리 ("intro", "quiz", "result")
  const [currentScreen, setCurrentScreen] = useState("intro");
  // 현재 표시 중인 퀴즈 질문의 인덱스 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 사용자의 점수를 관리
  const [score, setScore] = useState(0);
  // 소개 화면 타이핑 효과 상태
  const [typedText, setTypedText] = useState("");
  const introText = "React와 Tailwind를 활용한 퀴즈 앱입니다. 이 앱은 React의 기본 개념을 복습하기 위해 제작되었습니다. 총 5개의 문제로 구성되어 있으며, 각각의 질문에 객관식 답변이 포함되어 있습니다. 재미있게 즐겨주세요!";

  useEffect(() => {
    if (currentScreen === "intro") {
      const typingEffect = async () => {
        let currentText = ""; // 현재 텍스트 상태 관리
        for (let i = 0; i < introText.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 50)); // 타이핑 속도 조절
          currentText += introText[i]; // 한 글자씩 추가
          setTypedText(currentText); // 전체 문자열 갱신
        }
      };
  
      setTypedText(""); // 초기화
      typingEffect();
    }
  }, [currentScreen]);
  

  // 사용자가 답변을 선택했을 때 처리하는 함수
  const handleAnswer = (selectedOption) => {
    // 선택된 답변이 정답인지 확인
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1); // 정답이면 점수 증가
    }
    // 다음 질문으로 이동하거나 결과 화면으로 전환
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentScreen("result");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* 소개 화면 */}
      {currentScreen === "intro" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">퀴즈 풀기 앱에 오신 것을 환영합니다!</h1>
          <p className="text-gray-600 mb-4 whitespace-pre-wrap">{typedText}</p>
          <button
            onClick={() => setCurrentScreen("quiz")} // 퀴즈 화면으로 이동
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            시작하기
          </button>
        </div>
      )}

      {/* 퀴즈 화면 */}
      {currentScreen === "quiz" && (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">
            {/* 현재 질문 표시, 빈칸은 "____"로 대체 */}
            {quizData[currentQuestionIndex]?.question.replace("___", "_____")}
          </h2>
          <div className="space-y-2">
            {/* 객관식 보기 버튼 생성 */}
            {quizData[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option} // 각 보기의 고유 키
                onClick={() => handleAnswer(option)} // 보기 선택 시 처리
                className="block w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 결과 화면 */}
      {currentScreen === "result" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">퀴즈 완료!</h2>
          {/* 최종 점수 표시 */}
          <p className="text-lg mb-4">당신의 점수는 {score} / {quizData.length}입니다.</p>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)} // 링크 복사
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
          >
            링크 복사하기
          </button>
        </div>
      )}
    </div>
  );
}

export default App;