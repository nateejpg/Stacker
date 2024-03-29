import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const SignIn = ({onLogin}) => {
  
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

      const username = res.data.user.username;

      console.log(res.data);

      onLogin({
        id: res.data.user.id,
      })

      alert(`Hello ${username}, welcome abord!`)

      navigate("/");

    }catch(err){
      if (err.response && err.response.data && err.response.data.error) {
        console.log('Login failed:', err.response.data.error);
    } else {
        console.log('An error occurred:', err.message);
    }
    }

  }

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
          <Link to={"/SignUp"}><p>Don't you have an account?</p></Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
