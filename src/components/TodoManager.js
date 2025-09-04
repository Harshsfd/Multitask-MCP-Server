import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

function TodoManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/todos`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const createTask = async () => {
    try {
      await axios.post(`${BASE_URL}/todos/create`, null, { params: { title, description } });
      setTitle(""); setDescription("");
      fetchTasks(); // <-- refresh list after create
    } catch (err) { console.error(err); }
  };

  // Update Task
  const updateTask = async (id) => {
    try {
      await axios.put(`${BASE_URL}/todos/${id}`, null, { params: { title, description } });
      setTitle(""); setDescription(""); setEditId(null);
      fetchTasks(); // <-- refresh list after update
    } catch (err) { console.error(err); }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${id}`);
      fetchTasks(); // <-- refresh list after delete
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2>Todo Manager</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      {editId ? 
        <button onClick={() => updateTask(editId)}>Update Task</button> :
        <button onClick={createTask}>Create Task</button>
      }

      <ul>
  {tasks.map(task => (
    <li key={task.id}>
      {task.title} - {task.description}   {/* <- Status fix */}
      <button onClick={() => { setEditId(task.id); setTitle(task.title); setDescription(task.description); }}>Edit</button>
      {}<button onClick={() => deleteTask(task.id)}>Delete</button> {}
      {task.done ? "Done ✅" : "Pending ⏳"}
    </li>
  ))}
</ul>

    </div>
  );
}

export default TodoManager;
