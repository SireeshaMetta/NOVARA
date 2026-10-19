import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

function Coding() {
  const [code, setCode] = useState("// write code here");
  const [result, setResult] = useState("");

  const evaluate = async () => {
    const res = await axios.post("http://localhost:5000/api/evaluate", {
      code,
      language: "javascript",
      question: "Reverse a string",
    });

    setResult(res.data.result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Coding Practice</h2>

      <Editor
        height="400px"
        language="javascript"
        value={code}
        onChange={(value) => setCode(value || "")}
      />

      <button onClick={evaluate}>Evaluate Code</button>

      <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
}

export default Coding;