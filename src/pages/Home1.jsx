import React from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import sun from '../images/sun.png'
import moon from '../images/moon.png'
import prop1 from "../images/prop1.png";
import prop2 from "../images/prop2.png";
import prop3 from "../images/prop3.png";
import prop4 from "../images/prop4.png";
import prop5 from "../images/prop5.png";
import code from "../images/code.png"
import bglogo from "../images/bglogo.png"

const Home1 = () => {
    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.body.style.backgroundColor = "white";
        }
        else {
            document.body.style.backgroundColor = "#282727";
        }
    }
    const navigate = useNavigate();
    const [id, setid] = useState("");
    const [username, setusername] = useState("");
    const [className, setClassName] = useState("")
    const createNewRoom = (e) => {
        e.preventDefault();
        const newid = uuidv4();
        setid(newid);
        toast.success('Created new room');
    }
    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    }
    const joinRoom = () => {
        if (!id || !username) {
            toast.error('Not valid inputs, try again!')
            return;
        }
        navigate(`/editor/${id}`, {
            state: {
                username,
            }
        });
        toast.success('Successfully entered room');
    }
    return (
        <div className='homepagewrapper'>
            <img src={bglogo} alt="2" className='darkModeBtn' style={{position: 'absolute', width:'400px', top:'10px', marginLeft:'1rem'}} />
            <div className="form_wrapper" style={{
                backgroundColor: darkMode ? "#1C1C1C" : "#E8E7E7",
            }}>
                <h4 className='main_label' style={{
                    marginTop: '10px',
                    color: darkMode ? "#E8E7E7" : "#1C1C1C",
                }} >Paste Invitation Room ID</h4>
                <div className="input_wrapper">
                    <input type="text" placeholder='Room ID' className='inputBox' value={id} onChange={e => setid(e.target.value)} onKeyUp={handleInputEnter} />
                    <input type="text" placeholder='Username' className='inputBox' onChange={e => setusername(e.target.value)} onKeyUp={handleInputEnter} />
                    <div>
                        <span className='createInfo' style={{
                            color: darkMode ? "#E8E7E7" : "#1C1C1C",
                        }} >If you don't have invite then create &nbsp;
                            <a href="" className='createNewBtn' onClick={createNewRoom} >new Room</a> </span>
                        <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                    </div>
                </div>
            </div>
            {darkMode ? <img src={sun} alt="2" style={{
                width: "50px",
                position: 'absolute',
                top: '5rem',
                cursor: "pointer",
            }} className='darkModeBtn' onClick={toggleDarkMode} /> : <img src={moon} alt="2" className='darkModeBtn' style={
                {
                    width: "50px",
                    position: 'absolute',
                    top: '5rem',
                    cursor: "pointer",
                }
            } onClick={toggleDarkMode} />}
            <img src={prop2} alt="" className='prop-image prop1'/>
            <img src={prop3} alt="" className='prop-image prop2'/>
            <img src={prop1} alt="" className='prop-image prop3'/>
            <img src={prop4} alt="" className='prop-image prop4'/>
            <img src={prop5} alt="" className='prop-image prop5'/>
            <div className="circle-l-1"></div>
            <div className="circle-l-2"></div>
            <div className="circle-l-3"></div>
            <div className="circle-l-4"></div>
            <div className="circle-l-5"></div>
            <div className="circle-r-1"></div>
            <div className="circle-r-2"></div>
            <div className="circle-r-3"></div>
            <div className="circle-r-4"></div>
            <div className="circle-r-5"></div>
            <img src={code} alt="" className='prop-image codeimage' />
        </div>
    )
}

export default Home1