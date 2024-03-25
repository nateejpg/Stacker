import Main from "./Components/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Tasks from "./Components/Tasks";
import { useEffect, useState } from "react";

function App() {

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogin = (userData) => {

    setUpdateId(userData.id);
    
    console.log(userId);

  }
  
  const setUpdateId = (id) => {

    window.localStorage.setItem("idTest", id);
  }

  useEffect(() => {

    const idGet = window.localStorage.getItem("idTest");

    console.log("Hello Hello",idGet);

    setUserId(idGet);

  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Main/>}/>
          <Route path={"/Tasks"} element = {<Tasks id={userId}/>} />
          <Route path={"/SignIn"} element={<SignIn onLogin = {handleLogin}/>}/>
          <Route path={"/SignUp"} element = {<SignUp/>}/>
          <Route path={"/Main"} element={<Main/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
