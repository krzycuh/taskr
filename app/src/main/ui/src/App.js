import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    axios.get('/api/tasks')
        .then(response => setTasks(response.data));
  }, []);

  const addTask = () => {
    axios.post('/api/tasks', { name, age: parseInt(age) })
        .then(response => setTasks([...tasks, response.data]));
  };

  return (
      <div>
        <h1>Tasks</h1>
        <ul>
          {tasks.map(task => (
              <li key={task.id}>{task.name} - {task.age}</li>
          ))}
        </ul>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={e => setAge(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
  );
}

export default App;