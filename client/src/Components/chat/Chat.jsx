import React, { useContext, useRef, useState } from 'react';
import { SocketContext } from 'socket.service';

import styles from './Chat.module.scss';

const Chat = () => {

  const inputRef = useRef()
  const chatMessages = useRef()
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', inputRef.current.value)
    console.log(inputRef.current.value)
    inputRef.current.value = ''
  }

  //run on receipt of message from server
  socket.on('message', message => {
    console.log(message);
    setMessages([...messages, message])

  })



  return (
    <div className={styles.chatContainer}>

      <div ref={chatMessages} className={styles.chatMessages}>
      {
        messages.map((msg, idx) => <p key={idx}>{msg}</p>)
      }
      </div>
      <form onSubmit={e=>handleSubmit(e)}>
        <input ref={inputRef} type="text"/>
        <button type="submit">go</button>
      </form>

    </div>
  )

}

export default Chat;