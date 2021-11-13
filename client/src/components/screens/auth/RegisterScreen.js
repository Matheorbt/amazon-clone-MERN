import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AmazonLogo from "../../../assets/logo/Amazon-logo_black.png";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/homepage");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
          lastName,
          firstName,
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
        className="min-w-[250px] w-[20%] fixed top-0"
        src={AmazonLogo}
        alt="amazon logo"
      />
      <form onSubmit={registerHandler} action="" className="form-auth">
        <h3 className="text-2xl font-bold">Register</h3>
        {error && <span className="text-warning font-bold">{error}</span>}
        <div className="form-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Prénom:</label>
          <input
            type="text"
            required
            id="firstName"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            required
            id="lastName"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">
          Register
        </button>

        <span className="italic">
          Already have an account ?{" "}
          <Link style={{ color: "#5185F3" }} to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;
