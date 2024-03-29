import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserDashboard = () => {
  const [tokenMatch, setTokenMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState([])
    const exploreRef = useRef(null);


  const TokenURL = "http://localhost:3000/user/verifyToken";
  const menuURL = 'http://localhost:3000/user/pizzaMenu';
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        navigate("/user/login");
      }

      axios
        .post(TokenURL, { token })
        .then((response) => {
          if (token === response.data.token) {
            setLoading(false);
            setTokenMatch(true);
          } else {
            console.log("Token doesn't match");
            navigate("/user/login");
            setLoading(true);
            setTokenMatch(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          setLoading(false);
          setTokenMatch(false);
          navigate("/user/login");
        });
    };

    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        navigate("/user/login");
      }
    }, 3000);

    checkToken();

    axios.get(menuURL)
    .then((response) => {
      setMenu(response.data)

    })

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate, loading]);

    const handleExploreClick = () => {
      exploreRef.current.scrollIntoView({ behavior: "smooth" });
    };

  return (
    <>
      <section className="bg-gray-100 h-full lg:px-5 lg:py-5">
        <main className="bg-white lg:p-20 p-10 pexels justify-center">
          <h1 className="landingText text-white text-center mt-10 lg:mb-10 mb-20">
            PIZZACLE
          </h1>
          <div className="space-x-10 flex justify-center">
            <Button
              variant="contained"
              className="!bg-green-700 !p-3 w-60 text-white"
            >
              Menu
            </Button>

            <Button
              variant="contained"
              onClick={handleExploreClick}
              className="!bg-white  !p-3 w-60 !text-black"
            >
              Explore
            </Button>
          </div>
        </main>
        <div ref={exploreRef}>
          <main className="bg-white lg:mt-10">
            <div className="bg-green-900 w-full p-2 text-white text-center">
              <p>You have a big appetite?</p>
            </div>
            <div className=" h-fit flex justify-center flex-wrap lg:px-7 lg:bg-white bg-gray-200 px-4 lg:py-10 py-3 gap-5">
            {menu.map((pizza, i) => (
                <Link to={`/user/description/${i}`}  key={pizza.id} className="max-w-sm rounded overflow-hidden shadow-lg w-full !bg-white">
                  <img
                    className="w-full"
                    src={pizza.image_URL}
                    alt={pizza.name}
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{pizza.name}</div>
                    <p className="text-gray-700 text-base">{pizza.description}</p>
                    <p className="text-white text-base bg-green-700 p-2 w-32 rounded-md text-center my-5">Price: ${pizza.price}</p>
                  </div>
                </Link>
              ))}

              
             
            </div>
          </main>
        </div>

        <main className="bg-white mt-10">
          <div className="bg-green-900 w-full py-2 px-10 text-white flex justify-between">
            <p>You want to step down your meal?</p>

            <Link to="/user/product/all">See more</Link>
          </div>
          <div className="h-screen "></div>
        </main>
      </section>
    </>
  );
};

export default UserDashboard;
