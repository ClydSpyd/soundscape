import React, { useContext, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'socket.service';

import styles from './Chat.module.scss';
import MessageDiv from './MessageDiv';

const Chat = () => {

  const user = useSelector(state => state.auth?.user)
  const inputRef = useRef()
  const chatMessages = useRef()
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      user:{
        avatar:user.avatar,
        _id:user._id,
      },
      createdOn: new Date(),
      text:inputRef.current.value
    }
    console.log(newMessage)
    socket.emit('chatMessage', newMessage)
    inputRef.current.value = ''
  }

  //run on receipt of message from server
  socket.on('message', message => {
    setMessages([...messages, message])

  })

  useEffect(() => {
    
    return () => {
      localStorage.removeItem('newChat')
    }
  }, [])



  return (
    <div className={`${styles.chatContainer}`}>

      <div className={styles.conversations}>

      </div>
      <div className={styles.chatWindow}>
        <div className={styles.messages}>
          {
            messages.map((message, idx)=>
              <MessageDiv 
                myId={user._id}
                key={idx} 
                message={message} />
            )
          }
        </div>
        <form onSubmit={e=>handleSubmit(e)} className={styles.inputDiv}>
          <input ref={inputRef} autoFocus type="text"/>
          <button type="submit">Send <i class="far fa-paper-plane"/></button>
        </form>
      </div>

    </div>
  )

}

export default Chat;