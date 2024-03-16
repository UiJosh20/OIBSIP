import { Link } from "react-router-dom"


const UserNavbar = () => {
  return (
    <>
    <nav className="bg-green-800 lg:py-1 text-white text-center">
      <small>We open at 9:00AM</small>
    </nav>
    <nav className="shadow-md lg:py-3 lg:px-10 flex justify-between items-center">
      <div>
        <h1>PIZZACLE</h1>
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
  )
}

export default UserNavbar