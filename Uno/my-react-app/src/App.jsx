import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import io from 'socket.io-client'
import { useEffect } from 'react';

const socket=io('http://localhost:4000');

function App() {
  const [message,setMessage]=useState('')
  const [messages,setMessages]=useState([])
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
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center ">
      
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <input type="text" onChange={(e)=>setMessage(e.target.value)}
        value={message}
        className="border-2 border-zinc-500 p-2 text-black w-full"
        />

        <ul className='h-80 overflow-y-auto'>
        {messages.map((message,index)=>(
          
          <li key={index} className={`my-2 p-2 table text-sm rounded-md ${message.from==="Me"?"bg-sky-700 ml-auto":"bg-lime-500"}`}>
            <p>{message.from}:{message.body}</p>
           

          </li>


        ))}
        
      </ul>
      </form>
      
      </div>
      
  
  )
}

export default App
