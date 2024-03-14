// import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
// const [first, setfirst] = useState()

  return (
    <>
      <nav className=" flex lg:px-10 lg:py-4 items-center justify-between border-t-2 border-green-700 bg-black text-white fixed w-full z-50">
        <Link to="/">
          <h5>PIZZACLE</h5>
        </Link>
        <ul className="flex gap-12 list-none items-center ">
          <Link to='/about' className="homelink">About</Link>
          <Link to='/product' className="homelink">Our product</Link>
          <Link to='/user/register' className="homelink">Join Us</Link>
          <Link to='/user/login' className="btn bg-green-700 p-2 w-20 rounded-md text-center">Login</Link>
        </ul>

      </nav>
    </>
  )
}

export default Navbar