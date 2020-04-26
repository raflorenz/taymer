import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  const pad = val => val > 9 ? val : '0' + val;

  useEffect(() => {
    let interval = null;

    if (active) {
      interval = setInterval(() => setSeconds(seconds => seconds + 1), 1000);
    }

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="app">
      <h1>Taymer</h1>
      <div className="task-item">
        <p className="task-title">Drink Coffee <span>{pad(Math.floor(seconds / 60 % 60))}m:{pad(seconds % 60)}s</span></p>
        <button onClick={() => setActive(!active)}>start</button>
      </div>
    </div>
  );
}

export default App;
