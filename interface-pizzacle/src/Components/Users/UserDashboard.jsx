import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {

  return (
    <>
          <section className="bg-gray-200 h-full px-10 py-5">
            <main className="bg-white p-20 pexels justify-center">
              <h1 className="landingText text-white text-center mt-10 mb-10">
                PIZZACLE
              </h1>
              <div className="space-x-10 flex justify-center">
                <Button
                  variant="contained"
                  className="!bg-green-700 !p-3 w-60 text-white"
                >
                  Menu
                </Button>
                <Button
                  variant="contained"
                  className="!bg-white  !p-3 w-60 !text-black"
                >
                  Explore
                </Button>
              </div>
            </main>
            <main className="bg-white mt-10">
              <div className="bg-green-900 w-full p-2 text-white text-center">
                <p>You have a big appetite?</p>
              </div>
              <div className="h-screen "></div>
            </main>

            <main className="bg-white mt-10">
              <div className="bg-green-900 w-full py-2 px-10 text-white flex justify-between">
                <p>You want to step down your meal?</p>

                <Link to="/user/product/all">See more</Link>
              </div>
              <div className="h-screen "></div>
            </main>
          </section>
      
    </>
  )
};

export default UserDashboard;
