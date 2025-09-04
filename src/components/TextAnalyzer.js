import React, { useState } from "react";
import { api } from "../api";

function TextAnalyzer() {
  const [path, setPath] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await api.get("/analyze_text", { params: { path } });
      setAnalysis(res.data.error ? null : res.data);
    } catch (err) {
      setAnalysis(null);
    }
  };

  return (
    <div className="card">
      <h2>Text Analyzer</h2>
      <input type="text" value={path} onChange={(e) => setPath(e.target.value)} placeholder="File path" />
      <button onClick={handleAnalyze}>Analyze</button>
      {analysis && (
        <div className="result">
          <p>Lines: {analysis.lines}</p>
          <p>Words: {analysis.words}</p>
          <p>Characters: {analysis.characters}</p>
          <p>
            Most Common Words:{" "}
            {analysis.most_common_words.map(([word, count]) => `${word}(${count})`).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default TextAnalyzer;
