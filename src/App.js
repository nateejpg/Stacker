import Main from "./Components/Main";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Reset from "./Components/Reset";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Main/>}/>
          <Route path={"/SignIn"} element={<SignIn/>}/>
          <Route path={"/SignUp"} element = {<SignUp/>}/>
          <Route path={"/Main"} element={<Main/>}/>
          <Route path={"/Reset"} element={<Reset/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
