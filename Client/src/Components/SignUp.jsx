import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import todo1 from "../images/todo1.png";
import axios from "axios";

const SignUp = () => {

  const navigate = useNavigate();

  const [color, setColor] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {

    const cores = ['#ff474c', 'yellow', 'lightgreen'];
    const randomColor = cores[Math.floor(Math.random() * cores.length)]

    setColor(randomColor)

  },[])

  const handleRegister = async (e) => {

    e.preventDefault();

    axios.post(`${API_URL}register`, {username: username, email: email, password: password})
    .then(() => {
      toast.success('You have successfully created an account, you can now log in!')
      
      setUsername('');
      setEmail('');
      setPassword('');

    })
    .catch(err => console.log(err))

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
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter your Username:"
            name = "username"
            onChange={(e) => setUsername(e.target.value)}
            id="mySecondPlaceholder"
            autoComplete="off"
            value={username}
          />
          <input
            type="email"
            placeholder="Enter your Email:"
            name = "email"
            onChange={(e) => setEmail(e.target.value)}
            id="mySecondPlaceholder"
            autoComplete="off"
            value={email}
          />
          <input
            type="password"
            placeholder="Enter your Password:"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            id="mySecondPlaceholder"
            value={password}
          />
          <button type="submit" className="submitButton">Register</button>
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
