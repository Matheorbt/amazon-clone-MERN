import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import ItemsGrid from "./items/ItemsGrid";
import Navbar from "./Navbar";

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
      {/* <div className="grid grid-cols-3 grid-rows-3 gap-10">
        <div className="bg-warning  row-start-1 row-end-3">1</div>
        <div className="bg-success col-start-2">2</div>
        <div className="bg-main-blue col-start-2 ">3</div>
      </div> */}
      <Navbar />
      <ItemsGrid />
      <div className="flex flex-col justify-center items-center w-full ">
        <button onClick={() => logoutHandler()} className="btn-warning">
          Log out
        </button>
      </div>
    </>
  );
};

export default HomePage;
