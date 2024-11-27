import React, { useState, useEffect, useContext } from 'react'
// import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.open(
        `https://auth-assignment-server-pi.vercel.app/api/oauth/logout`,
        '_self'
    );
  };

  return (
    <div className=' px-10 lg:px-20 min-h-16 lg:min-h-20 bg-gray-800 flex justify-between'>
        <div className=' py-4 text-l lg:text-3xl text-gray-100 italic'>AuthAssignment</div>
        {user ? ( 
          <div>
            <span className='text-gray-100 text-sm lg:text-l lg:px-4'>
              Welcome, {user.name}
            </span>
            <button onClick={handleLogout} className=" text-sm lg:text-l my-2 py-2 lg:my-5 lg:py-2 mx-2 px-2 lg:mx-4 lg:px-4 bg-green-400 text-white rounded-md hover:bg-green-500 transition duration-300">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button 
              onClick={() => navigate('/login')}
              className="text-sm lg:text-l my-2 py-2 lg:my-5 lg:py-2 mx-2 px-2 lg:mx-4 lg:px-4 bg-green-400 text-white rounded-md hover:bg-green-500 transition duration-300">
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="text-sm lg:text-l my-2 py-2 lg:my-5 lg:py-2 mx-2 px-2 lg:mx-4 lg:px-4 bg-green-400 text-white rounded-md hover:bg-green-500 transition duration-300">
              Register
            </button>
          </div>
        )}
    </div>
  )
}

export default Navbar