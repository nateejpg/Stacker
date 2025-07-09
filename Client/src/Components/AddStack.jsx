import React from 'react'
import {useState} from 'react';
import {toast} from 'react-toastify'
import axios from "axios"

const AddStack = ({onTempAdd, onAdd}) => {
    

  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState('ToSet')
  const difs = ["ToSet", "Hard", "Moderate", "Easy"]
  const API_URL = process.env.REACT_APP_API_URL;

  const handleAdd = () => {

  const userId = window.localStorage.getItem('userId')

  if(content.length === 0){

    toast.warn(`Don't leave me empty! ;)`)

  }else{

    if(userId){
     axios.post(`${API_URL}add`, {content: content, difficulty: difficulty, userId})
     .then((res) => {

    }).catch(err => console.log(err))

   }else{

    if(onTempAdd) onTempAdd({content: content, difficulty: difficulty})

   }

  }

   setContent('')
   setDifficulty('')

  }

  return (
    <div className="crud">
    <input
      type= "text"
      name = "content"
      value={content}
      placeholder="Enter your Stack!"
      onChange={(e) => setContent(e.target.value)}
      maxLength={90}
      id="myPlaceholder"
      autoComplete='off'
    />
    <select name="difficulty" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
      {difs.map(d => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
    <button onClick={handleAdd}>Add Stack</button>
  </div>
  )
}

export default AddStack