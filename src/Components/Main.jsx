import React from 'react'
import Footer from './Footer'
import todo1 from "../images/todo1.png"
import login from "../images/login.png"
import Crud from './Crud'
import { useState, useEffect } from 'react'

const Main = () => {

    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const fetchData = async () => {

            try{
                  const response = await fetch("https://quotesapi-c04u.onrender.com/");
                  const data = await response.json();
                  
                  const randomQuotes = Math.floor(Math.random() * data.length);
                  const randomQuote = data[randomQuotes];

                  setQuotes(randomQuote);

            }catch(error){

                console.log("Error ", error);

            }finally{

                setLoading(false);
            }

        }

        fetchData();

    },[]);

    return (
        <div className='wrapper'>
            <div className='header'>
                <a className='logo'><img src={todo1}></img></a>
              <h1>ToDo List</h1>      
              <a className='login'><img src={login}></img></a>
            </div>
            <Crud/>
            <div className='quotes'>
                {loading ? (<div><h1>Loading Quotes...</h1></div>) : (<div className='quote'><h1>
                    {quotes && (quotes.text)}</h1><p>{quotes && (quotes.author)}</p></div>
                )}
            </div>
            <Footer/>
        </div>
      )

    }


export default Main