import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="sign">
      <div className="formContainer">
        <div className="titleContainer">
          <h1>Sign-Up</h1>
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter your Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input type="submit" value={"Sign-Up"} />
        </form>
        <div className="links">
          <Link to={"/signIn"}>
            <a>Already have an account?</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
