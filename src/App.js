import React, { useState } from 'react';
import './App.css';
import Login from './components/auth/login'
import CreatePerson from './components/people/createPerson'
import PersonTable from './components/people/personTable'

function App() {

  return (
    <div className="App">
      <Login />
      <CreatePerson />
      <PersonTable />
    </div>
  );
}

export default App;
