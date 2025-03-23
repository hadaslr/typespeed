import { useState, useEffect } from "react";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Coding is fun and challenging.",
  "React and Tailwind make UI development easy.",
  "The early bird catches the worm.",
  "A watched pot never boils.",
  "Actions speak louder than words.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "Knowledge is power.",
  "Time flies when you're having fun."
];

const TypingGame = () => {
  const [text, setText] = useState(sentences[0]);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (userInput.length === 1 && startTime === null) {
      setStartTime(Date.now());
    }

    if (startTime !== null && !isDone) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [startTime, userInput, isDone]);

  useEffect(() => {
    if (startTime !== null && elapsedTime > 0) {
      const timeTaken = elapsedTime / 1000 / 60;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      setWpm(Math.round(wordsTyped / timeTaken));
      calculateAccuracy();
    }
  }, [userInput, elapsedTime]);

  const calculateAccuracy = () => {
    const correctChars = userInput
      .split("")
      .filter((char, index) => char === text[index]).length;
    setAccuracy(Math.round((correctChars / text.length) * 100));
  };

  const restartGame = () => {
    setText(sentences[Math.floor(Math.random() * sentences.length)]);
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setWpm(0);
    setAccuracy(100);
    setIsDone(false);
  };

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === "Enter" && !isDone) {
      setIsDone(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className={`w-full max-w-lg p-6 rounded-lg shadow-lg transition-all duration-300 ${isDone ? "bg-purple-700" : "bg-gray-800"}`}>
        {!isDone ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-4">TypeSpeed</h1>
            <p className="text-center mb-4">
              Type the given sentence as <span className="text-blue-400 font-bold">fast</span> as you can, then press <span>Enter</span>.
            </p>
            <p className="p-4 bg-gray-700 rounded-md text-lg text-center mb-4">
              {text}
            </p>
            <input
              type="text"
              className="w-full p-3 text-lg rounded-md bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Start typing..."
            />
            <div className="flex justify-between mt-4 text-lg">
              <p>⏳ Time: {startTime ? `${Math.floor(elapsedTime / 1000)}s` : "0s"}</p>
              <p>⚡ WPM: {wpm || 0}</p>
              <p>🎯 Accuracy: {accuracy}%</p>
            </div>
            <button
              onClick={() => setIsDone(true)}
              className="w-full mt-4 p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Press Enter to Finish
            </button>
            <button
              onClick={restartGame}
              className="w-full mt-4 p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Restart
            </button>
          </>
        ) : (
          // Results Screen
          <div className="text-center">
            <p>The average typing speed worldwide is around 40 WPM.</p>
            <h2 className="text-3xl font-bold mb-4 mt-4">Your results are:</h2>
            <p className="text-lg mb-2">⏳ Time Taken: {Math.floor(elapsedTime / 1000)}s</p>
            <p className="text-lg mb-2">⚡ WPM: {wpm}</p>
            <p className="text-lg mb-4">🎯 Accuracy: {accuracy}%</p>
            <button
              onClick={restartGame}
              className="w-full bg-purple-900 hover:bg-purple-800 text-white p-3 rounded-md"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingGame;
