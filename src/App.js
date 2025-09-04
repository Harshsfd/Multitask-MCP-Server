import React from "react";
import Calculator from "./components/Calculator";
import FileReader from "./components/FileReader";
import TextAnalyzer from "./components/TextAnalyzer";
import TodoManager from "./components/TodoManager";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1>MCP Tools</h1>
      <Calculator />
      <FileReader />
      <TextAnalyzer />
      <TodoManager />
    </div>
  );
}

export default App;
