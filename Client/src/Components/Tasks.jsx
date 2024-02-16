import React from "react";
import { useState, useEffect } from "react";
import done from "../images/done.png";
import trash from "../images/trashbin.png";
import edit from "../images/edit.png";

const Crud = () => {
  const [toDo, setTodo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [difficulty, setDifficulty] = useState("Hard");
  const [editingToDo, setEditingToDo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [defaultA, setDefaultA] = useState([]);
  const [user, setUser] = useState(false);

  const getColor = (difficulty) => {
    switch (difficulty) {
      case "Hard":
        return "rgb(245, 29, 29)";
      case "Moderate":
        return "yellow";
      case "Easy":
        return "lightgreen";
      case "Defult":
        alert("Please, select a color.");
        return;
    }
  };

  useEffect(() => {

    const fetchDefault = async () => {

        try{
            const response = await fetch("http://localhost:8800/default");
            const data = await response.json();

            setDefaultA(data);

        }catch(err){
            console.log(err);
        }
    }

    fetchDefault();

    console.log(defaultA);

  },[])

  // Crud

  const addToDo = () => {
    if (toDo.trim() != "") {
      setToDos([...toDos, { id: Date.now(), text: toDo, difficulty }]);
      setTodo("");
    }

    setUser(true)
    console.log("Array", toDos);
  };

  const removeTodo = (todoID) => {
    const updatedItems = toDos.filter((toDo) => toDo.id != todoID);
    setToDos(updatedItems);

    if (editingToDo == todoID) {
      setEditingToDo(null);
      setEditedText("");
    }
  };

  const editToDo = (todoID, todoText) => {
    setEditingToDo(todoID);
    setEditedText(todoText);
  };

  const saveEditedToDo = () => {
    const updatedItems = toDos.map((toDo) =>
      toDo.id === editingToDo ? { ...toDo, text: editedText } : toDo
    );

    setToDos(updatedItems);
    setEditingToDo(null);
    setEditedText("");
  };

  return (
    <div className="wrapper">
      <div className="crud">
        <input
          type="text"
          value={toDo}
          placeholder="Enter your ToDo"
          onChange={(e) => setTodo(e.target.value)}
          maxLength={90}
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Hard">Hard 🔴</option>
          <option value="Moderate">Moderate 🟡</option>
          <option value="Easy">Easy 🟢</option>
        </select>
        <button onClick={addToDo}>Add ToDo</button>
      </div>
        <div className="toDoWrapper">
        {!user ? (defaultA.map((task) => (
            <div className="toDoColor" key={task.id} style={{background: getColor(task.difficulty)}}>
              <div className="toDoBtnEdit"><button><img src={edit}/></button></div>
                <div className="toDoText"><h1>{task.content}</h1></div>
               <div className="toDoBtn">
                <button onClick={() => removeTodo(toDo.id)}>
                  <img src={trash}></img>
                </button>
                <button>
                  <img src={done}></img>
                </button>
              </div>
        </div>
        ))) : (toDos.map((toDo) => (
            <div
              className="toDoColor"
              key={toDo.id}
              style={{ background: getColor(toDo.difficulty) }}
            >
            <div className="toDoBtnEdit"><button onClick={() => editToDo(toDo.id, toDo.text)}><img src={edit}/></button></div>
              {editingToDo === toDo.id ? (
                <div className="saveToDo">
                  <input
                    placeholder="edit your ToDo"
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="saveToDoBtns">
                  <button>🔴</button>
                  <button>🟢</button>
                  <button>🟡</button>
                  </div>
                  <button onClick={saveEditedToDo}>
                    <img src={edit}></img>
                  </button>
                </div>
              ) : (
                <div className="toDoText">
                  <h1>{toDo.text}</h1>
                </div>
              )}
              <div className="toDoBtn">
                <button onClick={() => removeTodo(toDo.id)}>
                  <img src={trash}></img>
                </button>
                <button onClick={() => editToDo(toDo.id, toDo.text)}>
                  <img src={done}></img>
                </button>
              </div>
            </div>
          ))) }
      </div>
    </div>
  );
};

export default Crud;
