import { Alert } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";


const UserCart = () => {
  const cartDisplayURL = "http://localhost:3000/user/displayCart"
  const [cartData, setCartData] = useState(null);
 useEffect(() => {
axios.get(
  cartDisplayURL,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
)
.then((res)=>{
console.log(res.data)
setCartData(res.data)
}).catch((err)=>{
console.log(err)
})
 

 }, [])
 
  return (
    <>
        <section className="bg-gray-100 lg:px-10 lg:py-5 lg:flex gap-4">
        
        <div className="w-full">
      {cartData && cartData.items.map(item => (
        <div key={item.productId}  className="shadow-md flex items-center mb-3 rounded-md bg-white space-x-4">
          <img src={item.image} alt={item.name} width={180} />
          <div>
          <h1 className="text-xl font-bold mb-3">{item.name}</h1>
          <p>$ {item.price}</p>
          <p>Quantity: &nbsp; {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-white lg:w-96">
        <div className="border-b border-gray-200 lg:p-3">
          <p>CART SUMMARY</p>
        </div>
        <div className="lg:p-3">
          <p>item total</p>
        </div>
    </div>
        </section>
    </>
  )
}

export default UserCart