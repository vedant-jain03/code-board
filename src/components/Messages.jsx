import React from 'react'

function Messages(props) {
  return (
    <div className='messageCont'>
        <div className='inLine'>
            <span>
            </span>
            <p style={{fontWeight: 'bold'}}>{props.name}</p>
        </div>
        <p>{props.question}</p>
    </div>
  )
}

export default Messages