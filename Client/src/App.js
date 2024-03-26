import Main from "./Components/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";

function App() {

  const [userId, setUserId] = useState("");

  const handleLogin = (userData) => {

    setUpdateId(userData.id);
    
    console.log(userId);

  }
  
  const setUpdateId = (id) => {

    window.localStorage.setItem("idKey", id);
  }

  const handleLogOut = () => {

    window.localStorage.removeItem("idKey");

    setUserId("");

 }

  useEffect(() => {

    const idGet = window.localStorage.getItem("idKey");


    setUserId(idGet);


  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Main id={userId} onLogin = {handleLogOut} />}/>
          <Route path={"/SignIn"} element = {<SignIn onLogin = {handleLogin}/>}/>
          <Route path={"/SignUp"} element = {<SignUp id={userId}/>}/>
          <Route path={"/Main"} element = {<Main/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
