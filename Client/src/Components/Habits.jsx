import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';

const Habits = ({onColorChange, onTempAddHabit, onTempLength, onAddHabit}) => {

  const [title, setTitle] = useState("");
  const [difficulty , setDifficulty] = useState("gray");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSelectDifficulty = (e) => {

    const selected = e.target.value;
    setDifficulty(selected)
    onColorChange(selected);

  }

  const handleAdd = () => {

  const userId = window.localStorage.getItem("userId");

   if(onTempLength >= 5){

    toast.warn("Too many habits, finish some first!");
    return;

   }else{
    
    if(title.length == 0){
      toast.warn("Enter a title for your habit");
      return;

    }else{

     if(userId){

     axios.post(`${API_URL}habits`, {title: title, difficulty: difficulty, counter: 0})
     .then((res) => {
      if(onAddHabit) onAddHabit(res.data)
     })
     .catch(err => console.log(err));

     }else{

      if(onTempAddHabit){
        onTempAddHabit({
          title: title,
          difficulty: difficulty,
        })
      }
    
    }

    setTitle("");
    setDifficulty("gray");

  }
    }

  }

  return (
    
    <div>
      <div className="addHabit">
          <input type="text" placeholder="Enter your habit:" onChange={((e) => setTitle(e.target.value))} value={title}></input>
          <select value={difficulty} onChange={handleSelectDifficulty}>Select Difficulty
          <option value={"gray"}>Default</option>
          <option value={"rgb(244, 29, 29)"}>Hard</option>
          <option value={"yellow"}>Moderate</option>
          <option value={"lightgreen"}>Easy</option>
          </select>
          <button onClick={handleAdd} className='button'>Add</button>
      </div>
    </div>

  )
}

export default Habits