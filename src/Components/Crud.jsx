import React from 'react'
import { useState } from 'react'

const Crud = () => {

  const [toDo, setTodo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [difficulty, setDifficulty] = useState("Difficult");

  const getColor = (difficulty) => {
    
    switch(difficulty){

      case 'Difficult':
        return 'red';
      case 'Moderate':
        return 'yellow';
      case 'Easy': 
        return 'green';
      case 'Defult':
        alert("Please, select a color.");
        return;
    }
    
  }

  // Crud

  const addToDo = () => {

    if(toDo.trim() != ""){


      setToDos([...toDos, {id: Date.now(), text: toDo, difficulty}])
      setTodo("");
    }

    console.log("Array", toDos)

  }

  return (
    <div>
       <div className='crud'>
        <input type='text' value={toDo} placeholder='Enter your ToDo' onChange={(e) => setTodo(e.target.value)}/>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Difficult">Difficult 🔴</option>
          <option value="Moderate">Moderate 🟡</option>
          <option value="Easy">Easy 🟢</option>
        </select>
        <button onClick={addToDo}>Add ToDo</button>
       </div>
       <div className='toDoWrapper'>
            {toDos.map((toDo) => (
              <div className='toDoColor' key={toDo.id} style={{ background: getColor(toDo.difficulty)}}>
                {toDo.text}
              </div>
            ))}
       </div>
     </div>
  )
}

export default Crud