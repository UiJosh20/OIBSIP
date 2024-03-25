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
        <section>
        <div>
      <h1>Cart</h1>
      {cartData && cartData.items.map(item => (
        <div key={item.productId}>
          <img src={item.image} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
        </section>
    </>
  )
}

export default UserCart