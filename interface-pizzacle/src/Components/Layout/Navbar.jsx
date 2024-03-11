import { NavLink } from "react-router-dom"

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
      <nav className="flex justify-between border border-red-300">
        <div>
          <h5>LOGO</h5>
        </div>
        <div className="border border-red-300">
            {
              Navlink.map((links, i)=>{
                <div key={i} >
                <NavLink to={links.path}>
                  {links.pathname}
                </NavLink>
                </div>

              })
            }
        </div>
      </nav>
    </>
  )
}

export default Navbar