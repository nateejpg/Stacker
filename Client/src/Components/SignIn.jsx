import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import todo1 from "../images/todo1.png"
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

  const [color, setColor] = useState('');

  useEffect(() => {

    const cores = ['#ff474c', 'yellow', 'lightgreen'];
    const randomColor = cores[Math.floor(Math.random() * cores.length)]

    setColor(randomColor)

  },[])

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

  const handleClick = () => {

    navigate("/")

  }

  return (
    <div className="sign">
      <div className="formContainer" style = {{backgroundColor: color}}>
        <div className="headerContainer">
            <img src={todo1} className="logo"onClick={handleClick} />
        </div>
        <div className="titleContainer">
          <h1>Login</h1>
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
          <input type="submit" onClick={handleSubmit} placeholder="Enter"/>
        </form>
        <div className="links">
          <Link to={"/SignUp"} style={{border: "none", textDecoration: "none", fontStyle: "bold", fontWeight: "900"}}><p>Don't have an account?</p></Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
