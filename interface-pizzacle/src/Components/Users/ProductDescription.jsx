import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductDescription = () => {
  const { id } = useParams()
  const menuURL = 'http://localhost:3000/user/pizzaMenu';
    const [description, setPizzaDescription] = useState([])
    const [quantity, setQuantity] = useState(1); 

    useEffect(() => {
        axios.get(menuURL)
        .then((response) => {
          setPizzaDescription(response.data[id]);
          console.log(response.data[id])
        })
        .catch((error) => {
          console.error("Error fetching pizza:", error);
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
      alert("added to cart")
    };


  return (
    <>
    <section className="bg-gray-200 h-full px-5 py-5 flex gap-5">
        <main className="bg-white lg:flex lg:items-center">
          <div>
            <img src={description.image_URL} alt="" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3">{description.name}</h1>
            <p className="text-gray-500 mb-3">Price: ${description.price}</p>
            <p className="text-gray-500 mb-3">Description: {description.description}</p>
            <div className="flex items-center">
              <button className='bg-gray-500 text-white px-3 py-1 rounded-l-md me-4' onClick={decrementQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={incrementQuantity} className='bg-black text-white px-3 py-1 rounded-r-md ms-4'>+</button>
            </div>
            <div className='pe-10'>
              <Button onClick={addToCart} className='bg-green-700 text-white p-4 rounded-md mt-4 shadow-md w-full'>Add to Cart</Button>
            </div>
          </div>
        </main>
        <main className='bg-white px-5 py-5 w-96'>

        </main>
      </section>
    </>
  )
}

export default ProductDescription