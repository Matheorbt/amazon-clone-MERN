import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import carouselTest from "../../assets/logo/Amazon-logo_black.png";

import Navbar from "./Navbar";
import Account from "./Account";

const HomePage = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    console.clear();
    history.push("/login");
  };
  return (
    <>
      <Navbar />
      <Account />
      <div className="flex flex-col justify-center items-center w-full ">
        <button onClick={() => logoutHandler()} className="btn-warning">
          Log out
        </button>
      </div>
    </>
  );
};

export default HomePage;
