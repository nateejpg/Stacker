import React, { useEffect, useState } from "react";
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

  const [color, setColor] = useState('');

  useEffect(() => {

    const cores = ['#ff474c', 'yellow', 'lightgreen'];
    const randomColor = cores[Math.floor(Math.random() * cores.length)]

    setColor(randomColor)

  })

  const handleClick = async (e) => {

    e.preventDefault();

    try{

      if(userInfo.email && userInfo.username && userInfo.password !== ""){

      await axios.post("https://stacker-server.vercel.app/users", userInfo);
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
      <div className="formContainer" style = {{backgroundColor: color}}>
        <div className="titleContainer">
          <h1>Register</h1>
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter your Username:"
            name = "username"
            onChange={handleChange}
            id="mySecondPlaceholder"
          />
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
            name="password"
            onChange={handleChange}
            id="mySecondPlaceholder"
          />
          <input type="submit" onClick={handleClick}/>
        </form>
        <div className="links">
          <Link to={"/signIn"} style={{border: "none", textDecoration: "underline", textDecorationThickness: "2px", color: "black", textUnderlineOffset: "3px"}}>
            <p>Already have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
