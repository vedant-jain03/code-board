import React from 'react'
import Messages from './Messages'
function Doubt(props) {
  return (
    <div className='doubtCont'>
        <h2 style={{textAlign: "center"}}>Doubts</h2>
        <button className='exitBtn' onClick={()=>{props.status(false)}}>
            <span class="material-symbols-outlined">close</span>
        </button>
        <div className='chatArea'>
            <Messages name="Yashika Jotwani" question="My Doubts is regrading the line 23, how does that gonna work, sir?"/>
        </div>
        <div className='inputCont inLine'>
            <input type="text" placeholder='type your question' className='inputBox' style={{backgroundColor :"#263238"}} /> 
            <button className='sendBtn'><span class="material-symbols-outlined">send</span></button>
        </div>
    </div>
  )
}

export default Doubt