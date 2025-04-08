import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import todo1 from "../images/todo1.png";
import axios from "axios";

const SignUp = () => {

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate();

  const handleChange = (e) => {

    setUserInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const [color, setColor] = useState('');

  useEffect(() => {

    const cores = ['#ff474c', 'yellow', 'lightgreen'];
    const randomColor = cores[Math.floor(Math.random() * cores.length)]

    setColor(randomColor)

  },[])

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

  const handleClickBack = () => {

      navigate("/")
  }

  return (
    <div className="sign">
      <div className="formContainer" style = {{backgroundColor: color}}>
      <div className="headerContainer">
        <img src={todo1} className="logo" onClick={handleClickBack}/>
      </div>
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
          <Link to={"/signIn"} style={{border: "none", textDecoration: "none", fontStyle: "bold", fontWeight: "900"}}>
            <p>Already have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
