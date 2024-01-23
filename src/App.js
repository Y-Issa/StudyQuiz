import { useState } from "react";
import "./styles.css";

const API_KEY = "fRaNEGWYOwPNxFDhFMI2wLbryZAweNQ5Ogi6w8is";

const tst =
  await fetch(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=code&difficulty=Easy&limit=10&tags=JavaScript
`);
const data = await tst.json();
console.log(data);

export default function App() {
  return (
    <div>
      <Header />
      <Accordion data={data} />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>StudyQuiz</h1>
      <p>Your Personal Quiz Assistant</p>
    </div>
  );
}

function Accordion({ data }) {
  const [curOpen, setIsOpen] = useState(null);

  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem
          curOpen={curOpen}
          onOpen={setIsOpen}
          question={el.question}
          answers={el.answers}
          correctAnswers={Object.keys(el.correct_answers).filter(
            (key) => el.correct_answers[key] === "true"
          )}
          num={i}
          key={el.id}
        ></AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({
  num,
  question,
  answers,
  correctAnswers,
  curOpen,
  onOpen,
}) {
  const isOpen = num === curOpen;
  const [showAnswers, setShowAnswers] = useState(false);

  const handleToggle = () => {
    onOpen(isOpen ? null : num);
    setShowAnswers(false);
  };

  const handleShowAnswers = () => {
    setShowAnswers((prev) => !prev);
  };

  return (
    <div className={`item ${isOpen ? "open" : ""}`}>
      <p className="number" onClick={handleToggle}>
        {num < 9 ? `0${num + 1} ` : num + 1}
      </p>
      <p className="title" onClick={handleToggle}>
        {question}
      </p>
      <p className="icon" onClick={handleToggle}>
        {isOpen ? "-" : "+"}
      </p>
      {isOpen && (
        <div className="content-box">
          {Object.entries(answers).map(([key, value]) => (
            <li key={key} onClick={handleToggle}>
              {key === correctAnswers[0].slice(0, 8) ? (
                <p className={showAnswers ? "corr" : ""}>{value}</p>
              ) : (
                <p>{value}</p>
              )}
            </li>
          ))}
          <button onClick={handleShowAnswers}>
            {showAnswers ? "Hide Answer" : "Show Answer"}
          </button>
        </div>
      )}
    </div>
  );
}
