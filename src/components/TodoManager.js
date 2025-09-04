import React, { useState, useEffect } from "react";
import { api } from "../api";

function TodoManager() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all tasks
  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      alert("Error fetching todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create or Update Task
  const handleSave = async () => {
    if (!title) return alert("Title is required");
    try {
      if (editId) {
        // Update task using query params
        await api.put(`/todos/${editId}`, null, {
          params: { title, description: desc },
        });
      } else {
        // Create task using query params
        await api.post("/todos/create", null, {
          params: { title, description: desc },
        });
      }
      setTitle("");
      setDesc("");
      setEditId(null);
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Error saving todo");
    }
  };

  // Edit task
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDesc(todo.description);
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this task?")) return;
    try {
      await api.delete(`/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error(err);
      alert("Error deleting todo");
    }
  };

  return (
    <div className="card">
      <h2>Todo Manager</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleSave}>{editId ? "Update" : "Create"}</button>

      <div className="todo-list">
        {todos.length === 0 && <p>No tasks yet</p>}
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <strong>{todo.title}</strong> - {todo.description}{" "}
            <span>{todo.done ? "(Done)" : ""}</span>
            <div className="todo-actions">
              <button onClick={() => handleEdit(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoManager;
