import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setList([...list, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const toggleComplete = (id) => {
    const updatedList = list.map((item) => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  return (
    <div className="container">
      <h1>mis Tareas </h1>
      <div className="input-group">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Escribe una tarea..." 
          
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Agregar</button>
      </div>

      <ul>
        {list.map((item) => (
          <li key={item.id} className={`task-item ${item.completed ? "completed" : ""}`}>
            <div className="task-text">
              <input 
                type="checkbox" 
                checked={item.completed} 
                onChange={() => toggleComplete(item.id)} 
              />
              <span onClick={() => toggleComplete(item.id)}>
                {item.text}
              </span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(item.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;