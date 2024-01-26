import React from "react";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

const handleSubmit = (e) => {
  e.preventDefault();
};

const SignIn = () => {
  return (
    <div className="sign">
      <div className="formContainer">
        <div className="titleContainer">
          <h1>Sign-In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your Email" />
          <input type="password" placeholder="Enter your Password" />
          <input type="submit" value={"Sign-In"} />
        </form>
        <Link to={"/SignUp"}>
          <a>Dont have an account?</a>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
