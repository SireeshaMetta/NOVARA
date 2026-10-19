import React, { useState } from "react";
import axios from "axios";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");

  const generateQuiz = async () => {
    const res = await axios.post("http://localhost:5000/api/quiz", {
      topic,
    });

    setQuiz(res.data.quiz);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Quiz Generator</h2>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic"
      />

      <button onClick={generateQuiz}>Generate Quiz</button>

      <pre style={{ whiteSpace: "pre-wrap" }}>{quiz}</pre>
    </div>
  );
}

export default Quiz;