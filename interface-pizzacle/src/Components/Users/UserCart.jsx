import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardElement, useStripe } from "@stripe/react-stripe-js";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};


const UserCart = () => {
  const cartDisplayURL = "http://localhost:3000/user/displayCart";
  const paymentUrl =  "http://localhost:3000/user/checkout"
  const [cartData, setCartData] = useState(null);
  const [cartAmount, setCartAmount] = useState(0);
  const [cartPrices, setCartPrices] = useState(0);
  const [error, setError] = useState(null);
  const exploreRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const stripe = useStripe();


  

  useEffect(() => {
    axios
      .get(cartDisplayURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
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

  const checkOut = () => {
    axios
      .post(
        paymentUrl,
        {
          cartItems: cartData.items,
          totalPrice: cartPrices,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        const { sessionId } = data;
        stripe.redirectToCheckout({
          sessionId: sessionId,
        }).then((result) => {
          if (result.error) {
            setError(result.error.message);
            console.error("Error redirecting to checkout:", result.error);
          }
        });
      })
      .catch((error) => {
        setError("An error occurred during checkout.");
        console.error("Checkout error:", error);
      });
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
                <div>
                <DeleteIcon onClick={() => handleDeleteItemClick(item.productId)} className="moveIcon2"/>
               
                </div>
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
            <button type="submit" className="bg-green-700 text-white py-2 px-4 rounded-md w-full" onClick={handleOpen}>Check out</button>
            
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Are you sure you want to checkout?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Note that when you agree to checkout you have accepted that you are satisfied with your items.
          </Typography>
          <div className="flex gap-10 mt-10">
          <Button variant="contained" className="!bg-green-700 text-white py-2 px-4 rounded-md w-full mt-4 font-bold" onClick={checkOut}>PROCEED</Button>
          <Button variant="contained" className="!bg-gray-400 text-black py-2 px-4 rounded-md w-full mt-4" onClick={handleClose}>CLOSE</Button>
          </div>
        </Box>
      </Modal>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCart;
