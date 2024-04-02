import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const UserProduct = () => {


  const [pizza, setPizza] = useState([]);
  const menuURL = `https://oibsip-90i2.onrender.com/user/pizzaMenu`;

  useEffect(() => {
    axios
      .get(menuURL)
      .then((response) => {
        setPizza(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching pizza:", error);
      });
  }, []);

  return (
    <>
      <section className="bg-gray-200 h-full lg:px-10 lg:py-5 px-2 py-3">
        <main className="bg-white">
          <div className="bg-green-900 w-full p-2 text-white text-center">
            <p>Pizza with different flavour</p>
          </div>
          <div className=" h-fit flex justify-center flex-wrap px-7 py-10 gap-5">
            {pizza.map((pizza, i) => (
              <Link
                to={`/user/description/${i}`}
                key={pizza.id}
                className="max-w-sm rounded overflow-hidden shadow-lg w-full"
              >
                <img
                  className="w-full"
                  src={pizza.image_URL}
                  alt={pizza.name}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{pizza.name}</div>
                  <p className="text-gray-700 text-base">{pizza.description}</p>
                  <p className="text-white text-base bg-green-700 p-2 w-32 rounded-md text-center my-5">
                    Price: ${pizza.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <main className="bg-white mt-10">
          <div className="bg-green-900 w-full py-2 px-10 text-white flex justify-between">
            <p>You want to step down your meal?</p>
          </div>
          <div className=" h-fit flex justify-center flex-wrap px-7 py-10 gap-5">
            {/* {pizza.drinks && pizza.drinks.map((pizza) => (
                  <Link key={pizza.id} className="max-w-sm rounded overflow-hidden shadow-lg w-full">
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
  
                {pizza.sideDish && pizza.sideDish.map((pizza) => (
                  <Link key={pizza.id} className="max-w-sm rounded overflow-hidden shadow-lg w-full">
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
                ))} */}
          </div>
        </main>
      </section>
    </>
  );
};

export default UserProduct;
