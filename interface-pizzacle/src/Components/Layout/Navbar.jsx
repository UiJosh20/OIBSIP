import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className="bg-green-800 lg:py-1 text-white text-center ">
        <small>We open at 9:00AM</small>
      </nav>
      <nav className="shadow-md lg:py-3 lg:px-10 flex justify-between items-center sticky top-0 bg-black text-white z-50 p-3">
        <Link to="/home">
          <h1 className="logop">PIZZACLE</h1>
        </Link>

        <div className="lg:hidden block">
          <div
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="flex space-x-3 items-center"
          >
            <span
              class="material-symbols-outlined cursor-pointer"
              onClick={toggleDrawer(true)}
            >
              menu
            </span>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link to="/blog">Blog</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/product">Products</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/user/login">Login</Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="space-x-5 lg:block hidden">
          <Link to="/blog" className="homelink">
            Blog
          </Link>
          <Link to="/product" className="homelink">
            Our product
          </Link>
          <Link to="/user/register" className="homelink">
            Become a customer
          </Link>
          <Link
            to="/user/login"
            className="btn bg-green-700 p-2 w-20 rounded-md text-center"
          >
            Login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
