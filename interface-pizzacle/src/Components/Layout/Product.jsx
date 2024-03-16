import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const Product = () => {
  return (
    <>
    <section className="bg-gray-200 h-full px-10 py-5">
      
        <main className="bg-white">
          <div className="bg-green-900 w-full p-2 text-white text-center">
              <p>You have a big appetite?</p>
          </div>
          <div className="h-screen ">

          </div>
        </main>

        <main className="bg-white mt-10">
          <div className="bg-green-900 w-full py-2 px-10 text-white flex justify-between">
              <p>You want to step down your meal?</p>

              <Link to='/user/product/all'>See more</Link>
          </div>
          <div className="h-screen ">
              
          </div>
        </main>
    </section>
    </>
  )
}

export default Product