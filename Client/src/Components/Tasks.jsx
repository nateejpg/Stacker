import React from "react";
import { useState, useEffect } from "react";
import AddStack from "./AddStack";
import done from "../images/done.png";
import trash from "../images/trashbin.png";
import edit from "../images/edit.png";
import axios from "axios";

const Tasks = ({id}) => {
  const [toDos, setToDos] = useState([]);
  const [editingToDo, setEditingToDo] = useState(null);
  const [defaultA, setDefaultA] = useState([]);
  const [updatedStack, setUpdatedStack] = useState({

    content: "Don't leave me empty ;)",
    difficulty: "Hard",
  })
  
  const getColor = (difficulty) => {
    switch (difficulty) {
      case "Hard":
        return "rgb(245, 29, 29)";
      case "Moderate":
        return "yellow";
      case "Easy":
        return "lightgreen";
      case "Default":
        return "red";
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

  const fetchStacks = async () => {

    try{

       const response = await fetch("http://localhost:8800/stacks");
      const data = await response.json();

      setToDos(data);

    }catch(err){
       console.log(err)
     }
  }


  fetchDefault();
  fetchStacks();

 },[id])


  const editToDo = (todoID) => {

    setEditingToDo(todoID);

  };


  const handleChangeUpdate = (e) => {

    setUpdatedStack((prev) => ({...prev, [e.target.name]: e.target.value}));

  }

  const handleDelete = async (id) => {

    try{

      await axios.delete(`http://localhost:8800/Stacks/${id}`);

      const updatedItems = toDos.filter(stack => stack.id !== id);

      setToDos(updatedItems);

    }catch(err){
      console.log(err)
    }

  }

  const handleUpdate = async (id) => {

    try{

      await axios.put(`http://localhost:8800/Stacks/${id}`, updatedStack);
      
      setEditingToDo(null);

      window.location.reload();
      
    }catch(err){

      console.log(err);

    }
  }

  return (
    <div className="wrapper">
      <AddStack/>
        <div className="toDoWrapper">
        {(toDos.length === 0) ? (defaultA.map((task) => (
            <div className="toDoColor" key={task.id} style={{background: getColor(task.difficulty)}}>
                <div className="toDoText"><h1>{task.content}</h1></div>
               <div className="toDoBtn">
                <button>
                  <img src={trash}></img>
                </button>
                <div><button><img src={edit}/></button></div>
              </div>
        </div>
        ))) : (toDos.map((toDo) => (
            <div
              className="toDoColor"
              key={toDo.id}
              style={{ background: getColor(toDo.difficulty)}}
            >
              {editingToDo === toDo.id ? (
                <div className="saveToDo">
                  <input
                    placeholder="Edit your ToDo"
                    type="text"
                    name="content"
                    onChange={handleChangeUpdate}
                  />
                  <div className="saveToDoBtns">
                  <button value ="Hard" name="difficulty" onClick={handleChangeUpdate}>🔴</button>
                  <button value="Easy" name="difficulty" onClick={handleChangeUpdate}>🟢</button>
                  <button value="Moderate"  name="difficulty" onClick={handleChangeUpdate}>🟡</button>
                  </div>
                  <button onClick={() => handleUpdate(toDo.id)}>
                    <img src={done}></img>
                  </button>
                </div>
              ) : (
                <div className="toDoText">
                  <h1>{toDo.content}</h1>
                </div>
              )}
              <div className="toDoBtn">
                <button onClick={() => handleDelete(toDo.id)}>
                  <img src={trash}></img>
                </button>
                <div><button onClick={() => editToDo(toDo.id)}><img src={edit}/></button></div>
              </div>
            </div>
          ))) }
      </div>
    </div>
  );
};

export default Tasks;
