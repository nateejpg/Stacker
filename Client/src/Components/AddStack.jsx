import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"

const AddStack = ({id}) => {
    
    const getter = window.localStorage.getItem("idKey")
    const [stack, setStack] = useState({
        content: "",
        difficulty: "Hard",
        userId: parseInt(getter)
      })


      const addToDo = async () => {

        try{
          await axios.post("http://localhost:8800/Stacks", stack);
        }catch(err){
          console.log(err);
        }

        window.location.reload();
    
      };


      const handleChange = (e) => {

        setStack((prev) => ({...prev,[e.target.name]: e.target.value}));
    
    
      }

  return (
    <div className="crud">
    <input
      type= "text"
      name = "content"
      placeholder="Enter your Stack!"
      onChange={handleChange}
      maxLength={90}
    />
    <select
      name="difficulty"
      onChange={handleChange}
    >
      <option value="Hard">Urgent 🔴</option>
      <option value="Moderate"> Queued 🟡</option>
      <option value="Easy">  Paced 🟢</option>
    </select>
    <button onClick={addToDo}>Add Stack</button>
  </div>
  )
}

export default AddStack