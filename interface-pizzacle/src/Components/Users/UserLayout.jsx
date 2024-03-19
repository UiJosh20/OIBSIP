import { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar"
import {Outlet} from "react-router-dom"


const UserLayout = () => {
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
            <p className="logo1 !text-5xl mb-10 text-white">PIZZACLE</p>
            <div class="three-body">
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
              <div class="three-body__dot"></div>
            </div>
          </div>
        ) : (    
        <>
        <UserNavbar/>
        <Outlet/>
        </>
        )}
        </>
    )
}

export default UserLayout