import Calculator from "./components/Calculator";
import FileReader from "./components/FileReader";
import TextAnalyzer from "./components/TextAnalyzer";
import TodoManager from "./components/TodoManager";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>MCP Tools (Frontend)</h1>
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
