import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductDescription = () => {
  const { id } = useParams()
  const menuURL = 'http://localhost:3000/user/pizzaMenu';
    const [description, setPizzaDescription] = useState([])

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
  return (
    <>
    <section className="bg-gray-200 h-full px-5 py-5">
        <main className="bg-white lg:flex lg:items-center">
          <div>
            <img src={description.image_URL} alt="" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3">{description.name}</h1>
            <p className="text-gray-500 mb-3">Price : ${description.price}</p>
            <p className="text-gray-500 mb-3">Description : {description.description}</p>
            
          </div>
        </main>
    </section>
    </>
  )
}

export default ProductDescription