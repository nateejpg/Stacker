import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Reset = () => {
  const [email, setEmail] = useState("");

  return (
    <div>
      <div>
        <input
          type="text"
          className=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <button className="">Send Password Reset Email</button>
      </div>
      Dont have an Account ? <Link to={"/SignUp"}>Register</Link> now!
    </div>
  );
};

export default Reset;
