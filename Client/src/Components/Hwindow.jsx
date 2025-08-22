import React, { useState, useEffect } from "react"
import Habits from "../Components/Habits";
import axios from "axios";
import trash from "../images/trashbin.png"
import edit from "../images/pen.png"
import increase from "../images/add.png"
import decrease from "../images/minus.png"

const Hwindow = () => {

  const [tempHabits, setTempsHabits] = useState([]);
  const [habits, setHabits] = useState([]);
  const [avColor, setAvColor] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const userId = localStorage.getItem("userId");


  const handleDelete = (id) => {

    axios.delete(`${API_URL}habits/delete/` + id)
    .then(() => {
      setHabits(prev => prev.filter(habit => habit._id !== id));
    })
    .catch(err => console.log(err));
  }

  const handleFetch = async () => {
    
      try{
        if(userId){
          const response = await axios.get(`${API_URL}geth/` + userId);
          console.log(response.data)
          setHabits(response.data);
        }
      }catch(err){
        console.log(err);
      }
  }



  const handleEdit = () => {
    return
  }


  useEffect(() => {

    handleFetch();

  }, [userId])

  console.log("length", habits.length)


  return (
    <div className="habitWindow">
        <Habits onColorChange={setAvColor}
        onTempAddHabit={th => setTempsHabits([...tempHabits, th])} 
        onTempLength = {tempHabits.length}/>
        {userId && habits.length > 0 ?
        (habits.map((h) => (
          <div key={h._id} className="habit" style={{background: h.difficulty}}>
            <div className="counter">
              <button>{<img src={increase}></img>}</button>
              <button>{<img src={decrease}></img>}</button>
              {h.counter}
            </div>
            <div className="title">
              {h.title}
            </div>
            <div className="buttons">
              <button onClick={() => handleDelete(h._id)}><img src={trash}></img></button>
              <button onClick={() => handleEdit(h._id)}><img src={edit}></img></button>
            </div>
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


