import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const SignIn = () => {
  
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {

    setUserLogin((prev) => ({...prev, [e.target.name]: e.target.value}));

  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try{

      const res = await axios.post("http://localhost:8800/login", userLogin);
      console.log("Login successful", res.data);

    }catch(err){
      if (err.response && err.response.data && err.response.data.error) {
        console.log('Login failed:', err.response.data.error);
    } else {
        console.log('An error occurred:', err.message);
    }
    }

  }

  console.log(userLogin);

  return (
    <div className="sign">
      <div className="formContainer">
        <div className="titleContainer">
          <h1>Sign-In</h1>
        </div>
        <form>
          <input
            type="email"
            placeholder="Enter your Email:"
            name = "email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your Password:"
            name = "password"
            onChange={handleChange}
          />
          <input type="submit" onClick={handleSubmit}/>
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
