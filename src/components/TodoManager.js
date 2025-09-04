// src/components/TodoManager.js
import { useState, useEffect } from "react";
import { api } from "../api";

export default function TodoManager() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create new todo
  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      await api.post("/todos/create", { title, description });
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (err) {
      console.error("Error creating todo", err);
    }
  };

  // Update todo (toggle done)
  const toggleDone = async (todo) => {
    try {
      await api.put(`/todos/${todo.id}`, {
        done: !todo.done,
      });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo", err);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <div>
      <h2>Todo Manager</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreate}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
            >
              {todo.title}
            </strong>{" "}
            - {todo.description}
            <button onClick={() => toggleDone(todo)}>
              {todo.done ? "Undo" : "Done"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}