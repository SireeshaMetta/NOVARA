import React, { useState } from "react";
import axios from "axios";

function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    const res = await axios.post("http://localhost:5000/api/ai", {
      message,
    });

    setChat([
      ...chat,
      { role: "user", text: message },
      { role: "ai", text: res.data.reply },
    ]);

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Novara AI Assistant</h2>

      <div style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px" }}>
        {chat.map((c, i) => (
          <p key={i}>
            <b>{c.role}:</b> {c.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
      />

      <button onClick={send}>Send</button>
    </div>
  );
}

export default AIChat;