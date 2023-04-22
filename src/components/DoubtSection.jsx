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
            <form onSubmit={(e) => askDoubt(e)} className="ask_doubt_wrapper">
                <input type="text" value={doubt} onChange={(e)=>setDoubt(e.target.value)} />
                <button type='submit' className='btn' onClick={(e) => askDoubt(e)}>send</button>
            </form>
        </div>
    )
}

export default DoubtSection