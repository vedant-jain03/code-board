const express = require('express')
const {Server}  = require('socket.io')
const app = express()
const http = require('http');
const ACTIONS = require('./src/Action');
const path = require('path');
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static('build'));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build','index.html'));
})

const getAllConnectedClients = (id) => {
    return Array.from(io.sockets.adapter.rooms.get(id) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    })
}

const userSocketMap = {};
const doubts = {};
io.on('connection', (socket)=>{
    console.log('connected', socket.id);
    socket.on(ACTIONS.JOIN, ({id, username})=> {
        userSocketMap[socket.id] = username;
        socket.join(id);
        socket.emit('user-joined', {
            socketId: socket.id,
            username: username
        })
        console.log(socket.id, username);
        const clients = getAllConnectedClients(id);
        clients.forEach(( {socketId} )=>{
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id
            });
        })
    });
    socket.on('lock_access', ({id, access}) => {
        console.log(access);
        const clients = getAllConnectedClients(id);
        clients.forEach(({socketId}) => {
            io.to(socketId).emit('access_change', {
                access
            })
        })
    })
    socket.on(ACTIONS.DOUBT, ({id, username, doubt}) => {
        doubts[username] = doubt;
        console.log(doubts);
        const clients = getAllConnectedClients(id);
        clients.forEach(( {socketId} )=>{
            io.to(socketId).emit(ACTIONS.DOUBT, {
                doubts,
                username,
                socketId: socket.id
            });
        })
    })
    socket.on(ACTIONS.CODE_CHANGE, ({id, code})=> {
        socket.in(id).emit(ACTIONS.SYNC_CODE, {
            code
        })
    })
    socket.on('disconnecting', ()=> {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=> {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            });
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })
})

const PORT = process.env.PORT || 8000;

server.listen(PORT, ()=> {
    console.log("Connected server successfully!");
})
