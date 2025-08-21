import React from 'react'
import x from "../images/xIcon.png"

const Menu = ({onClose, onLogOut, onShowWindows}) => {
  return (
    <div className="menu">
        <div className="menuHeader">
            <button className="menuClose" onClick={() => onClose(false)}>
                <img src={x}></img>
            </button>
        </div>
       <div className="menuItens">
         <button onClick={onShowWindows}>Stacks</button>
         <button onClick={onShowWindows}>Habits</button>
         <button>Settings</button>
         <button>Graphs</button>
        <button onClick={onLogOut}>Logout</button>
       </div>
    </div>
  )
}

export default Menu