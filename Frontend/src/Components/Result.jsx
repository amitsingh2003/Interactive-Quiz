import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  Trophy,
  Clock,
  Target,
  Zap,
  Medal,
  Brain,
  ChevronDown,
  ChevronUp,
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const SkillRating = ({ score }) => {
  const ratings = ["Novice", "Intermediate", "Advanced", "Expert", "Master"];
  const rating = Math.floor((score / 100) * (ratings.length - 1));

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500">
        {ratings[rating]}
      </div>
      <div className="flex space-x-1">
        {ratings.map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= rating ? "text-yellow-500" : "text-slate-600"
            }`}
            fill={i <= rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    </div>
  );
};

const QuizResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-slate-900 p-6 flex items-center justify-center">
        <div className="text-white">Loading results...</div>
      </div>
    );
  }

  const accuracy = (results.correctAnswers / results.totalQuestions) * 100;
  const performanceData = [
    { name: "Correct", value: results.correctAnswers },
    { name: "Incorrect", value: results.incorrectAnswers },
  ];

  const COLORS = ["#22c55e", "#ef4444"];
  const RADAR_COLORS = ["#8b5cf6"];

  const performanceMetrics = [
    { subject: "Accuracy", value: accuracy },
    {
      subject: "Speed",
      value: results.timeSpent
        ? Math.min(100, 100 - (results.timeSpent / 60) * 10)
        : 80,
    },
    {
      subject: "Streak",
      value: (results.streak / results.totalQuestions) * 100,
    },
    {
      subject: "Score",
      value: (results.score / (results.totalQuestions * 100)) * 100,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        <div className="absolute inset-0 opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjAyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Quiz Complete! 🎉
          </h1>
          <p className="text-xl text-slate-400 mb-6">
            Here's how you performed
          </p>
          <SkillRating   score={accuracy} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Score Card */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Score</h3>
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              {results.score}
            </div>
            <p className="text-sm text-slate-400">points earned</p>
          </div>

          {/* Accuracy Card */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Accuracy</h3>
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              {accuracy.toFixed(1)}%
            </div>
            <p className="text-sm text-slate-400">
              {results.correctAnswers} of {results.totalQuestions} correct
            </p>
          </div>

          {/* Streak Card */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Best Streak</h3>
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              {results.streak}x
            </div>
            <p className="text-sm text-slate-400">
              consecutive correct answers
            </p>
          </div>

          {/* Badges Card */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Badges Earned</h3>
              <Medal className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              {results.badges?.length || 0}
            </div>
            <p className="text-sm text-slate-400">achievements unlocked</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Radar */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center mb-4">
              <Brain className="w-5 h-5 text-purple-500 mr-2" />
              <h3 className="text-lg font-medium text-white">
                Performance Radar
              </h3>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <RadarChart data={performanceMetrics}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    stroke="#94a3b8"
                  />
                  <Radar
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Accuracy Distribution */}
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-lg font-medium text-white">
                Answer Distribution
              </h3>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={performanceData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

   {/* Badges Section */}
   {results.badges && results.badges.length > 0 && (
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
            <div className="flex items-center mb-6">
              <Award className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="text-lg font-medium text-white">
                Achievements Unlocked
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Previous code remains the same until the badges mapping... */}

              {results.badges.map((badge, index) => (
                <div
                  key={index}
                  className="relative group p-4 rounded-xl bg-slate-800 border border-white/5 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Award className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-white">{badge}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Question Analysis */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-white flex items-center">
              <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
              Question Analysis
            </h3>
            <p className="text-sm text-slate-400">Review your answers</p>
          </div>
          <button
            onClick={() => setShowAllQuestions(!showAllQuestions)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {showAllQuestions ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="space-y-4">
          {results.answers
            .slice(0, showAllQuestions ? undefined : 3)
            .map((answer, index) => {
              // Handle both old and new data structures
              const isCorrect = answer.userChoice?.isCorrect ?? answer.isCorrect;
              const questionText = answer.questionText ?? answer.question;
              const userAnswerText = answer.userChoice?.text ?? answer.selectedAnswer;
              const correctAnswerText = answer.correctOption?.description ?? answer.correctAnswer;

              const timeSpent = answer.timeSpent ?? 0;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    isCorrect
                      ? "bg-green-500/5 border-green-500/30"
                      : "bg-red-500/5 border-red-500/30"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">
                      Question {index + 1}
                    </h4>
                    {isCorrect ? (
                      <div className="flex items-center text-green-500">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        <span className="text-sm">Correct</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <XCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Incorrect</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Question Text */}
                  <p className="text-slate-300 mb-4">{questionText}</p>
                  
                  <div className="space-y-3 text-sm">
                    {/* User's Answer */}
                    <div className="flex items-start space-x-2">
                      <span className="text-slate-400 min-w-[100px]">Your answer:</span>
                      <span className={
                        isCorrect ? "text-green-400" : "text-red-400"
                      }>
                        {userAnswerText}
                      </span>
                    </div>

                    {/* Correct Answer - shown if user was incorrect */}
                    {!isCorrect && correctAnswerText && (
                      <div className="flex items-start space-x-2">
                        <span className="text-slate-400 min-w-[100px]">Correct answer:</span>
                        <span className="text-green-400">
                          {correctAnswerText}
                        </span>
                      </div>
                    )}

                    {/* Time Taken */}
                    <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-slate-700/50">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">
                        Time taken: {timeSpent} seconds
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Show More Button */}
        {!showAllQuestions && results.answers.length > 3 && (
          <button
            onClick={() => setShowAllQuestions(true)}
            className="w-full mt-4 py-2 px-4 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            Show all {results.answers.length} questions
          </button>
        )}
      </div>

      
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
           onClick={() => navigate("/QuizSection")}
            className="px-8 py-3 rounded-xl bg-slate-800 border border-white/10 text-white font-medium hover:bg-slate-700 transition-colors flex items-center space-x-2"
          >
            <span>Try Another Quiz</span>
          </button>
          <button
           onClick={() => navigate("/")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-400 mt-8">
          Keep learning and challenging yourself! 🚀
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
