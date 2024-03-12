// import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
// const [first, setfirst] = useState()

  return (
    <>
      <nav className=" flex lg:px-20 lg:py-4 items-center justify-between border-t-2 border-green-700 bg-black text-white fixed w-full">
        <div>
          <h5>LOGO</h5>
        </div>
        <ul className="flex gap-7">
          <Link to='/about'>About</Link>
          <Link to='/product'>Our product</Link>
          <Link to='/user/register'>Join Us</Link>
          <Link to='/user/login'>Get yours now</Link>

        </ul>

      </nav>
    </>
  )
}

export default Navbar