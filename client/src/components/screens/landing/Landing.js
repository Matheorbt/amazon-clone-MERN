import React from "react";
import { Link } from "react-router-dom";

import AmazonLogo from "../../../assets/logo/Amazon-logo_black.png";
import FooterImage from "../../../assets/footer/footer-visual.svg";

const HomePage = ({ history }) => {
  return (
    <main className="flex flex-col gap-4 items-center justify-start min-h-screen mx-4">
      <img
        className="min-w-[250px] w-[15%] cursor-pointer mt-4"
        src={AmazonLogo}
        alt="amazon logo"
        onClick={() => history.push("/landing")}
      />

      <h1>
        All rights reserved to Amazon{" "}
        <i className="fa fa-copyright" aria-hidden="true"></i>
      </h1>
      <br />
      <h1 className="text-xl font-bold">Welcome,</h1>
      <br />
      <h1>
        This project is for training purposes only and is inspired by{" "}
        <a className="underline" href="https://www.amazon.fr/">
          Amazon
        </a>
      </h1>

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
