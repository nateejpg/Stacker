import React from "react";
import Footer from "./Footer";
import todo1 from "../images/todo1.png";
import login from "../images/login.png";
import Menu from "../Components/Menu"
import menuImage from "../images/menu.png"
import Tasks from "../Components/Tasks"
import Hwindow from "../Components/Hwindow"
import logout from "../images/logout.png"
import { useState, useEffect } from "react";
import {toast} from "react-toastify"
import { Link } from "react-router-dom";
import quotesData from "../quotes.json"

const Main = () => {

  const getUser = window.localStorage.getItem("username");
  const getId = window.localStorage.getItem('userId');

  const [hidden, setHidden] = useState(() => {
    const saved = window.localStorage.getItem("hidden");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleHidden = (value) => {
    setHidden(prev => {
    const newState = value !== undefined ? value : !prev;
      window.localStorage.setItem("hidden", JSON.stringify(newState));
      return newState
    })
  }

  const [hidden2, setHidden2] = useState(false)

  const getRandomQuotes = () => {

    const randomIndex = Math.floor(Math.random() * quotesData.length);
    return quotesData[randomIndex];

 }

 const [quotes, setQuotes] = useState(getRandomQuotes);

  useEffect(() => {

    setQuotes(getRandomQuotes())

    /*
    const fetchQuotes = async () => {

    try {
     const response = await fetch("https://quotesapi-c04u.onrender.com/");
     const data = await response.json();

       const randomQuotes = Math.floor(Math.random() * data.length);
       const randomQuote = data[randomQuotes];

     setQuotes(randomQuote);
    } catch (error) {
      console.log("Error ", error);
    } finally {
       setLoading(false);
    }
   };

  fetchQuotes();

  */
  
 }, []);

  const logOut = () => {

    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('username');

    window.location.reload();
    
  }

  const handleMenu = () => {

    if(hidden2 == true){

      setHidden2(false);

    }else{

      setHidden2(true);
    }

  }

  return hidden2 ? (<Menu onClose={setHidden2} onLogOut={logOut} onShowWindows={toggleHidden}/>) : <div className="wrapper">
      <div className="header">
       <div className="head01">
        {getId ? (
        <>
          <h1>Hello, <span>{getUser}!</span></h1>
        </>
        ): 
        <a className="logo" onClick={() => toggleHidden()}>
          <img src={todo1}></img>
        </a>
        }
        </div>
        <div className="head02"><h1>Stacker</h1></div>
       <div className="head03"> 
        { getId ? (<a className="login"><button onClick={handleMenu}><img src={menuImage}></img></button></a>) : (
        <a className="login">
          <Link to={"/SignIn"}>
            <img src={login}></img>
          </Link>
        </a>)}
        </div>
      </div>
      <div className={hidden ? "quotes" : 'hidden'}>
          <div className="quote">
            <h1>{quotes && quotes.text}</h1>
            <h2>{quotes && quotes.author}</h2>
          </div>
      </div>
      {
        hidden ? <Tasks/> : <Hwindow/>
        }
      <Footer />
    </div>}
  ;
;

export default Main;
