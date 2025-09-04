import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function TodoManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDone, setEditDone] = useState(false);

  const fetchTasks = async () => {
    const res = await api.get("/todos");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    await api.post("/todos/create", null, { params: { title, description } });
    setTitle(""); setDescription("");
    fetchTasks();
  };

  const handleUpdate = async (id) => {
    await api.put(`/todos/${id}`, null, { params: { title: editTitle, description: editDesc, done: editDone } });
    setEditId(null); fetchTasks();
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Delete task ${id}?`)) {
      await api.delete(`/todos/${id}`);
      fetchTasks();
    }
  };

  return (
    <div>
      <h2>Todo Manager</h2>
      <h3>Create Task</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button onClick={handleCreate}>Create</button>

      <h3>All Tasks</h3>
      {tasks.map(t => (
        <div key={t.id} style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
          <p>ID: {t.id} | Title: {t.title} | Desc: {t.description} | Done: {t.done.toString()}</p>
          {editId === t.id ? (
            <div>
              <input value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Title" />
              <input value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description" />
              <label>
                Done:
                <input type="checkbox" checked={editDone} onChange={e => setEditDone(e.target.checked)} />
              </label>
              <button onClick={() => handleUpdate(t.id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <button onClick={() => { setEditId(t.id); setEditTitle(t.title); setEditDesc(t.description); setEditDone(t.done); }}>Edit</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
