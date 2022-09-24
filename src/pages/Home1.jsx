import React from 'react'
import codeimg from './code.png'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import sun from './sun.png'
import moon from './moon.png'

const Home1 = () => {
    const [darkMode, setDarkMode] = useState(false);
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
        <div>
            <Navbar />
            <div className='homepagewrapper'>
            

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
                    float: "right",
                    margin: "0rem 0rem 40rem",
                    cursor: "pointer",
                }} className='darkModeBtn' onClick={toggleDarkMode} /> : <img src={moon} alt="2" className='darkModeBtn' style={
                    {
                        width: "50px",
                        float: "right",
                        margin: "0rem 0rem 40rem",
                        cursor: "pointer",
                    }
                } onClick={toggleDarkMode} />}
                <footer>
                    <img className='home-image' src={codeimg} alt="1" />
                </footer>
            </div>

        </div>

    )
}

export default Home1