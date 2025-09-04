import React, { useState } from "react";
import { api } from "../api";

function FileReader() {
  const [path, setPath] = useState("");
  const [content, setContent] = useState("");

  const handleRead = async () => {
    try {
      const res = await api.get("/read_file", { params: { path } });
      setContent(res.data.content ?? res.data.error);
    } catch (err) {
      setContent("Network Error");
    }
  };

  return (
    <div className="card">
      <h2>File Reader</h2>
      <input type="text" value={path} onChange={(e) => setPath(e.target.value)} placeholder="File path" />
      <button onClick={handleRead}>Read File</button>
      {content && <p className="result">{content}</p>}
    </div>
  );
}

export default FileReader;
