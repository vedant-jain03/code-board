import React from 'react'
import prop1 from './prop1.png'
import prop2 from './prop2.png'
import prop3 from './prop3.png'
import prop4 from './prop4.png'
import prop5 from './prop5.png'
import prop6 from './prop6.png'
import prop7 from './prop7.png'
import prop8 from './prop8.png'

const Navbar = () => {
    return (
        <div style={{ "display": "flex", "justifyContent": "space-between" }}>
            <img style={{ "width": "10rem", "margin": "1rem" }} src={prop2} alt="" />
            <img style={{ "width": "10rem", "margin": "1rem" }} src={prop6} alt="" />
        </div>
    )
}

export default Navbar