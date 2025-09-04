import React, { useState } from "react";
import { api } from "../api";

function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("add");
  const [result, setResult] = useState(null);

  const handleCalc = async () => {
    try {
      const res = await api.get("/calculate", { params: { a, b, op } });
      setResult(res.data.result ?? res.data.error);
    } catch (err) {
      setResult("Network Error");
    }
  };

  return (
    <div className="card">
      <h2>Calculator</h2>
      <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="First number" />
      <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="Second number" />
      <select value={op} onChange={(e) => setOp(e.target.value)}>
        <option value="add">Add</option>
        <option value="sub">Subtract</option>
        <option value="mul">Multiply</option>
        <option value="div">Divide</option>
      </select>
      <button onClick={handleCalc}>Calculate</button>
      {result !== null && <p className="result">Result: {result}</p>}
    </div>
  );
}

export default Calculator;
