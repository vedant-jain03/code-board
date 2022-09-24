import React from 'react'
import Messages from './Messages'
import Avatar from "react-avatar"

function Doubt(props) {
  return (
    <div className='doubt'>
      <div className='client'>
        <Avatar name={props.username}size={20} round="50px" />
        <span className='userName'> {props.username} </span>
      </div>
      <span className='doubt_text'>{props.doubttext}</span>
    </div>
  )
}

export default Doubt