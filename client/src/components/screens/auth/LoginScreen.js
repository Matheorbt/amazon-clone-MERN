import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./LoginScreen.css";

import AmazonLogo from "../../../assets/logo/Amazon-logo_black.png";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      hearder: {
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

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <img className="login-screen__logo" src={AmazonLogo} alt="amazon logo" />
      <form onSubmit={loginHandler} action="" className="login-screen__form">
        <h3 className="login-screen__title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">
            Password:
            <Link
              to="/forgotpassword"
              className="login-screen__forgotpassword"
              tabIndex={4}
            >
              Forgot Password ?
            </Link>
          </label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>

        <button type="submit" className="btn btn-primary" tabIndex={3}>
          Login
        </button>

        <span className="register-screen__subtext">
          Don't have an account ?<Link to="/register">Register</Link>
        </span>
      </form>
      <footer className="footer-container">
        <div className="footer-container__square orange-square"></div>
        <div className="footer-container__square blue-square"></div>
      </footer>
    </div>
  );
};

export default LoginScreen;
