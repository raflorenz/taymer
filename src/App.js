import React, { useState, useEffect } from 'react';
import './App.css';

const initialTasks = [
  {
    id: 1,
    title: 'add new feature',
    time: 0,
    active: false
  },
  {
    id: 2,
    title: 'fix some bugs',
    time: 0,
    active: false
  },
  {
    id: 3,
    title: 'make some coffee',
    time: 0,
    active: false
  }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState(null);

  const timePad = val => val > 9 ? val : '0' + val;

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

  return (
    <div className="app">
      <h1>Taymer</h1>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <p className="task-title">{task.title} <span>{timePad(Math.floor(task.time / 60 % 60))}m:{timePad(task.time % 60)}s</span></p>
            <button onClick={() => setActiveTask(tasks.find(item => item.id === task.id))}>start</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
