import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

function VoiceAI() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [response, setResponse] = useState("");

  const ask = async () => {
    const res = await axios.post("http://localhost:5000/api/ai", {
      message: transcript,
    });

    setResponse(res.data.reply);
    resetTranscript();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Voice AI</h2>

      <p><b>You:</b> {transcript}</p>

      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={ask}>Ask AI</button>

      <p><b>AI:</b> {response}</p>
    </div>
  );
}

export default VoiceAI;