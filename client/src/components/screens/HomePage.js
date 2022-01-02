import { useEffect } from "react";
import React from "react";

import ItemsGrid from "./items/ItemsGrid";
import Navbar from "./Navbar";
import Carousel from "../misc/Carousel";

const HomePage = ({ history }) => {
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    console.clear();
    history.push("/login");
  };

  return (
    <>
      <Navbar history={history} />
      <Carousel />
      <ItemsGrid />
      <div className="flex flex-col justify-center items-center w-full ">
        <button onClick={() => logoutHandler()} className="btn-warning my-2">
          Log out
        </button>
      </div>
    </>
  );
};

export default HomePage;
