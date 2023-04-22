import React from 'react'

function Terminal({ output, terminal, setEditorOpen, setInput, input }) {
    return (
        <div>
            <button className='terminalCross' onClick={() => setEditorOpen(false)}>x</button>
            <h3>Input</h3>
            <textarea className='terminalOutput' id="" cols="30" rows="10" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <hr />
            <h3>Output</h3>
            {
                 <textarea value={output} readOnly="true" className='terminalOutput'></textarea>
            }
        </div>
    )
}

export default Terminal