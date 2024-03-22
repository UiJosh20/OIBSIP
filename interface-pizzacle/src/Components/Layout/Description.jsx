import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const Description = () => {
  const menuURL = 'http://localhost:3000/user/pizzaMenu';

    const { id } = useParams()
    const [description, setPizzaDescription] = useState([{})
    useEffect(() => {
        axios.get(menuURL)
        .then((response) => {
          setPizzaDescription(response.data.pizzaList[id]);
          console.log(response.data.pizzaList[id])
        })
        .catch((error) => {
          console.error("Error fetching pizza:", error);
        });
    }, [id]);
  return (
    <>
    <section>
        <main>
            <img src={description.image_URL} alt="" />
        </main>
    </section>
    </>
  )
}

export default Description