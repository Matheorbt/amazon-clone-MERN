import { useState } from "react";
import axios from "axios";

import AmazonLogo from "../../../assets/logo/Amazon-logo_black.png";
import FooterImage from "../../../assets/footer/footer-visual.svg";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
      <form action="" className="form-auth" onSubmit={forgotPasswordHandler}>
        <h3 className="text-2xl font-bold">Forgot password</h3>
        {error && <span className="text-warning">{error}</span>}
        {success && <span className="text-success">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen_subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
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

export default ForgotPasswordScreen;
