import React from "react";
import Footer from "./Footer";
import todo1 from "../images/todo1.png";
import login from "../images/login.png";
import Tasks from "../Components/Tasks"
import logout from "../images/logout.png"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Main = ({id, onLogin}) => {

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

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
  
 }, []);


  const reload = () => {

    window.location.reload();

  }

  return (
    <div className="wrapper">
      <div className="header">
        <a className="logo" onClick={reload}>
          <img src={todo1}></img>
        </a>
        <h1>Stacker</h1>
        { id ? (<a className="login"><button onClick={onLogin}><img src={logout}></img></button></a>) : (
        <a className="login">
          <Link to={"/SignIn"}>
            <img src={login}></img>
          </Link>
        </a>)}
      </div>
      <div className="quotes">
        {loading ? (
          <div>
            <h1>Loading Quotes...</h1>
          </div>
        ) : (
          <div className="quote">
            <h1>{quotes && quotes.text}</h1>
            <h2>{quotes && quotes.author}</h2>
          </div>
        )}
      </div>
      <Tasks id={id} />
      <Footer />
    </div>
  );
};

export default Main;
