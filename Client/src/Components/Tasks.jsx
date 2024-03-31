import React from "react";
import { useState, useEffect } from "react";
import AddStack from "./AddStack";
import done from "../images/done.png";
import trash from "../images/trashbin.png";
import edit from "../images/edit.png";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Tasks = () => {
  const [toDos, setToDos] = useState([]);
  const [editingToDo, setEditingToDo] = useState(null);
  const [defaultA, setDefaultA] = useState([]);
  const [UpdateFlag, setUpdateFlag] = useState("")
  const [updatedStack, setUpdatedStack] = useState({
    content: "Don't leave me empty! ;)",
    difficulty: "Hard",
  });
  
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
  
  const getter = window.localStorage.getItem("idKey");
  setUpdateFlag(getter)


  const fetchDefault = async () => {

     try{
          const response = await fetch("https://stacker-server.vercel.app/");
          const data = await response.json();

          setDefaultA(data);

      }catch(err){
           console.log(err);
       }
   }

  const fetchStacks = async () => {

   try{

      const response = await axios.get(`http://localhost:8800/userStack?userId=${getter}`);

      setToDos(response.data);

   }catch(err){
      console.log(err)
     }
 }

  fetchDefault();
  fetchStacks();

 },[])


  const editToDo = (todoID) => {

    setEditingToDo(todoID);

  };


  const handleAdd = (tempTasks) => {
    const taskWithUniqueId = {
      ...tempTasks,
      id: uuidv4()
    };
    setToDos(prevToDos => [...prevToDos, taskWithUniqueId]);
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

    if (!UpdateFlag) {

      const taskToUpdate = toDos.find((toDo) => toDo.id === id);
  

      if (taskToUpdate) {

        
        const updatedTask = {
          ...taskToUpdate,

          content:updatedStack.content,
          difficulty:updatedStack.difficulty,
        };
  

        setToDos((prevToDos) => prevToDos.map((toDo) => (toDo.id === id ? updatedTask : toDo)));
  

        setEditingToDo(null);
      }
    }else{

      try{

        await axios.put(`http://localhost:8800/Stacks/${id}`, updatedStack);
        
        setEditingToDo(null);
  
        window.location.reload();
        
      }catch(err){
  
        console.log(err);
  
      }

    }
  }

  return (
    <div className="wrapper">
      <AddStack onClick={handleAdd}/>
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
                    id="myPlaceholder"
                    onChange={handleChangeUpdate}
                  />
                  <div className="saveToDoBtns">
                  <button value ="Hard" name="difficulty" onClick={handleChangeUpdate} >🔴</button>
                  <button value="Easy" name="difficulty" onClick={handleChangeUpdate}>🟢</button>
                  <button value="Moderate" name="difficulty" onClick={handleChangeUpdate}>🟡</button>
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
