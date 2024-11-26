import React, { useState } from 'react';
import { publicRequest } from '../RequestMethods';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // console.log(email, password)
            const response = await publicRequest.post('/api/auth/login', { email: email, password: password });
            const user = response.data.user;
            console.log("Login Successful", response);

            localStorage.setItem('user', JSON.stringify(user));
            const storedUser = JSON.parse(localStorage.getItem('user'));
            console.log("navigating...",storedUser)
            navigate('/');
            
        } catch (err) {
            setError("Wrong Credentials");
        }
    };

    const googleAuth = async (e) => {
        window.open(
            // `${process.env.SERVER_URL}/api/oauth/callback`,
            `http://localhost:4000/api/oauth/callback`,
            '_self'
        );

        // const user = response.data;
        console.log("Login successful with google");
    };

  return (
    <div className=' min-h-screen bg-gray-100 flex justify-center'>
        <div className=' mx-8 my-20 bg-white shadow-xl rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:mx-48 lg:my-28'>
            <div className=' mx-4 mt-20 lg:my-20'>
                <h1 className=' text-center font-bold text-2xl text-indigo-700 lg:py-4 lg:px-4'>Sign in to your account</h1>
                {error && <p className="text-red-500 text-center mb-5">{error}</p>}
                <div className=' flex flex-col mx-4 my-4'>
                    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className=' my-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' required></input>
                    <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' my-4 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'></input>
                    <button onClick={handleLogin} className=' my-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300'>Login</button>
                    <button onClick={googleAuth}>
                        <img src='https://www.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_32704485.htm#fromView=search&page=1&position=0&uuid=dc977af6-11f9-481a-900b-a249a2e6c2c5'/>
                        <span>Sign In with Google</span>
                    </button>
                    <p>
                        New Here? <Link to='/register' className=' text-indigo-500'>Register</Link>
                    </p>
                </div>
            </div>
            <div className=' mx-10 mb-10 lg:my-10'>
                <img src="https://img.freepik.com/free-vector/business-man-working-hard-stock-financial-trade-market-diagram-vector-illustration-flat-design_1150-39773.jpg?size=626&ext=jpg&ga=GA1.1.1854925931.1649082367&semt=sph" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Login