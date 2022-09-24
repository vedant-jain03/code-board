import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import logo from "../logo.webp"

function Home() {
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
        <div className='homepagewrapper'>
            <div className="form_wrapper">
                <h2 className='logo_design'><img src={logo} alt="" />Sync Code</h2>
                <h4 className='main_label' style={{marginTop: '10px'}} >Paste Invitation Room ID</h4>
                <div className="input_wrapper">
                    <input type="text" placeholder='Room ID' className='inputBox' value={id} onChange={e => setid(e.target.value)} onKeyUp={handleInputEnter} />
                    <input type="text" placeholder='Username' className='inputBox' onChange={e => setusername(e.target.value)} onKeyUp={handleInputEnter} />
                    <button className='btn joinBtn' onClick={joinRoom} >Join</button>
                    <span className='createInfo'>If you don't have invite then create &nbsp;
                        <a href="" className='createNewBtn' onClick={createNewRoom} >new Room</a> </span>
                </div>
            </div>
            <footer>
                <h4>Build With Love by <a href="https://github.com/vedant-jain03">Vedant Jain</a> </h4>
            </footer>
        </div>
    )
}

export default Home