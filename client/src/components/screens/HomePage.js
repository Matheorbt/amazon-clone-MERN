import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ItemsGrid from "./items/ItemsGrid";

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
      <ItemsGrid />
      <div className="flex flex-col justify-center items-center w-full ">
        <button onClick={() => logoutHandler()} className="btn-warning">
          Log out
        </button>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
