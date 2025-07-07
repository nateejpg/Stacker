import React from 'react'
import {useState} from 'react';
import axios from "axios"

const AddStack = ({onTempAdd, onAfterAdd}) => {
    

  const [content, SetContent] = useState('');
  const [difficulty, setDifficulty] = useState('')
  const difs = ["ToSet", "Hard", "Moderate", "Easy"]
  const API_URL = process.env.REACT_APP_API_URL;

  const handleAdd = () => {

  const userId = window.localStorage.getItem('userId')
  const newItem = {content, difficulty}

   if(userId){
     axios.post(`${API_URL}add`, {...newItem, userId})
    .then(result => {
      console.log(result);
      if(onAfterAdd) onAfterAdd(result.data);
      window.location.reload()
    })
    .catch(err => console.log(err))


   }else{

    if(onTempAdd) onTempAdd(newItem)

   }

   SetContent('')
   setDifficulty('')

  }

  return (
    <div className="crud">
    <input
      type= "text"
      name = "content"
      value={content}
      placeholder="Enter your Stack!"
      onChange={(e) => SetContent(e.target.value)}
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