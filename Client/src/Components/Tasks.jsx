import React from "react";
import { useState, useEffect } from "react";
import AddStack from "./AddStack";
import done from "../images/done.png";
import trash from "../images/trashbin.png";
import edit from "../images/edit.png";
import axios from "axios";

const Tasks = () => {
  const [toDos, setToDos] = useState([]);
  const [temTodos, setTempTodos] = useState([]);
  const [editingToDo, setEditingToDo] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editDifficulty, setEditDifficulty] = useState('');
  const userId = window.localStorage.getItem("userId");

  
  const getColor = (difficulty) => {
    switch (difficulty) {
      case "Hard":
        return "rgb(245, 29, 29)";
      case "Moderate":
        return "yellow";
      case "Easy":
        return "lightgreen";
      case "toSet":
        return "red";
    }
  };

 useEffect(() => {
  
  const fetchDefault = async () => {

     try{
          if(userId){

            const response = await axios.get('http://localhost:3001/get/' + userId)
            setToDos(response.data)
          }
          else{

            const response = await fetch('https://stacker-server.vercel.app/default')
            const data = await response.json();

          }

      }catch(err){
           console.log(err);
       }
   }

   
  fetchDefault();

 },[userId])

  const handleDelete = (id) => {

      axios.delete('http://localhost:3001/delete/'+id)
      .then(() => window.location.reload())
      .catch(err => console.log(err))

    window.location.reload()
  }

// Abrir

  const handleEditClick = (id, content, difficulty) => {

    setEditingToDo(id);
    setEditContent(content);
    setEditDifficulty(difficulty)

  }

  // Fechar 
  
  const handleUpdate = (id) => {

    axios.put('http://localhost:3001/update/' + id, {content: editContent, difficulty: editDifficulty})
    .then(result => {
      setToDos(prev =>
        prev.map(todo => 
          todo._id === id
          ? {...todo, content: editContent, difficulty: editDifficulty}
          : todo
        )
      )
      setEditContent('');
      setEditDifficulty('');
      setEditingToDo(null)
    })
    .catch(err => console.log(err))


  }

  return (
  <div className="wrapper">
    <AddStack onTempAdd={tt => setTempTodos([...temTodos, tt])} />
    <div className="toDoWrapper">
      {toDos.length === 0 ? (
        <div className="toDoWrapper">
          <div className="toDoColor" style={{ background: getColor("Hard") }}>
            <div className="toDoText">
              <h1>Estudar para a prova de Cálculo!</h1>
            </div>
            <div className="toDoBtn">
              <button>
                <img src={trash} alt="delete" />
              </button>
              <div>
                <button>
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </div>
          </div>
          <div className="toDoColor" style={{ background: getColor("Moderate") }}>
            <div className="toDoText">
              <h1>Apprenez à faire des macarons et invitez des amis.</h1>
            </div>
            <div className="toDoBtn">
              <button>
                <img src={trash} alt="delete" />
              </button>
              <div>
                <button>
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </div>
          </div>
          <div className="toDoColor" style={{ background: getColor("Easy") }}>
            <div className="toDoText">
              <h1>esen Sie den kleinen Prinzen und geben Sie online eine Rezension ab</h1>
            </div>
            <div className="toDoBtn">
              <button>
                <img src={trash} alt="delete" />
              </button>
              <div>
                <button>
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </div>
          </div>
          <div className="toDoColor" style={{ background: getColor("Moderate") }}>
            <div className="toDoText">
              <h1>友達と遊ぶためにギターの弾き方を学ぶ</h1>
            </div>
            <div className="toDoBtn">
              <button>
                <img src={trash} alt="delete" />
              </button>
              <div>
                <button>
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </div>
          </div>
          <div className="toDoColor" style={{ background: getColor("Hard") }}>
            <div className="toDoText">
              <h1>Study FullStack development and create an application</h1>
            </div>
            <div className="toDoBtn">
              <button>
                <img src={trash} alt="delete" />
              </button>
              <div>
                <button>
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : userId ? (
        toDos.map((toDo) => (
          <div
            className="toDoColor"
            key={toDo._id}
            style={{ background: getColor(toDo.difficulty) }}
          >
            {editingToDo === toDo._id ? (
              <div className="saveToDo">
                <input
                  placeholder="Edit your ToDo"
                  type="text"
                  name="content"
                  id="myPlaceholder"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="saveToDoBtns">
                  <button name="difficulty" onClick={() => setEditDifficulty('Hard')}>🔴</button>
                  <button value="Easy" name="difficulty" onClick={() => setEditDifficulty('Easy')}>🟢</button>
                  <button value="Moderate" name="difficulty" onClick={() => setEditDifficulty('Moderate')}>🟡</button>
                </div>
                <button onClick={() => handleUpdate(toDo._id)}>
                  <img src={done} alt="done" />
                </button>
              </div>
            ) : (
              <div className="toDoText">
                <h1>{toDo.content}</h1>
              </div>
            )}
            <div className="toDoBtn">
              <button onClick={() => handleDelete(toDo._id)}>
                <img src={trash} alt="delete" />
              </button>
              <div>
                <button onClick={() => handleEditClick(toDo._id, toDo.content, toDo.difficulty)}>
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          {temTodos.map(tt => (
            <div key={tt._id}>
              {tt.content}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}

export default Tasks;
