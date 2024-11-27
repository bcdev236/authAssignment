import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Landing from './Pages/Landing.jsx'
import React, { useContext } from 'react';
import { AuthContext } from './authContext';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <Routes>
        <Route
          exact 
          path='/'
          element={user ? <Landing /> : <Navigate to='/login'/>}
        />
        <Route
          exact 
          path='/login'
          element={user ? <Navigate to='/'/> : <Login/>}
        />
        <Route
          exact 
          path='/register'
          element={user ? <Navigate to='/'/> : <Register/>}
        />
      </Routes>
    </div>
  );
}

export default App;
