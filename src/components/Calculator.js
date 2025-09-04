import { useState } from "react";
import { api } from "../api";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("add");
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    try {
      const res = await api.get("/calculate", { params: { a, b, op } });
      setResult(res.data.result ?? res.data.error);
    } catch (err) {
      setResult("Error calling API");
    }
  };

  return (
    <div>
      <h2>Calculator</h2>
      <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="First number" />
      <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="Second number" />
      <select value={op} onChange={e => setOp(e.target.value)}>
        <option value="add">Add</option>
        <option value="sub">Subtract</option>
        <option value="mul">Multiply</option>
        <option value="div">Divide</option>
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}
