import heroImg from "../../assets/pssss-removebg-preview.png"
import pizza from "../../assets/pizza.png"

const Home = () => {
  return (
    <>
      <section className="bg-black h-screen text-white flex overflow-hidden border-b-2 border-green-500">
        <div className="motto mt-32">
          <h1>Pizza at it's overall pinnacle</h1>
          <p>We deliver anywhere, with an all-round speed...</p>
          <button className="bg-green-800 p-3 rounded-md mt-3 w-80">Order now</button>
        </div>
        <div className="relative left-80">
        <img src={heroImg} alt="hero image" />
        </div>

      </section>
      <section className="bg-black h-full text-white">
    
        <div className="card w-full flex items-center">
          <img src={pizza} alt="" />
          <div>
            <h1 className="text-3xl">Pizza</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, que.</p>
          </div>
        </div>

        <div className="card w-full flex items-center">
          <div>
            <h1 className="text-3xl">Pizza</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, que.</p>
          </div>
          <img src={pizza} alt="" />
        </div>


        <div>
        </div>
      </section>
     
    </>
  )
}

export default Home