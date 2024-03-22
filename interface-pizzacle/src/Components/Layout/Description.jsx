import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const Description = () => {
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
        <main className="bg-white">
          <div>
            <img src={description.image_URL} alt="" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-3">{description.name}</h1>
            <p className="text-gray-500 mb-3">{description.price}</p>
            <p className="text-gray-500 mb-3">{description.description}</p>
            <Link to="/menu" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"></Link>
          </div>
        </main>
    </section>
    </>
  )
}

export default Description