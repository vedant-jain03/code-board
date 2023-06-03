import React, { useEffect, useRef, useState } from 'react'
import ACTIONS from '../Action';
import Client from '../components/Client';
import Editor from '../components/Editor';
import Doubt from '../components/Doubt';
import { initSocket } from '../Socket';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import logo from "../logo.webp"
import DoubtSection from '../components/DoubtSection';
import bglogo from "../images/bglogo.png"
import { AiOutlineMenu } from 'react-icons/ai'
import axios from 'axios';
import Terminal from '../components/Terminal';

function EditorPage() {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatShown, setChatShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [doubt, setDoubt] = useState("");
  const [allDoubts, setAllDoubts] = useState({});
  const [liveCode, setLiveCode] = useState("");
  const [clients, setclients] = useState([]);
  const [access, setAccess] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [output, setOutput] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [input, setInput] = useState("");
  const [langCode, setLangCode] = useState("52");
  const handleChat = (e) => {
    e.preventDefault();
    setChatShown(true);
  }
  const [isTeacher, setIsTeacher] = useState(false);
  const { id } = useParams();
  const socketRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleerror(err));
      socketRef.current.on('connect_failed', (err) => handleerror(err));
      function handleerror(err) {
        toast.error('Socket connection failed, try again!')
        navigate('/');
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        id,
        username: location.state.username
      });
      // Listening for doubt event
      socketRef.current.on(ACTIONS.DOUBT, ({ doubts, username, socketId }) => {
        setAllDoubts(doubts);
        toast.success(`${username} asked a doubt!`)
      })
      // Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        setclients(clients);
        if (username !== location.state.username) {
          toast.success(`${username} joined the room.`)
        }
      })

      // Disconnecting the user listener
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setclients((prev) => {
          return prev.filter((item) => {
            return item.socketId !== socketId;
          })
        })
      })
    };
    init();
    editorRef.current.setOption('readOnly', false)
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, [])
  if (!location.state) {
    return <Navigate to="/" />
  }
  async function copyRoomId() {
    try {
      await window.navigator.clipboard.writeText(id);
      toast.success('Room id has been copied to clipboard!')
    } catch (err) {
      toast.error(err);
    }
  }
  async function askDoubt(e) {
    e.preventDefault();
    socketRef.current.emit(ACTIONS.DOUBT, {
      id,
      username: location.state.username,
      doubt
    })
    setDoubt("");
  }
  async function lockAccess() {
    setAccess(!access)
    socketRef.current.emit('lock_access', {
      id,
      access
    })
  }
  function leaveRoom() {
    navigate('/');
    toast.success('You leaved the Room');
  }
  const downloadTxtFile = async () => {
    const element = document.createElement("a");
    const file = new Blob([liveCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    // const options = {
    //   method: 'GET',
    //   url: `https://judge0-ce.p.rapidapi.com/languages/${langCode}`,
    //   headers: {
    //     'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
    //     'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    //   }
    // };
    
    // const res = (await axios.request(options)).data;
    element.download = 'main.txt';
    document.body.appendChild(element);
    element.click();
  };
  const runCode = async () => {
    setTerminal(false);
    setEditorOpen(true);
    setOutput("Loading...")
    if(liveCode === "") {
      setOutput("Null output not allowed");
      setTerminal(true);
      return;
    }
    const encodedCode = btoa(liveCode);
    const inputNecode = btoa(input);
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/about',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
    const optionsPost = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {base64_encoded: 'true', fields: '*'},
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: `{"language_id":${Number(langCode)},"source_code":"${encodedCode}","stdin":"${inputNecode}"}`
    };
    const resPost = await axios.request(optionsPost);
    const optionsGet = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${resPost.data.token}`,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
    const res = (await axios.request(optionsGet)).data;
    const output = (atob(res.stdout));
    console.log(output);
    if(res.stdout === null) setOutput(res.status.description)
    else setOutput(atob(res.stdout));
    setTerminal(true);
  }
  return (
    <div className='mainWrap' style={{ gridTemplateColumns: menuOpen ? `${editorOpen ? '230px 1fr 0.4fr' : '230px 1fr'}` : `${editorOpen ? '0 1fr 0.4fr' : '0 1fr'}` }}>
      <div className="aside" style={{ position: 'relative' }}>
        <div className='menu-options' style={{ left: menuOpen ? '230px' : '0px' }} onClick={() => setMenuOpen(!menuOpen)}><AiOutlineMenu /></div>
        <div className="asideInner">
          <div className="logo"><h2 className='logo_design'><img src={bglogo} alt="" style={{ width: '220px' }} /></h2></div>
          <h3>Teacher</h3>
          <div className="clientsList">
            {
              clients.length !== 0 && <Client key={clients[0].socketId} username={clients[0].username} />
            }
          </div>
          <h3>Students</h3>
          <div className="clientsList">
            {
              clients.map((item, index) => ((index !== 0) && <Client key={item.socketId} username={item.username} />))
            }
          </div>
        </div>
        {
          <select name="" className='btn copyBtn' value={langCode} onChange={(e) => setLangCode(e.target.value)} style={{marginBottom:'10px', outline: 'none'}}>
            <option value="52">C++</option>
            <option value="49">C</option>
            <option value="63">Javascript</option>
            <option value="92">Python</option>
          </select>
        }
        <button className='btn copyBtn' onClick={copyRoomId} >Copy ROOM ID</button>
        <button className='btn leaveBtn' onClick={leaveRoom} >Leave</button>
      </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} id={id} setLiveCode={setLiveCode} access={access} editorRef={editorRef} />
      </div>
      <div className='terminal'>
       {editorOpen && <Terminal output={output} terminal={terminal} setEditorOpen={setEditorOpen} setInput={setInput} input={input} />}
      </div>
      {
        (clients.length !== 0 && clients[0].username === location.state.username && <button className='btn doubtBtn' style={{ right: '300px' }} onClick={lockAccess} >{access ? 'Lock' : 'Unlock'} Editor</button>)
      }
      {/* <button className='btn doubtBtn' style={{ right: '300px' }} onClick={() => runCode()} >Run Code</button> */}
      <button className='btn doubtBtn' style={{ right: '140px' }} onClick={downloadTxtFile}>Download Code</button>
      <button className='btn doubtBtn' onClick={handleChat}>Ask a doubt? </button>
      {isChatShown && <DoubtSection status={setChatShown} setDoubt={setDoubt} doubt={doubt} askDoubt={askDoubt} allDoubts={allDoubts} />}
    </div>
  )
}

export default EditorPage