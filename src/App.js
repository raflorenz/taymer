import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    let interval = null;

    if (activeTask) {
      const updateTaskTime = () => {
        setTasks(tasks => tasks.map(task => {
          if (task.id === activeTask.id) {
            return {
              ...task,
              active: true,
              time: task.time + 1
            };
          }

          return task;
        }));
      };

      interval = setInterval(updateTaskTime, 1000);
    }

    return () => clearInterval(interval);
  }, [activeTask]);

  const timePad = val => val > 9 ? val : '0' + val;

  const addTask = e => {
    e.preventDefault();

    if (input) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: input,
          time: 0,
          active: false
        }
      ]);
    }

    setInput('');
  };

  const deleteTask = taskID => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setTasks(tasks.filter(task => task.id !== taskID));
    }
  };

  return (
    <div className="app">
      <h1>Taymer</h1>

      <form onSubmit={addTask}>
        <input 
          type="text" 
          value={input} 
          autoFocus 
          required 
          onChange={e => setInput(e.target.value)} 
        />
        <button>Add task</button>
      </form>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <button className="btn-delete" onClick={() => deleteTask(task.id)}>x</button>
            <p className="task-title">{task.title} – <span>{timePad(Math.floor(task.time / 3600 % 60))}h:{timePad(Math.floor(task.time / 60 % 60))}m:{timePad(task.time % 60)}s</span></p>
            <button onClick={() => setActiveTask(tasks.find(item => item.id === task.id))}>Start</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
