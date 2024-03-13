import Footer from "./Footer"
import Navbar from "./Navbar"
import {Outlet} from "react-router-dom"


const Landing = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}

export default Landing