import React from "react";
import editTimer from "../images/edit.png";
import axios from "axios";

const Treated = ({counter,onSetCounter, onShow, onUpdateHabits, habitId}) => {

  const API_URL = process.env.REACT_APP_API_URL;  

  const handleClick = () => {
    
    axios.put(`${API_URL}habits/updateCounter/` + habitId, {counter: counter})
    .then(() => {
      onUpdateHabits((prev) => 
        prev.map((h) => 
          h._id === habitId ?
          {...h, counter: counter}
          :
          h
        )
      )
    })
    .finally(() => {
      onShow();
    })
  }

  return (
    <div className="counter">
      <button onClick={handleClick}>
        <img src={editTimer} alt="close edit" />
      </button>
      <input
        type="number"
        value={counter}
        onChange={(e) => onSetCounter(Number(e.target.value))}
      />
    </div>
  );
};

export default Treated;
