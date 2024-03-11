import { Link, NavLink } from "react-router-dom"

const Navbar = () => {

  const Navlink = [
    {
      path: "/About",
      pathname: "About"
    },
    {
      path: "/News",
      pathname: "News"
    },
    {
      path: "/user/register",
      pathname: "SignUp"
    },
    {
      path: "/user/login",
      pathname: "Get yours now"
    }
  ]

  return (
    <>
      <nav className=" border-t-2 border-green-700 bg-black text-white">
        <div>
          <h5>LOGO</h5>
        </div>
          <ul className="border border-white p-10 !text-white">
            {
              Navlink.map((item, i)=>{
                <div key={i} >
                  <NavLink to={item.path} className="text-white">
                    {item.pathname}
                  </NavLink>
                </div>
              })
            }
          </ul>
    
      </nav>
    </>
  )
}

export default Navbar