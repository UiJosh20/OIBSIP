import { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const UserLayout = () => {
  const TokenURL = "http://localhost:3000/user/verifyToken";
  const [loading, setLoading] = useState(true);
  const [tokenMatch, setTokenMatch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        navigate("/user/login");
        return; 
      }

      axios
        .post(TokenURL, { token })
        .then((response) => {
          if (token === response.data.token) {
            setLoading(false);
            setTokenMatch(true);
          } else {
            console.log("Token doesn't match");
            setLoading(false);
            setTokenMatch(false);
            navigate("/user/login");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setLoading(false);
          setTokenMatch(false);
          navigate("/user/login");
        });
    };
    checkToken();


  }, [navigate]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen flex-col bg-black">
          <p className="logo1 !text-5xl mb-10 text-white">PIZZACLE</p>
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <>
          <UserNavbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default UserLayout;
