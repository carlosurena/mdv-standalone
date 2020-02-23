import React, { useState } from 'react';
import './App.css';
import Login from './components/auth/login'

function App() {

  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
      .then(response => response.json())
      .then(data => setGreeting(data.greeting));
  }
  return (
    <div className="App">
      <Login />
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{greeting}</p>
      </header>
    </div>
  );
}

export default App;
