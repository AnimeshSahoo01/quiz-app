import React, { useState } from 'react';
import './App.css';

const quizData = [
  {
    question: "1. What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Marking Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
    correct: 0
  },
  {
    question: "2. Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<css>", "<style>", "<link>"],
    correct: 2
  },
  {
    question: "3. What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"],
    correct: 0
  },
  {
    question: "4. Which HTML element is used to specify a footer for a document or section?",
    options: ["<bottom>", "<footer>", "<section>", "<aside>"],
    correct: 1
  },
  {
    question: "5. How do you select an element with id 'header' in CSS?",
    options: [".header", "#header", "*header", "header"],
    correct: 1
  },
  {
    question: "6. Which CSS property controls the text size?",
    options: ["text-size", "font-style", "text-style", "font-size"],
    correct: 3
  },
  {
    question: "7. What is the correct HTML tag for inserting a line break?",
    options: ["<break>", "<lb>", "<br>", "<line>"],
    correct: 2
  },
  {
    question: "8. Which CSS property is used to change the background color?",
    options: ["color", "background-color", "bg-color", "surface-color"],
    correct: 1
  },
  {
    question: "9. How do you display hyperlinks without an underline in CSS?",
    options: ["a {text-decoration: none;}", "a {underline: none;}", "a {text-draw: plain;}", "a {decoration: no-underline;}"],
    correct: 0
  },
  {
    question: "10. Which HTML attribute specifies an alternate text for an image if the image cannot be displayed?",
    options: ["title", "src", "alt", "longdesc"],
    correct: 2
  },
  {
    question: "11. In the CSS Box Model, which layer is immediately outside the content area?",
    options: ["Border", "Padding", "Margin", "Outline"],
    correct: 1
  },
  {
    question: "12. Which HTML element is used to define important text?",
    options: ["<important>", "<strong>", "<b>", "<i>"],
    correct: 1
  },
  {
    question: "13. What is the default value of the CSS position property?",
    options: ["relative", "absolute", "fixed", "static"],
    correct: 3
  },
  {
    question: "14. How do you make a list that lists items with numbers in HTML?",
    options: ["<ul>", "<dl>", "<ol>", "<list>"],
    correct: 2
  },
  {
    question: "15. Which CSS layout mode allows items to align in two dimensions (rows & columns)?",
    options: ["Flexbox", "Grid", "Float", "Inline-Block"],
    correct: 1
  },
  {
    question: "16. Which HTML tag is used to define an interactive form for user input?",
    options: ["<input>", "<form>", "<fieldset>", "<textbox>"],
    correct: 1
  },
  {
    question: "17. What does the 'z-index' property in CSS control?",
    options: ["Font size scaling", "Stacking order of elements", "Horizontal alignment", "Opacity transparency"],
    correct: 1
  },
  {
    question: "18. Which HTML5 element is used to play video files?",
    options: ["<media>", "<movie>", "<video>", "<embed>"],
    correct: 2
  },
  {
    question: "19. How do you write a comment in CSS?",
    options: ["// this is a comment", "<!-- this is a comment -->", "/* this is a comment */", "' this is a comment"],
    correct: 2
  },
  {
    question: "20. Which CSS units are relative to the font-size of the root element (<html>)?",
    options: ["em", "px", "rem", "vh"],
    correct: 2
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userName, setUserName] = useState('');
  const [nameInput, setNameInput] = useState('');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [stats, setStats] = useState({
    attended: 0,
    correct: 0,
    wrong: 0
  });

  // 1no page 
  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return alert("Please enter your name!");
    setUserName(nameInput.trim());
    setCurrentPage(2);
  };

  // option
  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  // Submit button
  const handleSubmit = () => {
    if (selectedOption === null) return alert("Please select an option first!");
    if (isSubmitted) return;

    setIsSubmitted(true);
    const currentQ = quizData[currentIndex];
    const isCorrect = selectedOption === currentQ.correct;

    setStats((prev) => ({
      attended: prev.attended + 1,
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrong: !isCorrect ? prev.wrong + 1 : prev.wrong
    }));
  };

  // Next question button
  const handleNext = () => {
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setCurrentPage(3);
    }
  };

  // last page output
  const handleTryAgain = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setStats({ attended: 0, correct: 0, wrong: 0 });
    setCurrentPage(2);
  };

  const handleGoHome = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setNameInput('');
    setUserName('');
    setStats({ attended: 0, correct: 0, wrong: 0 });
    setCurrentPage(1);
  };

  // option button red green 
  const getOptionClass = (index) => {
    const currentQ = quizData[currentIndex];
    
    if (isSubmitted) {
      if (index === currentQ.correct) return "option-btn correct";
      if (selectedOption === index && index !== currentQ.correct) return "option-btn wrong";
    }
    
    if (selectedOption === index) return "option-btn selected";
    return "option-btn";
  };

  return (
    <div className="app-wrapper">
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <main className="main-container">

        {/* page1- name input page*/}
        {currentPage === 1 && (
          <div className="welcome-container">
            <div className="card welcome-card">
              <span className="badge">🚀 Quiz Arena</span>
              <h1>Welcome to <span className="gradient-text">Quiz World</span></h1>
              <p>Enter your name to begin the challenge</p>

              <form onSubmit={handleStartQuiz} className="input-form">
                <div className="input-group">
                  <label htmlFor="username">YOUR NAME</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="enter your name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <button type="submit" className="btn btn-blue btn-start">
                  Start
                </button>
              </form>
            </div>
          </div>
        )}

        {/* page2-question */}
        {currentPage === 2 && (
          <div className="card quiz-card">
            <div className="quiz-status-bar">
              <span className="status-badge">
                Question {currentIndex + 1} of {quizData.length}
              </span>
            </div>

            <div className="question-header">
              <h2>{quizData[currentIndex].question}</h2>
            </div>

            <div className="options-grid">
              {quizData[currentIndex].options.map((optText, index) => (
                <button
                  key={index}
                  className={getOptionClass(index)}
                  onClick={() => handleSelectOption(index)}
                >
                  <span className="opt-prefix">{String.fromCharCode(65 + index)}</span>
                  <span>{optText}</span>
                </button>
              ))}
            </div>

            <div className="action-buttons">
              <button
                onClick={handleSubmit}
                disabled={isSubmitted}
                className="btn btn-blue">
                Submit Answer
              </button>
              <button
                onClick={handleNext}
                disabled={!isSubmitted}
                className="btn btn-gray">
                Next
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className="btn btn-red">
                Stop Quiz
              </button>
            </div>
          </div>
        )}

        {/* page3-last page  */}
        {currentPage === 3 && (
          <div className="card result-card">
            <div>
              <div className="trophy-wrapper">
                <div className="trophy-icon">🏆</div>
                <div className="trophy-glow"></div>
              </div>

              <h1 className="result-title">Quiz Completed</h1>
              <h2 className="result-subtitle">Well done, {userName}</h2>
              <p className="result-score-text">Here is your final score summary</p>
            </div>

            <div className="stats-row">
              <div className="stat-box box-blue">
                <span className="stat-label">TOTAL ATTENDED</span>
                <span className="stat-value">{stats.attended}</span>
              </div>

              <div className="stat-box box-green">
                <span className="stat-label">CORRECT ANSWERS</span>
                <span className="stat-value">{stats.correct}</span>
              </div>

              <div className="stat-box box-red">
                <span className="stat-label">WRONG ANSWERS</span>
                <span className="stat-value">{stats.wrong}</span>
              </div>
            </div>

            <div className="result-actions">
              <button onClick={handleTryAgain} className="btn btn-blue">
                Try Again
              </button>
              <button onClick={handleGoHome} className="btn btn-gray">
                Go Home
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}