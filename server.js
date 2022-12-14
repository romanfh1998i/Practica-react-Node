import express from 'express';
import morgan from 'morgan';
import { Server as socketServer} from 'socket.io';
import http from  'http';
import cors from 'cors'
import {PORT} from'./config.js'
const app =express();
const Server=http.createServer(app);
const io=new socketServer(Server,{
    cors:{
        origin:' http://127.0.0.1:5173',
    }
})
app.use(morgan("dev"));
app.use(cors());

io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('message',(message)=>{
        console.log(message)
        socket.broadcast.emit("message",{
            body:message,
            from:socket.id,
        })
        
    })
})
Server.listen(PORT);
console.log("Server started on port",PORT );