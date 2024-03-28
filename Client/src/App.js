import Main from "./Components/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";
import AddStack from "./Components/AddStack";

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
    window.location.reload();
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
          <Route path={"/AddStack"} element={<AddStack id={userId}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
