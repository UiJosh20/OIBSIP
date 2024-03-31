import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const UserCart = () => {
  const cartDisplayURL = "http://localhost:3000/user/displayCart";
  const [cartData, setCartData] = useState(null);
  const [cartAmount, setCartAmount] = useState(null);
  const [cartPrices, setCartPrices] = useState(null);
  const exploreRef = useRef(null);
  useEffect(() => {
    axios
      .get(cartDisplayURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
      console.log(res.data.items[0])
        setCartAmount(res.data.items.length);
        setCartData(res.data);
        const totalPrice = res.data.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setCartPrices(totalPrice)
      })
      .catch((err) => {
        console.log(err);
      });
  });


  const handleDeleteItemClick = (productId) => {
    axios
      .delete(`http://localhost:3000/user/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCartData((prevData) => ({
          ...prevData,
          items: prevData.items.filter((item) => item.productId !== productId),
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExploreClick = () => {
    exploreRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="bg-gray-100 lg:px-10 lg:py-5 lg:flex gap-4 px-3">
        <div className="w-full">
          {cartData &&
            cartData.items.map((item) => (
              <div
                key={item.productId}
                className="shadow-md flex items-center mb-3 rounded-md bg-white space-x-4"
              >
                <img src={item.image} alt={item.name} width={180} />
                <div>
                  <h1 className="text-xl font-bold mb-3">{item.name}</h1>
                  <p>$ {item.price}</p>
                  <p>Quantity: &nbsp; {item.quantity}</p>
                </div>
                <button
                    onClick={() => handleDeleteItemClick(item.productId)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
              </div>
            ))}
        </div>
        <div className="lg:hidden block">
          <span
            class="material-symbols-outlined text-5xl fixed top-96 left-80"
            onClick={handleExploreClick}
          >
            arrow_drop_down_circle
          </span>
        </div>
        <div className="bg-white lg:w-96 lg:h-80" ref={exploreRef}>
          <div className="border-b border-gray-200 lg:p-3 p-3">
            <p>CART SUMMARY</p>
          </div>
          <div className="lg:px-3 lg:py-2 p-3 flex justify-between">
            <p>item total</p>
            <p>{cartAmount}</p>
          </div>

          <div className="lg:px-3 lg:py-2 p-3 flex justify-between">
            <p>Price total</p>
            <p>$&nbsp;{cartPrices} . 00</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCart;
