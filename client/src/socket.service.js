import React from 'react'
import io from "socket.io-client";

export const socket = io.connect("http://127.0.0.1:5000");
export const SocketContext = React.createContext();

    
socket.on('message', message => {
  console.log(message.chatters)
  // console.log(user._id)
  // if(message.chatters[1]===user._id){console.log('msg4u')}
  // setMessages([...messages, message])
})