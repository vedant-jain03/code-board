import React from 'react'
import Doubt from './Doubt'

function DoubtSection({ status }) {
    return (
        <div className='doubt_section_container'>
            <div className="header">
                <h3>Doubt Box</h3>
                <button onClick={() => status(false)}>x</button>
            </div>
            <div className="doubts_wrapper">
                <Doubt />
                <Doubt />
            </div>
            <div className="ask_doubt_wrapper">
                <input type="text" />
                <button className='btn'>send</button>
            </div>
        </div>
    )
}

export default DoubtSection