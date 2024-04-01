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

      const res = await axios.post("https://stacker-server.vercel.app/login", userLogin);
      console.log("Login successful", res.data);

      const username = res.data.user.username;

      console.log(res.data);

      onLogin({
        id: res.data.user.id,
        username: res.data.user.username,
      })

      alert(`Hello ${username}, welcome abord!`)

      navigate("/");

      window.location.reload();

    }catch(err){
      if (err.response && err.response.data && err.response.data.error) {
        console.log('Login failed:', err.response.data.error);
        alert("There was an error, try again!")
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
            id="mySecondPlaceholder"
          />
          <input
            type="password"
            placeholder="Enter your Password:"
            name = "password"
            onChange={handleChange}
            id="mySecondPlaceholder"
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
