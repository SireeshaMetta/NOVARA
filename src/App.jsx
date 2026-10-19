import { useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (loading || !msg.trim()) return;

    const userText = msg;

    // show user message instantly
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    setMsg("");
    setLoading(true);

    try {
      // ✅ UPDATED AXIOS CALL (YOUR FIX)
      const res = await axios.post("http://localhost:5000/api/ai", {
        prompt: userText,
      });

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "⚠️ AI request failed" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Novara AI Chat</h2>

      {/* CHAT BOX */}
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "8px",
            }}
          >
            <span
              style={{
                padding: "10px",
                borderRadius: "10px",
                display: "inline-block",
                background: m.role === "user" ? "#4f46e5" : "#e5e5e5",
                color: m.role === "user" ? "white" : "black",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}

        {loading && <p>AI is thinking...</p>}
      </div>

      {/* INPUT */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask something..."
          style={{ flex: 1, padding: "10px" }}
        />

        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;