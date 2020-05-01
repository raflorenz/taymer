import React, { useState, useEffect } from 'react';
import './App.css';

const initialTasks = [
  {
    id: 1,
    title: 'add new feature',
    start: 0,
    time: 0,
    active: false
  },
  {
    id: 2,
    title: 'fix some bugs',
    start: 0,
    time: 0,
    active: false
  },
  {
    id: 3,
    title: 'make some coffee',
    start: 0,
    time: 0,
    active: false
  }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [currentTask, setCurrentTask] = useState({});

  const pad = val => val > 9 ? val : '0' + val;

  useEffect(() => {
    let interval = null;

    console.log(currentTask[0]);

    if (currentTask[0]) {
      interval = setInterval(() => setTasks(tasks.map(task => {
        if (task.id === currentTask[0].id) {
          return {
            ...task,
            active: true,
            time: task.time + 1
          };
        }
        return task;
      })), 1000);
    }

    return () => clearInterval(interval);
  }, [tasks, currentTask]);

  const startTimer = (taskID) => {
    console.log('start timer button clicked...');

    setCurrentTask(tasks.map(task => {
      if (task.id === taskID) {
        return {
          ...task,
          active: true
        };
      }
      return task;
    }).filter(task => task.id === taskID));
  };  

  return (
    <div className="app">
      <h1>Taymer</h1>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <p className="task-title">{task.title} <span>{pad(Math.floor(task.time / 60 % 60))}m:{pad(task.time % 60)}s</span></p>
            <button onClick={() => startTimer(task.id)}>start</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
