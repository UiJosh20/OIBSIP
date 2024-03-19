
import { useEffect, useState } from "react";
import { Link} from "react-router-dom"

const Navbar = () => {
  return (
    <>


<nav className="bg-green-800 lg:py-1 text-white text-center">
      <small>We open at 9:00AM</small>
    </nav>
    <nav className="shadow-md lg:py-3 lg:px-10 flex justify-between items-center sticky top-0 bg-black text-white z-10">
      <Link to="/home">
        <h1 className="logop">PIZZACLE</h1>
      </Link>
      

      <div className="space-x-5">
      <Link to='/blog' className="homelink">Blog</Link>
          <Link to='/product' className="homelink">Our product</Link>
          <Link to='/user/register' className="homelink">Become a customer</Link>
          <Link to='/user/login' className="btn bg-green-700 p-2 w-20 rounded-md text-center">Login</Link>
      </div>
     
    </nav>
      {/* <nav className=" flex lg:px-10 lg:py-4 items-center justify-between border-t-2 border-green-700 bg-black text-white fixed w-full z-50">
        <Link to="/">
          <h1 className="logop">PIZZACLE</h1>
        </Link>
        <ul className="flex gap-12 list-none items-center ">
          <Link to='/blog' className="homelink">Blog</Link>
          <Link to='/user/product' className="homelink">Our product</Link>
          <Link to='/user/register' className="homelink">Become a customer</Link>
          <Link to='/user/login' className="btn bg-green-700 p-2 w-20 rounded-md text-center">Login</Link>
        </ul>

      </nav> */}
      </>
  )
}

export default Navbar

