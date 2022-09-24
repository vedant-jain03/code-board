import React from 'react'
import Messages from './Messages'
import Avatar from "react-avatar"

function Doubt(props) {
  return (
    <div className='doubt'>
      <div className='client'>
        <Avatar name="Yashika" size={20} round="50px" />
        <span className='userName'> Yashika </span>
      </div>
      <span className='doubt_text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi non sunt laborum ut! Soluta sit tempore labore. Eius eligendi alias enim, magnam nesciunt consequatur optio qui maxime, aspernatur illo quia!</span>
    </div>
  )
}

export default Doubt