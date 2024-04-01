import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from "@mui/icons-material/Delete";

const UserCart = () => {
  const cartDisplayURL = "http://localhost:3000/user/displayCart";
  const [cartData, setCartData] = useState(null);
  const [cartAmount, setCartAmount] = useState(0);
  const [cartPrices, setCartPrices] = useState(0);
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
      <section className="bg-white lg:px-10 lg:py-5 lg:flex gap-4 px-3 h-fit">
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
               <DeleteIcon onClick={() => handleDeleteItemClick(item.productId)} className=" moveIcon"/>

                <DeleteIcon onClick={() => handleDeleteItemClick(item.productId)} className="moveIcon2"/>
                </div>
          
                  
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
        <div className="bg-white lg:w-96 lg:h-80 sticky top-20 border " ref={exploreRef}>
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
          <div className="lg:px-3 relative top-32">
            <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded-md w-full">Check out</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCart;
