import React from 'react'
import {useState} from 'react';
import axios from "axios"
import { v4 as uuidv4 } from 'uuid';

const AddStack = ({onClick}) => {
    
    const getter = window.localStorage.getItem("idKey");
    const [stack, setStack] = useState({
        content: "Don't leave me empty ;)",
        difficulty: "Hard",
        userId: parseInt(getter)
      })

    const [tempStack, setTempStack] = useState({

      id: uuidv4(),
      content:"Dont leave me empty ;)",
      difficulty: "Hard",
    })


      const addToDo = async () => {

        if(!getter){

          onClick(tempStack);

          const inputSelect = document.querySelector('input[type="text"]');

          inputSelect.value = "";

          
        }else{

        try{
          await axios.post("http://localhost:8800/Stacks", stack);
        }catch(err){
          console.log(err);
        }

        window.location.reload();
    
      }

    }


      const handleChange = (e) => {

        setStack((prev) => ({...prev,[e.target.name]: e.target.value}));
        setTempStack((prev) => ({...prev, [e.target.name]: e.target.value}))
    
      }

  return (
    <div className="crud">
    <input
      type= "text"
      name = "content"
      placeholder="Enter your Stack!"
      onChange={handleChange}
      maxLength={90}
      id="myPlaceholder"
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