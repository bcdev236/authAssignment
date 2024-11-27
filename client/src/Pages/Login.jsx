import React, { useState, useContext } from 'react';
import { AuthContext } from '../authContext';
import { publicRequest } from '../RequestMethods';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const Login = () => {
    const { setUser, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await publicRequest.post('/api/auth/login', { email: email, password: password });
            const user = response.data.user;
            console.log(response.data.message);

            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            setLoading(false);
            navigate('/');
            
        } catch (err) {
            // setError("Wrong Credentials");
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError("Something went wrong, please try again");
            }
        }
    };

    const googleAuth = async (e) => {
        window.open(
            `http://localhost:4000/api/oauth/callback`,
            '_self'
        );
    };

  return (
    <>
    <Navbar/>
    <div className=' min-h-screen bg-gray-100 flex justify-center'>
        <div className=' mx-8 my-16 bg-white shadow-xl rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:mx-48 lg:my-20'>
            <div className=' mx-4 mt-20 lg:my-16 '>
                <h1 className=' text-center font-bold text-2xl text-gray-700 lg:py-4 lg:px-4'>Sign in to your account</h1>
                {error && <p className="text-red-500 text-center mb-5">{error}</p>}
                <div className=' flex flex-col mx-4 my-4'>
                    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className=' my-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' required></input>
                    <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' my-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300'></input>
                    <button onClick={handleLogin} className=' my-4 w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition duration-300'>Login</button>
                    <button onClick={googleAuth} className='my-4 w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2 border border-gray-300'>
                        <img src='/assets/google.png' alt='google' className=' w-6 h-6'/>
                        <span>Sign In with Google</span>
                    </button>
                    <a onClick={()=>navigate('/register')} className='text-center underline text-gray-600 cursor-pointer'>New here? Register</a>
                </div>
            </div>
            <div className=' mx-10 mb-10 lg:my-10 flex justify-center items-center'>
                <img src="https://img.freepik.com/free-vector/mosquito-bite-concept-illustration_114360-9240.jpg?t=st=1732682928~exp=1732686528~hmac=d62a7f821d7ac17417eda993c606f7e41e9751323e02aeb2ecb8a08c26ef6402&w=1060" alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Login