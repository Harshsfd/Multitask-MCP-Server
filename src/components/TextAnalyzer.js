import React, { useState } from "react";
import { api } from "../api";

export default function TextAnalyzer() {
  const [path, setPath] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await api.get("/analyze_text", { params: { path } });
      setResult(res.data);
    } catch (err) {
      setResult({ error: "Network Error" });
    }
  };

  return (
    <div>
      <h2>Text Analyzer</h2>
      <input type="text" value={path} onChange={e => setPath(e.target.value)} placeholder="File path" />
      <button onClick={handleAnalyze}>Analyze</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
