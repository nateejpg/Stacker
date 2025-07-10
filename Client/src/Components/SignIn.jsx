import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { useState } from "react";
import todo1 from "../images/todo1.png"
import axios from "axios";


const SignIn = () => {

  const navigate = useNavigate();
  const [color, setColor] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {

    const cores = ['#ff474c', 'yellow', 'lightgreen'];
    const randomColor = cores[Math.floor(Math.random() * cores.length)]

    setColor(randomColor)

  },[])

  const handleSubmit = (e) => {

    e.preventDefault();

   if(email.length === 0){

    toast.error('Add a valid email!');

   }else{
     axios.post(`${API_URL}login`, { email, password})
    .then(res => {
      
      if(res.data.success){
        toast.success(`Hello ${res.data.username}, you can start stacking around!`)
        localStorage.setItem('userId', res.data.userId)
        localStorage.setItem('username', res.data.username)
        navigate('/')

      }else{
        toast.error('There was an error, try again!')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
      }
    })
    .catch(err => console.log(err))
   }
  }

  const handleClick = () => {

    navigate("/")

  }

  return (
    <div className="sign">
      <div className="formContainer" style = {{backgroundColor: color}}>
        <div className="headerContainer">
          <div className="imageContainer">
            <img src={todo1} className="logo"onClick={handleClick} />
          </div>
        </div>
        <div className="titleContainer">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Email:"
            name = "email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Enter your Password:"
            name = "password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete=""
          />
          <button type="submit" className="submitButton">Enter</button>
        </form>
        <div className="links">
          <Link to={"/SignUp"} style={{border: "none", textDecoration: "none", fontStyle: "bold", fontWeight: "900"}}>
          <p>Don't have an account?</p></Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
