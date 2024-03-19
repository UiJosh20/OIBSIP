import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


const UserNavbar = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    {loading ? (
      <div className="flex justify-center items-center h-screen flex-col bg-black">
        <p className="logo1 !text-5xl mb-10 text-white">Pizzacle</p>
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </div>
    ) : (
      
    <>
    <nav className="bg-green-800 lg:py-1 text-white text-center">
      <small>We open at 9:00AM</small>
    </nav>
    <nav className="shadow-md lg:py-3 lg:px-10 flex justify-between items-center sticky top-0 bg-white z-10">
      <div>
        <h1 className="logop">PIZZACLE</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="border-2 border-gray-200 rounded-md px-5">
          <input type="text" placeholder="Search for pizza, side dish and drinks" className="outline-none border-none p-2"/>
        </div>
        
      <span className="bg-green-700 w-full p-2 rounded-md text-white text-center shadow-md me-10">
          <button >Search</button>
      </span>

      <div className="space-x-5">
        <Link>Account</Link>
        <Link>Cart</Link>
        <Link>Help</Link>

      </div>
      </div>
    </nav>
    </>
    )}
    </>
  )
}

export default UserNavbar