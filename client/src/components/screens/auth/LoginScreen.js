import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AmazonLogo from "../../../assets/logo/Amazon-logo_black.png";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/homepage");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/homepage");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <img
        className="min-w-[250px] w-[15%] fixed top-0"
        src={AmazonLogo}
        alt="amazon logo"
      />
      <form onSubmit={loginHandler} action="" className="form-auth">
        <h3 className="text-2xl font-bold">Login</h3>
        {error && <span className="text-warning font-bold">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">
            Password:{" "}
            <Link
              to="/forgotpassword"
              tabIndex={4}
              style={{ color: "#5185F3", fontSize: "1rem" }}
            >
              Forgot Password ?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>

        <button type="submit" className="btn-primary" tabIndex={3}>
          Login
        </button>

        <span className="italic">
          Don't have an account ?{" "}
          <Link style={{ color: "#5185F3" }} to="/register">
            Register
          </Link>
        </span>
      </form>
      <footer className="fixed bottom-0 w-screen flex">
        <div className="w-[100%]  bg-main-orange h-24"></div>
        <div className="w-[100%]  bg-main-blue h-24"></div>
      </footer>
    </div>
  );
};

export default LoginScreen;
