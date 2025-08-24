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
         <button onClick={() => {
          onShowWindows(true);
          onClose(false);
         }}>Stacks</button>
         <button onClick={() => {
          onShowWindows(false);
          onClose(false);
         }}>Habits</button>
        <button onClick={onLogOut}>Logout</button>
       </div>
    </div>
  )
}

export default Menu