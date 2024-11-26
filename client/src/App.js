import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Landing from './Pages/Landing.jsx'

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if(storedUser){
        setUser(storedUser);
        return;
      }

      // console.log("hitting backend url")
      const url = `http://localhost:4000/api/oauth/login/success`;
      const response = await axios.get(url, {withCredentials: true,});

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        console.log(response);
      } else {
        console.log(response.data.message);
      }
    } catch(err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

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
