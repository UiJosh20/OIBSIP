import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProductDescription = () => {
  const { id } = useParams();
  const menuURL = "http://localhost:3000/user/pizzaMenu";
  const cartURL = "http://localhost:3000/user/cart"
  const statesAPI =
    "https://api.census.gov/data/2019/acs/acs1?get=NAME&for=state:*";

  const [description, setPizzaDescription] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedState, setSelectedState] = useState("New York");
  const [states, setStates] = useState([]);
  const [successfulMsg, setSuccessfullMsg] = useState(null);
  

  useEffect(() => {
    axios
      .get(menuURL)
      .then((response) => {
        setPizzaDescription(response.data[id]);
      })
      .catch((error) => {
        console.error("Error fetching pizza:", error);
      });

    axios
      .get(statesAPI)
      .then((response) => {
        const stateNames = response.data.map((state) => state[0]);
        setStates(stateNames);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    axios.post(
      cartURL,
      {
        image: description.image_URL,
        name: description.name,
        price: description.price,
        productId: description.id,
        quantity: quantity
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
  .then((res)=>{
      console.log(res.data);
      setSuccessfullMsg(res.data.message);
  }).catch((err)=>{
    console.error(err);
  })
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <>
      <section className="bg-gray-200 h-screen lg:px-5 lg:py-5 lg:flex block gap-5">
        <main className="bg-white lg:flex lg:items-center ">
          <div>
      <Link to='/user/dashboard' className="lg:px-10 px-5 underline">Go back to Shop</Link>
            <img src={description.image_URL} alt="" />
          </div>
          <div className=" lg:px-0 px-4" >
            <h1 className="text-3xl font-bold mb-3">{description.name}</h1>
            <p className="text-gray-500 mb-3">Price: ${description.price}</p>
            <p className="text-gray-500 mb-3">
              Description: {description.description}
            </p>
            <div className="flex items-center">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded-l-md me-4"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="bg-black text-white px-3 py-1 rounded-r-md ms-4"
              >
                +
              </button>
            </div>
            <div className="lg:pe-10 ">
              <Button
                variant="contained"
                onClick={addToCart}
                className="!bg-green-700 text-white !p-4 rounded-md !mt-4  w-full"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </main>
        <main className="bg-white  w-96">
          <div className="border-b border-gray-200 py-3 px-5">
            <p>DELIVERY</p>
          </div>
          <div className="border-b border-gray-200 py-3 px-5">
            <p>
              Free delivery on the first three daily orders in New york, Oregon,
              Texas
            </p>
          </div>
          <div className="border-b border-gray-200 py-10 px-5">
            <InputLabel id="state-label">Choose Your Location</InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="state-label"
                id="state-select"
                value={selectedState}
                onChange={handleStateChange}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="px-3 pt-7 flex  space-x-5">
              <div className="py-3">
                <span class="material-symbols-outlined">local_shipping</span>
              </div>
              <div>
                <p>Door Delivery</p>
                <p className="text-green-700 font-bold">Delivery Fees $5</p>
                <p>
                  Ready for delivery between 20 & 30 minutes when you order
                  within the next 2min
                </p>
              </div>
            </div>

            <div className="px-3 py-5 flex  space-x-5">
              <div className="py-3">
                <span class="material-symbols-outlined">redeem</span>
              </div>
              <div>
                <p>PickUp station</p>
                <p className="text-green-700 font-bold">Delivery Fees $2</p>
                <p>
                  Ready for delivery between 20 & 30 minutes when you order
                  within the next 2min
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ProductDescription;
