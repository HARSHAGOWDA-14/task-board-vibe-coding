import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/tasks");
    setTasks(await res.json());
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await fetch(`http://localhost:8000/tasks?title=${title}`, { method: "POST" });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { method: "PUT" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const completed = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Task Board</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add task" />
      <button onClick={addTask}>Add</button>
      <p>Progress: {progress}%</p>
      {progress === 100 && tasks.length > 0 && <p>🎉 All tasks completed!</p>}
      {tasks.map(task => (
        <div key={task.id}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
          {task.title}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;