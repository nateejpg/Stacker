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
          const response = await fetch("https://stacker-server.vercel.app/default");
          const data = await response.json();

          setDefaultA(data);

      }catch(err){
           console.log(err);
       }
   }

  const fetchStacks = async () => {

   try{

      const response = await axios.get(`https://stacker-server.vercel.app/userStack?userId=${getter}`);

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

        await axios.delete(`https://stacker-server.vercel.app/Stacks/${id}`);
  
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

        await axios.put(`https://stacker-server.vercel.app/Stacks/${id}`, updatedStack);
        
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
        {(toDos.length === 0) ? (
          <div className="toDoWrapper">
          <div className="toDoColor" style={{background: getColor("Hard")}}>
            <div className="toDoText"><h1>Estudar para a prova de Cálculo!</h1></div>
            <div className="toDoBtn">
              <button>
              <img src={trash}></img>
             </button>
        <div>
          <button><img src={edit}/></button>
        </div>
      </div>
      </div>
          <div className="toDoColor" style={{background: getColor("Moderate")}}>
            <div className="toDoText"><h1>Apprenez à faire des macarons et invitez des amis.</h1></div>
            <div className="toDoBtn">
              <button>
              <img src={trash}></img>
             </button>
        <div>
          <button><img src={edit}/></button>
        </div>
      </div>
      </div>
          <div className="toDoColor" style={{background: getColor("Easy")}}>
            <div className="toDoText"><h1>esen Sie den kleinen Prinzen und geben Sie online eine Rezension ab</h1></div>
            <div className="toDoBtn">
              <button>
              <img src={trash}></img>
             </button>
        <div>
          <button><img src={edit}/></button>
        </div>
      </div>
      </div>
          <div className="toDoColor" style={{background: getColor("Moderate")}}>
            <div className="toDoText"><h1>友達と遊ぶためにギターの弾き方を学ぶ</h1></div>
            <div className="toDoBtn">
              <button>
              <img src={trash}></img>
             </button>
        <div>
          <button><img src={edit}/></button>
        </div>
      </div>
      </div>
          <div className="toDoColor" style={{background: getColor("Hard")}}>
            <div className="toDoText"><h1>Study FullStack development and create an application</h1></div>
            <div className="toDoBtn">
              <button>
              <img src={trash}></img>
             </button>
        <div>
          <button><img src={edit}/></button>
        </div>
      </div>
      </div>
          </div>
        ) : (toDos.map((toDo) => (
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
