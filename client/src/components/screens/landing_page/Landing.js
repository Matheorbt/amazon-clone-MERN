import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AmazonLogo from "../../../assets/logo/Amazon-logo_black.png";
import FooterImage from "../../../assets/footer/footer-visual.svg";

const HomePage = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
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
    <main className="flex flex-col items-center justify-start min-h-screen">
      <img
        className="min-w-[250px] w-[15%] cursor-pointer"
        src={AmazonLogo}
        alt="amazon logo"
        onClick={() => history.push("/landing")}
      />

      <h1>
        All rights reserved to Amazon{" "}
        <i class="fa fa-copyright" aria-hidden="true"></i>
      </h1>
      <br />
      <h1 className="text-xl font-bold">
        Welcome, thanks for giving a shoot to my project
      </h1>
      <br />
      <h1>
        This project is for training purposes only and is inspired by{" "}
        <a className="underline" href="https://www.amazon.fr/">
          Amazon
        </a>
      </h1>
      <p className="m-8">
        It is a project realized in X months aiming at reproducing some
        functionalities of the Amazon online sales platform like:
        <br />
        -The creation of an account
        <br />
        -The possibility to access a list of items by applying a certain filter
        <br />
        -Manage your profile information
        <br />
        -Managing a shopping cart and "wish list
        <br />
        -Suggest products according to the user's search history
        <br />
        -etc... (expand)
      </p>
      <div className="flex gap-4">
        <Link to="/login">
          <span className="btn-primary">Access the platform</span>
        </Link>
      </div>

      <footer className="fixed bottom-0 w-screen flex z-[-1] left-0">
        <img
          alt="footer visual w-[100%]"
          src={FooterImage}
          className="w-screen"
        />
      </footer>
    </main>
  );
};

export default HomePage;
