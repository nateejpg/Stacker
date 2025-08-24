import React, { useState, useEffect } from "react";
import AddStack from "./AddStack";
import done from "../images/done.png";
import trash from "../images/trashbin.png";
import edit from "../images/edit.png";
import axios from "axios";

const Tasks = () => {
  const [toDos, setToDos] = useState([]);
  const [temTodos, setTempTodos] = useState([]);
  const [editingToDo, setEditingToDo] = useState(null);
  const [editingTempIndex, setEditingTempIndex] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("");
  const userId = window.localStorage.getItem("userId");
  const API_URL = process.env.REACT_APP_API_URL;

  console.log(toDos)


  const getColor = (difficulty) => {
    switch (difficulty) { 
      case "Hard": return "rgb(245, 29, 29)";
      case "Moderate": return "yellow";
      case "Easy": return "lightgreen";
      case "Done": return "gray";
      default: return "lightgray";
    }
  };

     const fetchTodos = async () => {

      try {
        if (userId) {
          const response = await axios.get(`${API_URL}get/` + userId);
          setToDos(response.data);
          const lengthT = localStorage.setItem('length', response.data.length)
        }
      } catch (err) {
        console.log(err);
      }

    };

  useEffect(() => {

    fetchTodos();
    
  }, [userId]);

  const handleDelete = (id) => {
    axios.delete(`${API_URL}delete/` + id)
    .then(() => {
      setToDos(prev => 
        prev.filter(todo => todo._id !== id)
      )
    })
      .catch(err => console.log(err));
  };


  const handleUpdate = (id) => {
    axios.put(`${API_URL}update/` + id, { content: editContent, difficulty: editDifficulty })
      .then(() => {
        setToDos(prev =>
          prev.map(todo =>
            todo._id === id
              ? { ...todo, content: editContent, difficulty: editDifficulty }
              : todo
          )
        );
        setEditContent("");
        setEditDifficulty("");
        setEditingToDo(null);
      })
      .catch(err => console.log(err));
  };

  const handleTempDelete = (index) => {
    setTempTodos(temp => temp.filter((_, i) => i !== index));
  };

  const handleEditClick = (id, content, difficulty) => {
    setEditingToDo(id);
    setEditContent(content);
    setEditDifficulty(difficulty);
  };

  const handleTempEditClick = (index, content, difficulty) => {
    setEditingTempIndex(index);
    setEditContent(content);
    setEditDifficulty(difficulty);
  };

  const handleTempUpdate = (index) => {
    setTempTodos(temp =>
      temp.map((item, i) =>
        i === index
          ? { ...item, content: editContent, difficulty: editDifficulty }
          : item
      )
    );
    setEditContent("");
    setEditDifficulty("");
    setEditingTempIndex(null);
  };

  const renderMockTasks = () => (
    <>
      
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
    </>
  );

  return (
    <div className="wrapper">
      <AddStack onTempAdd={tt => setTempTodos([...temTodos, tt])}   onAdd={toDo => setToDos(todos => [...todos, toDo])} addCount = {toDos.length}/>
      <div className="toDoWrapper">
        {userId && toDos.length > 0 ? (
          toDos.map((toDo) => (
            <div className="toDoColor" key={toDo._id} style={{ background: getColor(toDo.difficulty) }}>
              {editingToDo === toDo._id ? (
                <div className="saveToDo">
                  <input placeholder="Edit your ToDo" type="text" value={editContent} onChange={e => setEditContent(e.target.value)} />
                  <div className="saveToDoBtns">
                    <button onClick={() => setEditDifficulty("Hard")}>🔴</button>
                    <button onClick={() => setEditDifficulty("Easy")}>🟢</button>
                    <button onClick={() => setEditDifficulty("Moderate")}>🟡</button>
                  </div>
                  <button onClick={() => handleUpdate(toDo._id)}><img src={done} alt="done" /></button>
                </div>
              ) : (
                <div className="toDoText"><h1>{toDo.content}</h1></div>
              )}
              <div className="toDoBtn">
                <button onClick={() => handleDelete(toDo._id)}><img src={trash} alt="delete" /></button>
                <button onClick={() => handleEditClick(toDo._id, toDo.content, toDo.difficulty)}><img src={edit} alt="edit" /></button>
              </div>
            </div>
          ))
        ) : temTodos.length > 0 ? (
          temTodos.map((tt, i) => (
            <div className="toDoColor" key={i} style={{ background: getColor(tt.difficulty) }}>
              {editingTempIndex === i ? (
                <div className="saveToDo">
                  <input placeholder="Edit your ToDo" type="text" value={editContent} onChange={e => setEditContent(e.target.value)} />
                  <div className="saveToDoBtns">
                    <button onClick={() => setEditDifficulty("Hard")}>🔴</button>
                    <button onClick={() => setEditDifficulty("Easy")}>🟢</button>
                    <button onClick={() => setEditDifficulty("Moderate")}>🟡</button>
                  </div>
                  <button onClick={() => handleTempUpdate(i)}><img src={done} alt="done" /></button>
                </div>
              ) : (
                <div className="toDoText"><h1>{tt.content}</h1></div>
              )}
              <div className="toDoBtn">
                <button onClick={() => handleTempDelete(i)}><img src={trash} alt="delete" /></button>
                <button onClick={() => handleTempEditClick(i, tt.content, tt.difficulty)}><img src={edit} alt="edit" /></button>
              </div>
            </div>
          ))
        ) : renderMockTasks()}
      </div>
    </div>
  );
};

export default Tasks;