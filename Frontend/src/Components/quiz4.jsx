import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  AlertCircle,
  Trophy,
  Brain,
  Medal,
  Target,
  Flame,
  Award,
  Zap,
  CheckCircle,
  XCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

const createAudioContext = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const correctSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const incorrectSound = () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  return { correctSound, incorrectSound };
};

const QuizSection = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(15);
  const [audio] = useState(createAudioContext());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showSidePanels, setShowSidePanels] = useState(true);
  

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(
          "https://interactive-quiz-qmvn.onrender.com/api/quiz"
        );
        if (!response.ok) throw new Error("Failed to fetch quiz data");
        const data = await response.json();
        setQuizData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (!isAnswerRevealed && questionTimer > 0) {
      const timer = setInterval(() => {
        setQuestionTimer((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [questionTimer, isAnswerRevealed]);

  const handleTimeUp = () => {
   
    setStreak(0);
    setScore((prev) => prev - 1);
    goToNextQuestion();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleAnswerSelect = useCallback(
    (option) => {
      if (selectedAnswer !== null) return;

      setSelectedAnswer(option);
      setIsAnswerRevealed(true);

      if (option.is_correct) {
        setScore((prev) => prev + 4);
        setStreak((prev) => prev + 1);
        setCorrectAnswers((prev) => prev + 1);
        audio.correctSound?.();
        triggerConfetti();

        if (streak === 2) setBadges((prev) => [...prev, "🔥 Hot Streak"]);
        if (streak === 4) setBadges((prev) => [...prev, "🌟 Unstoppable"]);
        if (streak === 6) setBadges((prev) => [...prev, "💫 Legendary Streak"]);

        if (questionTimer > 10)
          setBadges((prev) => [...prev, "⚡ Speed Demon"]);
        if (questionTimer > 12)
          setBadges((prev) => [...prev, "🚀 Lightning Fast"]);

        if (score >= 20)
          setBadges((prev) => {
            if (!prev.includes("🎯 Sharpshooter"))
              return [...prev, "🎯 Sharpshooter"];
            return prev;
          });
        if (score >= 40)
          setBadges((prev) => {
            if (!prev.includes("💎 Elite Performer"))
              return [...prev, "💎 Elite Performer"];
            return prev;
          });

        const currentAccuracy =
          ((correctAnswers + 1) / (correctAnswers + incorrectAnswers + 1)) *
          100;
        if (currentAccuracy >= 80 && correctAnswers + incorrectAnswers >= 5) {
          setBadges((prev) => {
            if (!prev.includes("🎯 Precision Pro"))
              return [...prev, "🎯 Precision Pro"];
            return prev;
          });
        }
        if (currentAccuracy >= 90 && correctAnswers + incorrectAnswers >= 5) {
          setBadges((prev) => {
            if (!prev.includes("🎪 Perfect Performer"))
              return [...prev, "🎪 Perfect Performer"];
            return prev;
          });
        }

        if (
          answers.length >= 2 &&
          answers
            .slice(-2)
            .every((a) => a.timeSpent < 3 && a.userChoice.isCorrect) &&
          questionTimer > 12
        ) {
          setBadges((prev) => {
            if (!prev.includes("🌈 Speed Runner"))
              return [...prev, "🌈 Speed Runner"];
            return prev;
          });
        }

        if (correctAnswers === 0) {
          setBadges((prev) => [...prev, "🎭 First Blood"]);
        }

        if (
          answers.length >= 2 &&
          answers.slice(-2).every((a) => !a.userChoice.isCorrect)
        ) {
          setBadges((prev) => [...prev, "🔄 Comeback King"]);
        }

        const avgTimeSpent =
          answers.reduce((acc, curr) => acc + curr.timeSpent, 0) /
          answers.length;
        if (avgTimeSpent < 5 && answers.length >= 3) {
          setBadges((prev) => {
            if (!prev.includes("⚡ Quick Thinker"))
              return [...prev, "⚡ Quick Thinker"];
            return prev;
          });
        }
        if (
          answers.length >= 5 &&
          answers.slice(-5).every((a) => a.userChoice.isCorrect)
        ) {
          setBadges((prev) => {
            if (!prev.includes("🎯 Consistency King"))
              return [...prev, "🎯 Consistency King"];
            return prev;
          });
        }
      } else {
        setScore((prev) => prev - 1);
        setStreak(0);
        setIncorrectAnswers((prev) => prev + 1);
        audio.incorrectSound?.();
        if (incorrectAnswers >= 3) {
          setBadges((prev) => {
            if (!prev.includes("💪 Resilient"))
              return [...prev, "💪 Resilient"];
            return prev;
          });
        }
      }

      setAnswers((prev) => [
        ...prev,
        {
          questionIndex: currentQuestion,
          questionText: quizData.questions[currentQuestion].description,
          userChoice: {
            text: option.description,
            isCorrect: option.is_correct,
          },
          correctOption: quizData.questions[currentQuestion].options.find(
            (opt) => opt.is_correct
          ),
          correctAnswerText: quizData.questions[currentQuestion].options.find(
            (opt) => opt.is_correct
          ).description,
          timeSpent: 15 - questionTimer,
          timestamp: new Date().toISOString(),
        },
      ]);

      setTimeout(goToNextQuestion, 1500);
    },
    [selectedAnswer, streak, questionTimer, currentQuestion, audio]
  );

  const goToNextQuestion = useCallback(() => {
    if (currentQuestion < quizData?.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
      setQuestionTimer(15);
    } else {
      handleComplete();
    }
  }, [currentQuestion, quizData]);

  const handleComplete = () => {
    const accuracy =
      (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;

    const quizResults = {
      score,
      answers,
      accuracy,
      streak,
      badges,
      totalQuestions: quizData.questions.length,
      correctAnswers,
      incorrectAnswers,
      quizStartTime: answers[0]?.timestamp,
      quizEndTime: new Date().toISOString(),
      averageTimePerQuestion:
        answers.reduce((acc, curr) => acc + curr.timeSpent, 0) / answers.length,
    };

    localStorage.setItem("quizResults", JSON.stringify(quizResults));
    navigate("/Result");
  };

  useEffect(() => {
    const checkResponsive = () => {
      setShowSidePanels(window.innerWidth > 768);
    };

    checkResponsive();
    window.addEventListener("resize", checkResponsive);
    return () => window.removeEventListener("resize", checkResponsive);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Brain className="w-12 h-12 md:w-16 md:h-16 text-purple-500 animate-pulse" />
          <h2 className="text-xl md:text-2xl font-bold text-white text-center">
            Loading Your Quiz...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-white bg-red-500/10 p-4 md:p-6 rounded-xl border border-red-500/20 max-w-md">
          <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500 mb-2" />
          <h2 className="text-lg md:text-xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-sm md:text-base">{error}</p>
        </div>
      </div>
    );
  }

  const accuracy =
    correctAnswers + incorrectAnswers > 0
      ? ((correctAnswers / (correctAnswers + incorrectAnswers)) * 100).toFixed(
          1
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:hidden flex justify-between items-center p-4 bg-slate-800">
          <div className="flex items-center space-x-2">
            <Clock
              className={`w-5 h-5 ${
                questionTimer <= 3
                  ? "text-red-500 animate-pulse"
                  : "text-blue-500"
              }`}
            />
            <span className="text-lg font-bold text-white">
              {questionTimer}s
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-bold text-white">{score}</span>
          </div>
        </div>

        <div className="flex-1 grid md:grid-cols-[300px_1fr_300px] overflow-hidden">
        {showSidePanels && (
  <div className="hidden md:block border-r border-slate-700 p-4 md:p-6 overflow-y-auto">
    <h3 className="text-white text-lg font-bold mb-4">Questions</h3>
    <div className="grid grid-cols-4 gap-2">
      {quizData?.questions.map((_, index) => (
        <div
          key={index}
          className={`
            aspect-square rounded-lg flex items-center justify-center text-base md:text-lg font-bold
            ${index === currentQuestion ? "bg-purple-500 text-white" : ""}
            ${
              index < currentQuestion && answers[index]?.userChoice?.isCorrect
                ? "bg-green-500/20 text-green-500"
                : ""
            }
            ${
              index < currentQuestion && !answers[index]?.userChoice?.isCorrect
                ? "bg-red-500/20 text-red-500"
                : ""
            }
            ${
              index > currentQuestion
                ? "bg-slate-800/50 text-slate-500"
                : ""
            }
          `}
        >
          {index + 1}
        </div>
      ))}
    </div>
  </div>
)}

          
          <div className="p-4 md:p-6 overflow-y-auto">
          
            <div className="hidden md:flex justify-between items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <Clock
                    className={`w-6 h-6 ${
                      questionTimer <= 3
                        ? "text-red-500 animate-pulse"
                        : "text-blue-500"
                    }`}
                  />
                </div>
                <span className="text-2xl font-bold text-white">
                  {questionTimer}s
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <span className="text-2xl font-bold text-white">
                  {score} pts
                </span>
              </div>
            </div>

           
            <div
              className={`
                  bg-slate-800/50 rounded-xl p-4 md:p-8 border-2 transition-colors
                  ${questionTimer <= 3 ? "border-red-500" : "border-slate-700"}
                `}
            >
              <h2 className="text-xl md:text-2xl text-white font-bold mb-6 md:mb-8">
                {quizData?.questions[currentQuestion]?.description}
              </h2>

              <div className="space-y-3 md:space-y-4">
                {quizData?.questions[currentQuestion]?.options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                      className={`
                          w-full p-4 md:p-6 rounded-xl text-left text-white transition-all duration-300
                          ${
                            selectedAnswer === null
                              ? "hover:bg-slate-700/50"
                              : ""
                          }
                          ${
                            isAnswerRevealed && selectedAnswer === option
                              ? option.is_correct
                                ? "bg-green-500/20 border-green-500"
                                : "bg-red-500/20 border-red-500"
                              : "bg-slate-700/30 border-slate-600"
                          } border
                        `}
                    >
                      <div className="flex items-center space-x-3">
                        {isAnswerRevealed &&
                          selectedAnswer === option &&
                          (option.is_correct ? (
                            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                          ))}
                        <span className="text-base md:text-lg">
                          {option.description}
                        </span>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {showSidePanels && (
            <div className="hidden md:block border-l border-slate-700 p-4 md:p-6 overflow-y-auto">
              <div className="space-y-4 md:space-y-6">
                {/* Stats panels remain the same but with responsive padding/spacing */}
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <h3 className="text-white font-bold">Accuracy</h3>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {accuracy}%
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <h3 className="text-white font-bold">Current Streak</h3>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {streak}x
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-white font-bold">Badges</h3>
                  </div>
                  <div className="space-y-2">
                    {badges.map((badge, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/50 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <h3 className="text-white font-bold">Stats</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white">
                      <span>Correct:</span>
                      <span className="text-green-500">{correctAnswers}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Incorrect:</span>
                      <span className="text-red-500">{incorrectAnswers}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Questions:</span>
                      <span>
                        {currentQuestion + 1}/{quizData?.questions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
