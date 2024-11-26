
const Landing = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log("landing", user);
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.open(
            `http://localhost:4000/api/oauth/logout`,
            '_self'
        );
    };

  return (
    <div className=' min-h-screen bg-gray-100 flex justify-center'>
        <div className=' mx-8 my-20 bg-white shadow-xl rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:mx-48 lg:my-28'>
            <div className=' mx-4 mt-20 lg:my-20'>
                <h1 className=' text-center font-bold text-2xl text-indigo-700 lg:py-4 lg:px-4'>Welcome {user.name}</h1>
                <div className=' flex flex-col mx-4 my-4'>
                    <button onClick={handleLogout} className=' my-4 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300'>Logout</button>
                </div>
            </div>
            <div className=' mx-10 mb-10 lg:my-10'>
                <img src="https://img.freepik.com/free-vector/business-man-working-hard-stock-financial-trade-market-diagram-vector-illustration-flat-design_1150-39773.jpg?size=626&ext=jpg&ga=GA1.1.1854925931.1649082367&semt=sph" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Landing