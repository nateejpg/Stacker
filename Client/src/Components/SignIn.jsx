import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="sign">
      <div className="formContainer">
        <div className="titleContainer">
          <h1>Sign-In</h1>
        </div>
        <form>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value={"Sign-In"} />
        </form>
        <div className="links">
          <Link to={"/signUp"}>
            <a>Dont have an account?</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
