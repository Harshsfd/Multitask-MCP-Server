import { useState } from "react";
import { api } from "../api";

export default function TextAnalyzer() {
  const [path, setPath] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await api.get("/analyze_text", { params: { path } });
      setAnalysis(res.data);
    } catch {
      setAnalysis({ error: "Error calling API" });
    }
  };

  return (
    <div>
      <h2>Text Analyzer</h2>
      <input type="text" value={path} onChange={e => setPath(e.target.value)} placeholder="File path" />
      <button onClick={handleAnalyze}>Analyze</button>
      {analysis && <pre>{JSON.stringify(analysis, null, 2)}</pre>}
    </div>
  );
}
