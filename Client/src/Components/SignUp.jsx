import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {

    setUserInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = async (e) => {

    e.preventDefault();

    try{

      if(userInfo.email && userInfo.username && userInfo.password !== ""){

      await axios.post("http://localhost:8800/users", userInfo);
      alert(`Congratulations ${userInfo.username}, you've created an account!`);
      navigate("/signIn")

    }else{
      alert("There was an error with the credentials you entered! please, try again!")
    }
  }catch(err){
    return console.log(err);
  }
  }

  const navigate = useNavigate();

  console.log(userInfo);

  return (
    <div className="sign">
      <div className="formContainer">
        <div className="titleContainer">
          <h1>Sign-Up</h1>
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter your Username:"
            name = "username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter your Email:"
            name = "email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your Password:"
            name="password"
            onChange={handleChange}
          />
          <input type="submit" onClick={handleClick}/>
        </form>
        <div className="links">
          <Link to={"/signIn"} style={{border: "none"}}>
            <p>Already have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
