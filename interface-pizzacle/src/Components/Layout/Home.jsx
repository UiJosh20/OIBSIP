import { Link } from "react-router-dom"


const Home = () => {
  return (
    <>
      <section className="bg-black h-screen text-white flex  !overflow-y-hidden bgImg">
        {/* <video src="https://assets.mixkit.co/videos/preview/mixkit-cooking-pizza-in-a-traditional-oven-32415-large.mp4" loop autoPlay className="w-full absolute lg:block hidden"></video> */}
        <div className="motto lg:mt-20 z-10 mt-5 lg:text-left text-center lg:px-20 p-3">
          <h1>Pizza at it's overall pinnacle</h1>
          <p>We deliver anywhere, with an all-round speed...</p>

          <Link to='/user/login' className="button">
          <button  className="bg-green-800 p-3 rounded-md lg:mt-3  mt-20 w-80">Order now</button>
          </Link>
        </div>


      </section>
     
    </>
  )
}

export default Home