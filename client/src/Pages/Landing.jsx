import React, { useContext } from 'react';
import { AuthContext } from '../authContext';
import { publicRequest } from '../RequestMethods';
import Navbar from '../Components/Navbar'

const Landing = () => {
    const { user } = useContext(AuthContext);

  return (
    <>
    <Navbar/>
    <div className=' min-h-screen bg-gray-100 flex justify-center'>
        <div className=' mx-8 my-20 bg-white shadow-xl rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:mx-48 lg:my-28'>
            <div className=' mx-4 mt-20 lg:my-20 flex justify-center items-center gap-x-4'>
                <h1 className=' font-bold lg:text-3xl text-green-500'>Welcome</h1>
                <h1 className=' font-bold lg:text-3xl text-gray-700'>{user.name}</h1>
            </div>
            <div className=' mx-10 mb-10 lg:my-10 flex justify-center items-center'>
                <img src="https://img.freepik.com/free-vector/ecosystem-concept-illustration_114360-6125.jpg?t=st=1732684584~exp=1732688184~hmac=e3f633714fa8f62821901fc23aab2a6ad9c548a4b6cc8fc642f4dee587ccf950&w=1480" alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Landing