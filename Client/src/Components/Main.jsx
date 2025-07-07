import React from "react";
import Footer from "./Footer";
import todo1 from "../images/todo1.png";
import login from "../images/login.png";
import Tasks from "../Components/Tasks"
import logout from "../images/logout.png"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import quotesData from "../quotes.json"

const Main = () => {

  const getUser = window.localStorage.getItem("username");
  const getId = window.localStorage.getItem('userId');

  
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

  const reload = () => {

    window.location.reload();

  }

  return (
    <div className="wrapper">
      <div className="header">
       <div className="head01">
        {getId ? <h1>Hello <span>{getUser}</span>!</h1> : <a className="logo" onClick={reload}>
          <img src={todo1}></img>
        </a>}
        </div>
        <div className="head02"><h1>Stacker</h1></div>
       <div className="head03"> 
        { getId ? (<a className="login"><button onClick={logOut}><img src={logout}></img></button></a>) : (
        <a className="login">
          <Link to={"/SignIn"}>
            <img src={login}></img>
          </Link>
        </a>)}
        </div>
      </div>
      <div className="quotes">
          <div className="quote">
            <h1>{quotes && quotes.text}</h1>
            <h2>{quotes && quotes.author}</h2>
          </div>
      </div>
      <Tasks/>
      <Footer />
    </div>
  );
};

export default Main;
