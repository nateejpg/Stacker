import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios';
import addSound from "../sounds/Click.wav"

const Habits = ({onColorChange, onTempLength, onAddHabit}) => {

  const [title, setTitle] = useState("");
  const [difficulty , setDifficulty] = useState("lightgray");
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

     axios.post(`${API_URL}habits`, {title: title, difficulty: difficulty, counter: 0, user: userId})
     .then((res) => {
      if(onAddHabit) onAddHabit(res.data)
     })
     .catch(err => console.log(err));

     }else{

      toast.warn("Create an account to use this feature!")
      setTitle("");
      return;
    }

    setTitle("");
    setDifficulty("lightgray");

  }
    }


    const Sound = new Audio(addSound);

    const playSound = () => {
      Sound.currentTime = 0;
      Sound.volume = 0.5
      Sound.play();
    }


    playSound();

  }

  return (
    
    <div>
      <div className="addHabit">
          <input type="text" placeholder="Enter your habit:" 
          onChange={((e) => setTitle(e.target.value))} 
          value={title}
          maxLength={25}
          ></input>
          <select value={difficulty} onChange={handleSelectDifficulty}>Select Difficulty
          <option value={"lightgray"}>Default</option>
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