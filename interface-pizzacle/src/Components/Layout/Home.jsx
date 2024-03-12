import heroImg from "../../assets/pssss-removebg-preview.png"

const Home = () => {
  return (
    <>
      <section className="bg-black h-screen text-white flex overflow-hidden">
        <div className="motto flex items-center">
          <h1>Pizza at it's overall pinnacle</h1>
        </div>
        <div className="relative left-80">
        <img src={heroImg} alt="hero image" />
        </div>

      </section>
      <section className="bg-green-700 h-screen text-white">
      <div className="circle"></div>
        <div className="motto">
          <h1>Pizza at it's overall pinnacle</h1>
        </div>
        <div>
        </div>
      </section>
     
    </>
  )
}

export default Home