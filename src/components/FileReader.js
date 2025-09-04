import React, { useState } from "react";
import { api } from "../api";

export default function FileReader() {
  const [path, setPath] = useState("");
  const [content, setContent] = useState(null);

  const handleRead = async () => {
    try {
      const res = await api.get("/read_file", { params: { path } });
      setContent(res.data);
    } catch (err) {
      setContent({ error: "Network Error" });
    }
  };

  return (
    <div>
      <h2>File Reader</h2>
      <input type="text" value={path} onChange={e => setPath(e.target.value)} placeholder="File path" />
      <button onClick={handleRead}>Read File</button>
      {content && <pre>{JSON.stringify(content, null, 2)}</pre>}
    </div>
  );
}
