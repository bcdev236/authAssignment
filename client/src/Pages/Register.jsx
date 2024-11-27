import React, { useState } from 'react';
import { publicRequest } from '../RequestMethods';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';


const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await publicRequest.post('api/auth/register', { 
                name: name,
                email: email,
                password: password,
            });
            console.log(response);
            if(response) setMessage("User created! Please login to continue.")
        } catch (err) {
            setError("Something went wrong, please try again");
        }
    };
    

  return (
    <>
    <Navbar/>
    <div className=' min-h-screen bg-gray-100 flex justify-center'>
        <div className=' mx-8 my-10 bg-white shadow-xl rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:mx-48 lg:my-24'>
            <div className=' mx-4 mt-6 lg:my-20'>
                <h1 className=' text-center font-bold text-2xl text-gray-700 lg:py-2 lg:px-4'>Create your account</h1>
                {error && <p className="text-red-500 text-center my-5">{error}</p>}
                {message && <p className="text-green-500 text-center my-5">{message}</p>}
                <div className=' flex flex-col mx-4 mt-2'>
                    <input placeholder='Name' type='name' value={name} onChange={(e) => setName(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' required></input>
                    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300' required></input>
                    <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' my-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300'></input>
                    
                    <button onClick={handleRegister} className=' my-3 w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500 transition duration-300'>Register</button>
                    <a onClick={()=>navigate('/login')} className='text-center underline text-gray-600 cursor-pointer'>Go to Login Page</a>
                </div>
            </div>
            <div className=' mx-10 mb-10 lg:my-10 flex justify-center items-center'>
                <img src="https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8515.jpg?t=st=1732684341~exp=1732687941~hmac=b0b0f8fc560183c0bb1616f8389ce7e618fa32f86af7448b84063e11d2542b96&w=1060" alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Register