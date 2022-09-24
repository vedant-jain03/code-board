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

io.on('connection', (socket)=>{
    console.log('connected', socket.id);
    socket.on(ACTIONS.JOIN, ({id, username})=> {
        userSocketMap[socket.id] = username;
        socket.join(id);
        const clients = getAllConnectedClients(id);
        clients.forEach(( {socketId} )=>{
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id
            });
        })
    });
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
    console.log("Connected server successfully!");
})
