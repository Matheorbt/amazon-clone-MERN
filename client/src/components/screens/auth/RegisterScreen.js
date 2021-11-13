import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AmazonLogo from "../../../assets/logo/Amazon-logo_black.png";
import FooterImage from "../../../assets/footer/footer-test.svg";

const RegisterScreen = ({ history }) => {
  //Form step index
  const [formIndex, setFormIndex] = useState(0);

  //Register step One => Next button => Check if email adress already exist in database
  const [email, setEmail] = useState("");

  //Register step Two => Next button => No condition check
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //Register step three final confirmation => Register button
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/homepage");
    }
  }, [history]);

  const handleBackAlert = (errorMessage) => {
    setError("");
    setError(errorMessage);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const handleBack = () => {
    formIndex !== 0
      ? setFormIndex(formIndex - 1)
      : handleBackAlert("Already at step one");
  };

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
        className="min-w-[250px] w-[15%] fixed top-0"
        src={AmazonLogo}
        alt="amazon logo"
      />
      <form onSubmit={registerHandler} action="" className="form-auth">
        <h3 className="text-2xl font-bold">Register</h3>
        {error && <span className="text-warning font-bold">{error}</span>}
        <button
          type="button"
          onClick={handleBack}
          className="font-bold  flex justify-start items-center gap-2"
        >
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
        {formIndex === 0 ? (
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
        ) : formIndex === 1 ? (
          <>
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
              <label htmlFor="name">Last name:</label>
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
              <label htmlFor="name">First name:</label>
              <input
                type="text"
                required
                id="firstName"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
        {formIndex < 2 ? (
          <button
            type="button"
            className="btn-primary"
            onClick={() => setFormIndex(formIndex + 1)}
          >
            Next
          </button>
        ) : (
          <button type="submit" className="btn-primary">
            Register
          </button>
        )}
        <span className="italic">
          Already have an account ?{" "}
          <Link style={{ color: "#5185F3" }} to="/login">
            Login
          </Link>
        </span>
      </form>
      <footer className="fixed bottom-0 w-screen flex">
        <img
          alt="footer visual"
          src={FooterImage}
          className="fixed bottom-0 w-screen z-[-1]"
        />
      </footer>
    </div>
  );
};

export default RegisterScreen;
