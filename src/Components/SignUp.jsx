import React from "react";
import { Link } from "react-router-dom";

const handleSubmit = (e) => {
  e.preventDefault();
};

const SignUp = () => {
  return (
    <div className="sign">
      <div className="formContainer">
        <div className="titleContainer">
          <h1>Sign-Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your Username" />
          <input type="email" placeholder="Enter your Email" />
          <input type="password" placeholder="Enter your Password" />
          <input type="submit" value={"Sign-Up"} />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
