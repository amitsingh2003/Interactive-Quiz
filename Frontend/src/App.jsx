import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import QuizSection from "./Components/quiz4";
import ResultsSection from "./Components/Result";
import QuizIntro from "./Components/Intro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizIntro />} />
        <Route path="/QuizSection" element={<QuizSection />} />
        <Route path="/Result" element={<ResultsSection />} /> 
      </Routes>
    </Router>
  );
}

export default App;
