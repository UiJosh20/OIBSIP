import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const UserNavbar = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const cartDisplayURL = "http://localhost:3000/user/displayCart";
  const [cartBadge, setCartBadge] = useState(null)

useEffect(() => {
  axios.get(cartDisplayURL,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  .then((res)=>{
    setCartBadge(res.data.items.length)
  })
},[])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xaf;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <>
      <nav className="bg-green-800 lg:py-1 text-white text-center w-full">
        <small>We open at 9:00AM</small>
      </nav>
      <nav className="shadow-md lg:py-3 lg:px-10 px-4 py-2 flex justify-between items-center sticky top-0 bg-white z-10">
        <Link to="/user/dashboard">
          <h1 className="logop">PIZZACLE</h1>
        </Link>
        <div className="lg:flex items-center gap-2 hidden">
          <div className="border-2 border-gray-200 rounded-md px-5">
            <input
              type="text"
              placeholder="Search for pizza, side dish and drinks"
              className="outline-none border-none p-2"
            />
          </div>

          <span className="bg-green-700 w-full p-2 rounded-md text-white text-center shadow-md me-10">
            <button>Search</button>
          </span>

          <div className="space-x-10 flex items-center">
            <Link to="/user/cart" className="flex items-center gap-2">
              <span class="material-symbols-outlined">shopping_cart</span>
              <span>Cart</span>
              <div className="text-white bg-green-600 rounded-full px-1 font-bold ">
               <p>{cartBadge}</p> 
              </div>
            </Link>
            <Link to="/user/cart" className="flex items-center gap-2">
              <span class="material-symbols-outlined">help</span>
              <span>Help</span>
            </Link>

            <div
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="flex space-x-3 items-center"
            >
              <Stack direction="row" spacing={2}>
                <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
              </Stack>
              <span className="material-symbols-outlined cursor-pointer">
                expand_more
              </span>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Orders</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          className="gap-5 items-center lg:hidden flex"
        >
          <span class="material-symbols-outlined">search</span>
          <Link to="/user/cart">
            <span class="material-symbols-outlined">shopping_cart</span>
          </Link>
          <Stack direction="row" spacing={2}>
            <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
          </Stack>
          <span
            class="material-symbols-outlined cursor-pointer"
            onClick={handleClick}
          >
            menu
          </span>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Orders</MenuItem>
          <MenuItem onClick={handleClose}>Help</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </nav>
    </>
  );
};

export default UserNavbar;
