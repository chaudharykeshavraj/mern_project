import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import AddBook from './components/AddBook'

function App() {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1>📚 Library Login/Register</h1>
      <Register />
      <hr />
      <Login />
      <hr />
      <AddBook />
    </div>
  );
}

export default App;
