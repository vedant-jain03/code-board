import React from 'react'
import Doubt from './Doubt'

function DoubtSection({ status, setDoubt, doubt, askDoubt, allDoubts }) {
    return (
        <div className='doubt_section_container'>
            <div className="header">
                <h3>Doubt Box</h3>
                <button onClick={() => status(false)}>x</button>
            </div>
            <div className="doubts_wrapper">
                {
                    Object.keys(allDoubts).length > 0 && Object.keys(allDoubts).map((key, index)=>(<Doubt username={key} doubttext={allDoubts[key]} />))
                }
            </div>
            <div className="ask_doubt_wrapper">
                <input type="text" value={doubt} onChange={(e)=>setDoubt(e.target.value)} />
                <button className='btn' onClick={askDoubt}>send</button>
            </div>
        </div>
    )
}

export default DoubtSection