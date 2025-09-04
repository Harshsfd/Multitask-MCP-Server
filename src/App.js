import React from "react";
import Calculator from "./components/Calculator";
import FileReader from "./components/FileReader";
import TextAnalyzer from "./components/TextAnalyzer";
import TodoManager from "./components/TodoManager";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>MCP Tools</h1>
      <Calculator />
      <hr />
      <FileReader />
      <hr />
      <TextAnalyzer />
      <hr />
      <TodoManager />
    </div>
  );
}

export default App;
