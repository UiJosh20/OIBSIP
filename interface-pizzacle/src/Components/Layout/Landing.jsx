import Navbar from "./Navbar"
import {Outlet} from "react-router-dom"


const Landing = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Landing