import { useState } from "react";
import { api } from "../api";

export default function FileReader() {
  const [path, setPath] = useState("");
  const [content, setContent] = useState("");

  const handleReadFile = async () => {
    try {
      const res = await api.get("/read_file", { params: { path } });
      setContent(res.data.content ?? res.data.error);
    } catch {
      setContent("Error calling API");
    }
  };

  return (
    <div>
      <h2>File Reader</h2>
      <input type="text" value={path} onChange={e => setPath(e.target.value)} placeholder="File path" />
      <button onClick={handleReadFile}>Read File</button>
      {content && <pre>{content}</pre>}
    </div>
  );
}
