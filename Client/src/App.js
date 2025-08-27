import Main from "./Components/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import AddStack from "./Components/AddStack";
import Habits from "./Components/Habits";

function App() {

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = (userData) => {

    setUpdateId(userData.id);
    setUpdateUsername(userData.username);
    
    console.log(userId);

  }
  
  const setUpdateId = (id) => {

    window.localStorage.setItem("idKey", id);

  }

  const setUpdateUsername = (username) => {

    window.localStorage.setItem("username", username)
  }

  const handleLogOut = () => {

    window.localStorage.removeItem("idKey");
    window.localStorage.removeItem("username");
    window.location.reload();
    setUserId("");
    setUpdateUsername("");

 }

  useEffect(() => {

    const idGet = window.localStorage.getItem("idKey");
    const userGet = window.localStorage.getItem("userKey");


    setUserId(idGet);
    setUsername(userGet);


  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Main id={userId} onLogOut = {handleLogOut} />}/>
          <Route path={"/SignIn"} element = {<SignIn onLogin = {handleLogin}/>}/>
          <Route path={"/SignUp"} element = {<SignUp id={userId}/>}/>
          <Route path={"/AddStack"} element={<AddStack id={userId}/>}/>
          <Route path={"./Habits"} element={<Habits/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
