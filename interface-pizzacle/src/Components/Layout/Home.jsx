

const Home = () => {
  return (
    <>
      <section className="bg-black h-screen text-white flex  !overflow-y-hidden bgImg">
        <video src="https://assets.mixkit.co/videos/preview/mixkit-cooking-pizza-in-a-traditional-oven-32415-large.mp4" loop autoPlay className="w-full absolute "></video>
        <div className="motto mt-32 z-10">
          <h1>Pizza at it's overall pinnacle</h1>
          <p>We deliver anywhere, with an all-round speed...</p>
          <button className="bg-green-800 p-3 rounded-md mt-3 w-80">Order now</button>
        </div>


      </section>
     
    </>
  )
}

export default Home