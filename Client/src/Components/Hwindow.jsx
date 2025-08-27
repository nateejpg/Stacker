import React, { useState, useEffect } from "react";
import Habits from "../Components/Habits";
import axios from "axios";
import Treated from "./Treated";
import trash from "../images/trashbin.png";
import edit from "../images/pen.png";
import done from "../images/done.png"
import hover from "../sounds/Parsed.mp3"
import editTimer from "../images/edit.png";
import congratz from "../sounds/congratz.wav"

const Hwindow = () => {
  const [tempHabits, setTempsHabits] = useState([]);
  const [habits, setHabits] = useState([]);
  const [avColor, setAvColor] = useState("lightgray");
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState("Don't leave me empty! ;)");
  const [editDifficulty, setEditDifficulty] = useState("lightgray");
  const [editCounter, setEditCounter] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const userId = localStorage.getItem("userId");

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}habits/delete/` + id)
      .then(() => {
        setHabits((prev) => prev.filter((habit) => habit._id !== id));
      })
      .catch((err) => console.log(err));
  };


const formatCounter = (counter) => {
  if (counter >= 60) {
    const hours = Math.floor(counter / 60);
    const minutes = counter % 60;

    if (minutes > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    }
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }

  return `${counter} ${counter === 1 ? "minute" : "minutes"}`;
};


const handleUpdate = (id) => {

axios.put(`${API_URL}habits/update/` + id, {title: editTitle, difficulty: editDifficulty})
.then(() => {
    setHabits(prev => 
      prev.map(habit => 
        habit._id === id
        ? {...habit, title: editTitle, difficulty: editDifficulty}
        : habit
      )
    );
    setEditTitle("Don't leave me empty! ;)");
    setEditDifficulty("lightgray");
    setEditId(null)
})
.catch(err => console.log(err))
}

const handleFetch = async () => {
  try {
    if (userId) {
      const response = await axios.get(`${API_URL}geth/` + userId);

      const data = response.data.map((h) => {
        const counter = h.counter || 0;
        return {
          ...h,
          counter,
        };
      });

      setHabits(data);
    }
  } catch (err) {
    console.log(err);
  }
};

  const congratzSound = new Audio(congratz)

  const playCongrats = () => {
    congratzSound.currentTime = 0;
    congratzSound.play();
  }

  const handleEditInputOn = (id) => {
    setEditCounter(id);
  };

  const handleEditInputOff = () => {
    setEditCounter(null);
    playCongrats();

  };

  const handleEdit = (id) => {

    setEditId(null)

  }

  const handleEditOff = (id) => {

    setEditId(id)

  }

  const hoverSound = new Audio(hover);

  const hoverSoundPlay = () => {
    hoverSound.currentTime = 0; // reinicia se já estiver tocando
    hoverSound.volume = 0.1
    hoverSound.play();
  }


  useEffect(() => {
    handleFetch();
  }, [userId]);

  return (
    <div className="habitWindow">
      <Habits
        onColorChange={setAvColor}
        onTempAddHabit={(th) => setTempsHabits([...tempHabits, th])}
        onTempLength={habits.length}
        onAddHabit={(adh) => setHabits([...habits, adh])}
      />
      {userId && habits.length > 0 ? (
        <div className="habitList">
          {habits.map((h) => (
            <div key={h._id} className="habit" style={{ background: h.difficulty }} onMouseEnter={hoverSoundPlay}>
              {editCounter === h._id ? (
                <Treated
                  counter={h.counter}
                    onSetCounter={(newVal) =>
                      setHabits((prev) =>
                        prev.map((habit) =>
                          habit._id === h._id
                            ? { ...habit, counter: newVal }
                            : habit
                        )
                      )
                    }      
                  onShow={handleEditInputOff}
                  onUpdateHabits = {setHabits}
                  habitId={h._id} 
                />
              ) : (
                <div className="counter">
                  <button onClick={() => handleEditInputOn(h._id)}>
                    <img src={editTimer} alt="edit timer" />
                  </button>
                  <p>{formatCounter(h.counter)}</p>
                </div>
              )}
              {editId === h._id ? 
              <div className="editHabit">
                <div className="editHabitBox01">
                <input type="text" placeholder="Edit your habit:" onChange={e => setEditTitle(e.target.value)}></input>
                </div>
              <div className="editHabitBox02">
                <select value={editDifficulty} onChange={e => setEditDifficulty(e.target.value)}>Select Difficulty
                <option value={"lightgray"}>Default</option>
                <option value={"rgb(244, 29, 29)"}>Hard</option>
                <option value={"yellow"}>Moderate</option>
                <option value={"lightgreen"}>Easy</option>
              </select>
                <button onClick = {() => handleUpdate(h._id)}>
                  <img src={done} alt="edit" />
                </button>
              </div>
              </div> : <div className="title">{h.title}</div>}
              <div className="buttons">
                <button onClick={() => handleDelete(h._id)}>
                  <img src={trash} alt="delete" />
                </button>
                {editId === h._id ? 
              <button onClick = {() => handleEdit(h._id)}>
                  <img src={edit} alt="edit" />
                </button> :
                 <button onClick = {() => handleEditOff(h._id)}>
                  <img src={edit} alt="edit" />
                </button>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="habitMockSection">
          <div className="habit" style={{ background: "rgb(244, 29, 29)" }}>
            Practice coding for 1 hour 💻
          </div>
          <div className="habit" style={{ background: "yellow" }}>
            Faire du sport trois fois par semaine 🏃‍♂️
          </div>
          <div className="habit" style={{ background: "lightgreen" }}>
            1日1回日本語で日記を書く ✍️
          </div>
          <div className="habit" style={{ background: "yellow" }}>
            Praticar violão todos os dias 🎸
          </div>
          <div className="habit" style={{ background: "lightgreen" }}>
            Täglich Vokabeln lernen 📚
          </div>
        </div>
      )}
    </div>
  );
};

export default Hwindow;
