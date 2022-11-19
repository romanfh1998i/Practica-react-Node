import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import io from 'socket.io-client'
import { useEffect } from 'react';

const socket=io('http://localhost:4000');

function App() {
  const [message,setMessage]=useState('')
  const [messages,setMessages]=useState([{
    body:"message test",
    from:"user1"
  }])
  const handleSubmit=(e)=>{
    e.preventDefault();
   
    
    const newMessage = {
      body: message,
      from: "Me",
    };
    
    setMessages([newMessage,...messages])
    
    setMessage("")
    socket.emit("message",newMessage.body)
    
  }
 
  useEffect(()=>{
    const receiveMessage=(message)=>{
      setMessages([message,...messages])
      console.log(setMessage)
      
    }
    socket.on('message',receiveMessage)
    
    return ()=>{
    socket.off('message',receiveMessage)
};
},[messages])


  return (
    <div className="App">
      <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>setMessage(e.target.value)}
        value={message}/>
        <button>
          Enviar
        </button>
      </form>
        {messages.map((message,index)=>(
          <div key={index}>
            <p>{message.from}:{message.body}</p>
           

          </div>


        ))}
      </div>
      
    </div>
  )
}

export default App
