import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";

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
        "/api/auth/forgotpassword", //from forgot password route
        { email }, //email is sent in the body
        config //header config
      );

      setSuccess(data.data); //sets success to what is returned from api
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <h3 className="forgotpassword-screen__title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you registered your account with. We
            will send you the reset password confirmation to this email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <button className="btn btn-primary" type="submit">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
