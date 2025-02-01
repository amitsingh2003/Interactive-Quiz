import React from "react";
import {
  Clock,
  Award,
  Brain,
  BookOpen,
  Target,
  Trophy,
  Sparkles,
  ChevronRight,
  Timer,
  Star,
  ScrollText,
  AlertCircle,
  Info,
  CheckCircle,
  Users,
  Medal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizIntro = ({ quizData = {}, onStart = () => {} }) => {
  const navigate = useNavigate();
  const {
    title = "Interactive Quiz",
    duration = 30,
    questions_count = 10,
    correct_answer_marks = 4,
    negative_marks = 1,
  } = quizData;

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-white animate-pulse flex items-center space-x-2">
          <div className="w-6 h-6 bg-slate-700 rounded-full animate-spin" />
          <span>Loading quiz data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10" />

          <div className="flex items-center justify-center space-x-5">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
              {title}
            </h1>
          </div>

          <p className="text-slate-300 max-w-xl mx-auto text-lg leading-relaxed">
            Challenge yourself with this interactive quiz designed to test and
            enhance your knowledge. Ready to showcase your expertise?
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Instant Results</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full" />
            <div className="flex items-center space-x-1 text-blue-400">
              <Users className="w-4 h-4" />
              <span>Global Leaderboard</span>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Clock className="w-6 h-6 text-pink-500" />,
              label: "Duration",
              value: `${duration} Minutes`,
              bg: "pink",
            },
            {
              icon: <Target className="w-6 h-6 text-purple-500" />,
              label: "Questions",
              value: `${questions_count} Total`,
              bg: "purple",
            },
            {
              icon: <Trophy className="w-6 h-6 text-pink-500" />,
              label: "Max Score",
              value: `${questions_count * 4} Points`,
              bg: "pink",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group hover:scale-105 transition-all duration-300"
            >
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-pink-500/50 transition-colors overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/0 to-slate-800/50 z-0" />
                <div className="relative z-10 flex items-start space-x-4">
                  <div
                    className={`p-3 bg-${stat.bg}-500/10 rounded-xl group-hover:scale-110 transition-transform`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{stat.label}</p>
                    <p className="text-white font-semibold mt-1">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Instructions Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-8">
              <ScrollText className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">
                Quiz Instructions
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Star className="w-4 h-4 text-pink-500" />,
                  title: "Scoring System",
                  details: [
                    `+${correct_answer_marks} points for correct answers`,
                    `-${negative_marks} point for incorrect answers`,
                  ],
                },
                {
                  icon: <Timer className="w-4 h-4 text-purple-500" />,
                  title: "Time Management",
                  details: ["Pace yourself - average 1 minute per question"],
                },
                {
                  icon: <BookOpen className="w-4 h-4 text-pink-500" />,
                  title: "Read Carefully",
                  details: ["Each question has one correct answer"],
                },
                {
                  icon: <AlertCircle className="w-4 h-4 text-purple-500" />,
                  title: "No Going Back",
                  details: ["Questions cannot be revisited once answered"],
                },
              ].map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="p-2 bg-slate-700/50 rounded-lg mt-1 group-hover:scale-110 transition-transform">
                    {instruction.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">
                      {instruction.title}
                    </p>
                    {instruction.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-400 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Start Button */}
        <button
          onClick={() => navigate("/QuizSection")}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 text-white py-5 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center space-x-2 font-medium relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          <span className="text-xl font-extrabold">Start Quiz</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Enhanced Tips Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 text-slate-400 bg-slate-800/50 rounded-full px-4 py-2">
            <Info className="w-4 h-4 text-purple-500" />
            <p className="text-sm">
              Pro tip: Read each question twice before selecting your answer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro;
