import React, { useState, useEffect } from "react"
import Habits from "../Components/Habits";

const Hwindow = () => {

  const [tempHabits, setTempsHabits] = useState([]);
  const [habits, setHabits] = useState([]);
  const [avColor, setAvColor] = useState("");

  const userId = localStorage.getItem("userId");

  return (
    <div className="habitWindow">
        <Habits onColorChange={setAvColor}
        onTempAddHabit={th => setTempsHabits([...tempHabits, th])} 
        onAddHabit={h => setHabits([...habits, h])}
        onTempLength = {tempHabits.length}/>
        {userId && habits.length > 0 ?
        (habits.map((h) => (
          <div key={h._id}>
            {h.title}
            {h.counter}
          </div>
        )))
        :
        (
        <div className="habitSection">
          <div className="habit" style={{background: "rgb(244, 29, 29)"}}>Practice coding for 1 hour 💻</div>
          <div className="habit" style={{background: "yellow"}}>Faire du sport trois fois par semaine 🏃‍♂️</div>
          <div className="habit" style={{background: "lightgreen"}}>1日1回日本語で日記を書く ✍️</div>
          <div className="habit" style={{background: "yellow"}}>Praticar violão todos os dias 🎸</div>
          <div className="habit" style={{background: "lightgreen"}}>Täglich Vokabeln lernen 📚</div>
        </div>
        )
      }
    </div>
  )
}

export default Hwindow


